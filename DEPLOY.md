# Deploy This Course Website to GitHub Pages

This repo is a plain static website. The recommended deployment path is to publish a generated static tree to the `gh-pages` branch.

## Deploy Main Site Only

This temporarily excludes assignment Markdown, generated assignment HTML, and assignment images:

```bash
bash scripts/deploy_gh_pages.sh
```

The script copies only:

```text
index.html
style.css
app.js
assets/images/uva.ico
.nojekyll
```

It also rewrites assignment page links in the deployed copy of `app.js` to `#`, so unpublished assignment pages do not become 404 links.

## Deploy With Assignments Later

When assignments are ready to publish:

```bash
INCLUDE_ASSIGNMENTS=1 bash scripts/deploy_gh_pages.sh
```

That runs:

```bash
python3 scripts/build_assignments.py
```

and includes generated `assignments/*.html` plus assignment images.

## GitHub Pages Settings

In GitHub:

1. Go to **Settings** -> **Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `gh-pages`.
4. Folder: `/ (root)`.

The deployed URL should be:

```text
https://tddg.github.io/ds5110-summer26/
```

---

# Old Notes

当前仓库已关联：`origin` -> https://github.com/JerryW35/ZipLLM.git

---

## 方式一：只把 website 文件夹推送到仓库

在项目根目录执行：

```bash
cd /home/zirui/code/ZipLLM

# 添加 website 下所有文件（含视频体积较大，首次推送会慢一些）
git add website/
git commit -m "Add project website"
git push origin main
```

完成后，仓库里会有 `website/` 目录，里面有 `index.html`、`style.css`、`app.js`、视频等。  
这样只是“上传了 website 内容”，**还不会**变成在线可访问的网站。

---

## 方式二：用 GitHub Pages 发布（仅用 website 里的内容当网站根目录）

GitHub Pages 只能从「仓库根目录」或「`/docs`」或「单独分支的根目录」提供页面，不能直接选「从 website 目录」。  
所以做法是：建一个 `gh-pages` 分支，**分支根目录 = 当前 website 里的内容**（没有 `website/` 这一层），再用该分支做 Pages。

在项目根目录执行（已跳过 .git，避免嵌套仓库）：

```bash
cd /home/zirui/code/ZipLLM

# 用 website 内容创建 gh-pages 分支（分支根目录 = website 内容）
git subtree split -P website -b gh-pages

# 推送 gh-pages 分支
git push origin gh-pages
```

如果本机没有 `git subtree` 或执行报错，可以用下面「手动建 gh-pages」的方式。

### 手动建 gh-pages 分支（不用 subtree）

```bash
cd /home/zirui/code/ZipLLM

# 临时目录
TMP=/tmp/zipllm-gh-pages
rm -rf "$TMP"
mkdir -p "$TMP"

# 只复制 website 里的文件到临时目录（不要 .git）
cp -r website/* "$TMP/"

# 在临时目录建一个新仓库并推送到 gh-pages
cd "$TMP"
git init
git add .
git commit -m "Deploy website"
git branch -M gh-pages
git remote add origin https://github.com/JerryW35/ZipLLM.git
git push -f origin gh-pages
```

---

## 在 GitHub 里开启 Pages

1. 打开 https://github.com/JerryW35/ZipLLM
2. **Settings** -> 左侧 **Pages**
3. **Source** 选 **Deploy from a branch**
4. **Branch** 选 `gh-pages`，**Folder** 选 **/ (root)**，保存

过一两分钟后，网站地址为：

**https://jerryw35.github.io/ZipLLM/**

---

## 小结

| 目的 | 做法 |
|------|------|
| 只在仓库里保存 website 文件 | 方式一：`git add website/` -> commit -> push |
| 用 website 内容当网站并在线访问 | 方式二建 gh-pages，再在仓库 Settings -> Pages 里选 gh-pages 分支 |

视频文件较大，首次 push 可能较慢；若需要可以后续用 Git LFS 或放到 CDN 再改链接。
