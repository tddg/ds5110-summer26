# Assignment Pages

Edit assignment content in Markdown under `assignments/src/`.

To rebuild the student-facing HTML pages:

```bash
python3 scripts/build_assignments.py
```

For automatic rebuilds while editing Markdown, install `fswatch` and run:

```bash
brew install fswatch
bash scripts/watch_assignments.sh
```

Keep your normal static server running separately. The watcher updates generated HTML files whenever assignment Markdown, assignment styles, or the builder changes; refresh the browser to see the new page.

To run the static server and assignment watcher together:

```bash
bash scripts/serve.sh
```

By default it serves on port `8080`. To use another port:

```bash
PORT=8081 bash scripts/serve.sh
```

The generated files, such as `assignments/a0.html`, are committed and served directly by GitHub Pages. That keeps deployment simple: GitHub Pages only needs to host static HTML/CSS/JS.

Each Markdown file can include front matter:

```markdown
---
title: AWS Academy, EC2, Linux Shell, and AI Coding CLI
kicker: Assignment 0
due: Fri May 22, 11:59 PM ET
---
```

Supported Markdown features include headings, paragraphs, unordered and ordered lists, code fences, inline code, links, images, bold, italics, and blockquote callouts.

Images render directly on the page:

```markdown
![AWS Academy Setting](/assets/images/a0/aws_academy_guide_launch_lab.jpg)
```

Because assignment pages are generated under `assignments/`, the build script rewrites `/assets/...` image and link paths to `../assets/...` so they load correctly from assignment pages.

To control image width for one image, add `{width=640}` immediately after the image:

```markdown
![AWS Academy Setting](/assets/images/a0/aws_academy_guide_launch_lab.jpg){width=640}
```

The generated image remains responsive on small screens.

The preferred title source is front matter:

```markdown
---
title: Assignment title shown at the top of the page
---
```

If `title` is omitted, the build script uses the first `# Heading` as the page title and removes that heading from the body to avoid duplicate page titles. `## Heading` and lower headings remain in the assignment body.
