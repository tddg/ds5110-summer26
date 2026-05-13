#!/usr/bin/env python3
"""Build assignment HTML pages from Markdown sources.

This intentionally uses only the Python standard library so the course site can
be rebuilt on a fresh machine without installing Pandoc or Python packages.
"""

from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "assignments" / "src"
OUT_DIR = ROOT / "assignments"
STYLE_VERSION = "20260428-3"


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, text

    raw = text[4:end].strip()
    body = text[end + 5 :].lstrip()
    meta: dict[str, str] = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip().strip("\"'")
    return meta, body


def normalize_href(href: str) -> str:
    if href.startswith("/assets/"):
        return f"..{href}"
    return href


def inline_md(text: str) -> str:
    code_spans: list[str] = []

    def stash_code(match: re.Match[str]) -> str:
        code_spans.append(f"<code>{html.escape(match.group(1))}</code>")
        return f"@@CODE{len(code_spans) - 1}@@"

    text = re.sub(r"`([^`]+)`", stash_code, text)
    text = html.escape(text)

    def repl_link(match: re.Match[str]) -> str:
        label = match.group(1)
        href = html.escape(normalize_href(match.group(2)), quote=True)
        target = ' target="_blank" rel="noreferrer"' if href.startswith(("http://", "https://")) else ""
        return f'<a href="{href}"{target}>{label}</a>'

    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", repl_link, text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)

    for index, code in enumerate(code_spans):
        text = text.replace(f"@@CODE{index}@@", code)
    return text


def extract_title_from_h1(meta: dict[str, str], markdown: str) -> tuple[dict[str, str], str]:
    if meta.get("title"):
        return meta, markdown

    lines = markdown.splitlines()
    for index, line in enumerate(lines):
        match = re.match(r"^#\s+(.+)$", line.strip())
        if not match:
            continue
        meta = dict(meta)
        meta["title"] = match.group(1).strip()
        del lines[index]
        return meta, "\n".join(lines).lstrip()
    return meta, markdown


