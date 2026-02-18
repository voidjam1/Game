# 🚀 自动部署指南 (GitHub Actions)

由于你在使用 iPad，我们已经为你设置了**全自动部署流程**。你只需要推送代码，GitHub 就会自动帮你构建和部署游戏。

## ✅ 已完成的设置

1.  **自动化工作流**：我们创建了 `.github/workflows/deploy.yml` 文件。每次你推送代码到 GitHub，它都会自动运行。
2.  **路径修复**：我们修改了 `vite.config.ts`，确保游戏在 `https://voidjam1.github.io/Game/` 下能正常运行。
3.  **依赖安装**：添加了必要的构建工具。

## 🛠️ 你需要做的操作

### 1. 推送代码
将现在的修改推送到 GitHub。

### 2. 在 GitHub 上启用 Pages (仅需一次)
1.  打开你的 GitHub 仓库页面。
2.  点击上方的 **Settings** (设置)。
3.  在左侧菜单点击 **Pages**。
4.  在 **Build and deployment** 下的 **Source**，选择 **Deploy from a branch**。
5.  在 **Branch** 下拉菜单中，选择 **`gh-pages`** (注意：不是 main)。
    - *如果没看到 `gh-pages` 分支，请先去 **Actions** 标签页确认工作流是否已成功运行一次。运行成功后会自动创建该分支。*
6.  文件夹保持 `/ (root)`。
7.  点击 **Save**。

### 3. 查看部署状态
1.  点击仓库上方的 **Actions** 标签页。
2.  你应该能看到一个名为 "Deploy to GitHub Pages" 的工作流正在运行（黄色圆圈）或已完成（绿色对勾）。
3.  如果它是绿色的，说明部署成功！

### 4. 打开游戏
访问你的游戏网址：
[https://voidjam1.github.io/Game/](https://voidjam1.github.io/Game/)

---

## ❓ 常见问题

### Q: 为什么还是白屏？
- 确保护已将 **GitHub Pages 的分支切换为 `gh-pages`**。这是最常见的原因。
- 默认情况下 GitHub Pages 使用的是 `main` 分支，但这会导致白屏，因为 `main` 分支里只有源代码，浏览器无法运行。必须使用 `gh-pages` 分支（里面是构建好的代码）。

### Q: 修改代码后怎么更新？
- 只需要再次推送代码到 `main` 分支。
- GitHub Actions 会自动检测到更新，重新构建并发布到 `gh-pages`。
- 等待几分钟，刷新网页即可。