def markdown_to_html(markdown: str) -> str:
    out: list[str] = []
    paragraph: list[str] = []
    list_type: str | None = None
    list_item: str | None = None
    callout: list[str] = []
    in_code = False
    code_lang = ""
    code_indent = ""
    code_lines: list[str] = []
    in_section = False

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            out.append(f"<p>{inline_md(' '.join(paragraph))}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal list_type, list_item
        if list_type:
            if list_item is not None:
                out.append(f"<li>{inline_md(list_item)}</li>")
                list_item = None
            out.append(f"</{list_type}>")
            list_type = None

    def close_section() -> None:
        nonlocal in_section
        if in_section:
            close_list()
            flush_paragraph()
            out.append("</section>")
            in_section = False

    def flush_callout() -> None:
        nonlocal callout
        if callout:
            out.append(f'<div class="assignment-callout">{inline_md(" ".join(callout))}</div>')
            callout = []

    for raw_line in markdown.splitlines():
        line = raw_line.rstrip()
        stripped_line = line.lstrip()

        if in_code:
            if stripped_line.startswith("```"):
                escaped = html.escape("\n".join(code_lines))
                lang_class = f' class="language-{html.escape(code_lang, quote=True)}"' if code_lang else ""
                out.append(f"<pre><code{lang_class}>{escaped}</code></pre>")
                in_code = False
                code_lang = ""
                code_indent = ""
                code_lines = []
            else:
                if code_indent and raw_line.startswith(code_indent):
                    code_lines.append(raw_line[len(code_indent) :])
                else:
                    code_lines.append(raw_line)
            continue

        fence = re.match(r"^(\s*)```(.*)$", line)
        if fence:
            flush_callout()
            flush_paragraph()
            close_list()
            in_code = True
            code_indent = fence.group(1)
            code_lang = fence.group(2).strip()
            code_lines = []
            continue

        if not line.strip():
            flush_callout()
            flush_paragraph()
            close_list()
            continue

        heading = re.match(r"^(#{1,5})\s+(.+)$", line)
        if heading:
            flush_callout()
            flush_paragraph()
            close_list()
            level = len(heading.group(1))
            text = inline_md(heading.group(2))
            if level in (1, 2):
                close_section()
                out.append("<section>")
                in_section = True
            out.append(f"<h{level}>{text}</h{level}>")
            continue

        image = re.match(r"^!\[([^\]]*)\]\(([^)]+)\)(?:\{width=(\d+)\})?$", line.strip())
        if image:
            flush_callout()
            flush_paragraph()
            close_list()
            alt = html.escape(image.group(1), quote=True)
            src = html.escape(normalize_href(image.group(2)), quote=True)
            width = image.group(3)
            style = f' style="max-width: min(100%, {width}px);"' if width else ""
            out.append(f'<figure><img src="{src}" alt="{alt}"{style}><figcaption>{alt}</figcaption></figure>')
            continue

        if line.startswith("> "):
            flush_paragraph()
            close_list()
            callout.append(line[2:].strip())
            continue

        if callout:
            starts_new_block = (
                re.match(r"^[-*]\s+.+$", line)
                or re.match(r"^\d+\.\s+.+$", line)
                or re.match(r"^(#{1,5})\s+.+$", line)
                or re.match(r"^(\s*)```", line)
                or re.match(r"^!\[([^\]]*)\]\(([^)]+)\)(?:\{width=(\d+)\})?$", line.strip())
            )
            if not starts_new_block:
                callout.append(line.strip())
                continue
            flush_callout()
            continue

        unordered = re.match(r"^[-*]\s+(.+)$", line)
        ordered = re.match(r"^(\d+)\.\s+(.+)$", line)
        if unordered or ordered:
            flush_callout()
            flush_paragraph()
            wanted = "ul" if unordered else "ol"
            if list_type != wanted:
                close_list()
                if ordered:
                    start = int(ordered.group(1))
                    start_attr = f' start="{start}"' if start != 1 else ""
                    out.append(f"<ol{start_attr}>")
                else:
                    out.append("<ul>")
                list_type = wanted
            elif list_item is not None:
                out.append(f"<li>{inline_md(list_item)}</li>")
            item = unordered.group(1) if unordered else ordered.group(2)
            list_item = item.strip()
            continue

        if list_type and list_item is not None:
            list_item += " " + line.strip()
            continue

        flush_callout()
        close_list()
        paragraph.append(line.strip())

    if in_code:
        escaped = html.escape("\n".join(code_lines))
        out.append(f"<pre><code>{escaped}</code></pre>")
    flush_callout()
    close_section()
    flush_paragraph()
    close_list()
    return "\n".join(out)


def page_template(meta: dict[str, str], body_html: str) -> str:
    title = html.escape(meta.get("title", "Assignment"))
    kicker = html.escape(meta.get("kicker", "Assignment"))
    due = html.escape(meta.get("due", "TBD"))
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{kicker} | DS5110 Summer 2026</title>
  <link rel="icon" href="../assets/images/uva.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css?v={STYLE_VERSION}">
</head>
<body class="doc-page">
  <nav class="nav">
    <div class="nav-inner">
      <a href="../index.html#home" class="nav-logo">DS5110</a>
      <div class="nav-links" aria-label="Course sections">
        <a href="../index.html#syllabus">Syllabus</a>
        <a href="../index.html#schedule">Schedule</a>
        <a href="../index.html#materials">Materials</a>
        <a href="../index.html#assignments">Assignments</a>
        <a href="../index.html#staff">Staff</a>
      </div>
    </div>
  </nav>

  <main class="doc-shell">
    <a class="doc-back" href="../index.html#assignments">Back to assignments</a>

    <article class="assignment-doc">
      <header>
        <p class="assignment-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p class="assignment-due">Due {due}</p>
      </header>

{body_html}
    </article>
  </main>
</body>
</html>
"""


def build_one(path: Path) -> Path:
    meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
    meta, body = extract_title_from_h1(meta, body)
    body_html = markdown_to_html(body)
    output = OUT_DIR / f"{path.stem}.html"
    output.write_text(page_template(meta, body_html), encoding="utf-8")
    return output


def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    sources = sorted(SRC_DIR.glob("*.md"))
    if not sources:
        raise SystemExit(f"No assignment Markdown files found in {SRC_DIR}")
    for source in sources:
        output = build_one(source)
        print(f"built {output.relative_to(ROOT)} from {source.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
