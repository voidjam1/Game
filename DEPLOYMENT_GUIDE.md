# 🚀 游戏预览、编辑和部署指南

## 👀 如何预览游戏

### 在 Figma Make 中预览
- 你现在就在 Figma Make 的开发环境中
- 游戏会在右侧的预览窗口实时显示
- 每次修改代码后，游戏会自动刷新

### 本地预览（如果你下载了代码）
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 然后在浏览器打开 http://localhost:5173
```

## ✏️ 如何编辑代码

### 在 Figma Make 中编辑
1. 点击左侧文件树中的文件
2. 在编辑器中修改代码
3. 保存后会自动更新预览

### 主要文件位置

#### 修改剧本和对话
📁 `/src/app/data/story.ts`
- 所有对话内容
- 角色定义
- 故事节点
- 选择分支

#### 修改游戏标题
📁 `/src/app/data/story.ts` (最底部)
```typescript
export const gameMetadata = {
  title: '镜界电梯',  // ← 改这里
  version: '1.0.0',
  startNode: 'start',
};
```

#### 添加图片
📁 `/public/images/` 文件夹
- 把你的图片放这里
- 然后在 `story.ts` 中引用

## 🌐 部署到网络上

### 方法1：部署到 Vercel（推荐，最简单）

#### 步骤1：导出代码
1. 在 Figma Make 中，点击导出按钮
2. 下载整个项目文件夹
3. 解压到你的电脑上

#### 步骤2：上传到 GitHub
1. 去 [GitHub.com](https://github.com) 创建账号（如果还没有）
2. 创建一个新仓库（New Repository）
   - 名字可以叫：`mirror-elevator-game`
   - 选择 Public（公开）
   - 不要勾选任何初始化选项
3. 在你的电脑上，打开命令行/终端，进入项目文件夹：
```bash
cd 你的项目文件夹路径

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 连接到 GitHub（替换成你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/mirror-elevator-game.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 步骤3：部署到 Vercel
1. 去 [Vercel.com](https://vercel.com) 注册账号
2. 点击 "Add New" → "Project"
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测到这是 Vite 项目
5. 点击 "Deploy"
6. 等待几分钟，你的游戏就上线了！🎉

#### 获取游戏网址
- 部署完成后，Vercel 会给你一个网址
- 格式类似：`https://mirror-elevator-game.vercel.app`
- 你可以分享这个网址给任何人玩！

### 方法2：部署到 GitHub Pages

#### 步骤1：修改配置文件
在 `/vite.config.ts` 中添加 base 配置：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/mirror-elevator-game/',  // ← 添加这行，替换成你的仓库名
  plugins: [react(), tailwindcss()],
  // ... 其他配置
})
```

#### 步骤2：添加部署脚本
在 `/package.json` 中添加：

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && gh-pages -d dist"  // ← 添加这行
  },
  "devDependencies": {
    "gh-pages": "^6.1.1"  // ← 添加这个依赖
  }
}
```

#### 步骤3：部署
```bash
# 安装 gh-pages
npm install gh-pages --save-dev

# 构建并部署
npm run deploy
```

#### 步骤4：在 GitHub 设置中启用 Pages
1. 去你的 GitHub 仓库
2. Settings → Pages
3. Source 选择 `gh-pages` 分支
4. 点击 Save

你的游戏会在：`https://你的用户名.github.io/mirror-elevator-game/`

## 🔄 如何更新游戏

### 如果部署在 Vercel
1. 修改代码
2. 推送到 GitHub：
```bash
git add .
git commit -m "更新游戏内容"
git push
```
3. Vercel 会自动重新部署！

### 如果部署在 GitHub Pages
```bash
git add .
git commit -m "更新游戏内容"
git push
npm run deploy  # 重新部署
```

## 📱 测试游戏

部署后记得在不同设备测试：
- ✅ 电脑浏览器（Chrome、Firefox、Safari）
- ✅ 手机浏览器（竖屏和横屏）
- ✅ 平板

## 🎯 推荐部署方式对比

| 平台 | 难度 | 速度 | 自动部署 | 自定义域名 |
|------|------|------|----------|-----------|
| **Vercel** | ⭐ 简单 | ⚡ 超快 | ✅ 支持 | ✅ 免费 |
| **GitHub Pages** | ⭐⭐ 中等 | ⚡ 快 | ❌ 需手动 | ✅ 免费 |

**建议：用 Vercel！** 最简单，而且每次推送代码到 GitHub 都会自动部署。

## ❓ 常见问题

### Q: 图片显示不出来？
A: 确保图片路径正确，使用 `/images/xxx.png` 格式。

### Q: 部署后游戏打不开？
A: 检查 `vite.config.ts` 中的 `base` 设置是否正确。

### Q: 如何使用自己的域名？
A: 在 Vercel 的项目设置中可以添加自定义域名（需要你有域名）。

### Q: 部署是免费的吗？
A: 是的！Vercel 和 GitHub Pages 都对个人项目免费。

## 📧 分享你的游戏

部署完成后，你可以：
- 分享游戏链接给朋友
- 发布到社交媒体
- 添加到你的作品集
- 在游戏社区分享

## 🎨 添加自定义域名（可选）

如果你有自己的域名（比如 `mygame.com`）：

### 在 Vercel 添加：
1. 项目设置 → Domains
2. 添加你的域名
3. 按照提示在域名服务商那里添加 DNS 记录

### 在 GitHub Pages 添加：
1. 在项目根目录创建 `/public/CNAME` 文件
2. 写入你的域名：`mygame.com`
3. 在域名服务商添加 CNAME 记录指向 `你的用户名.github.io`

---

## 🚀 快速开始清单

- [ ] 在 Figma Make 中编辑并测试游戏
- [ ] 准备好所有图片资源
- [ ] 确认对话和剧情无误
- [ ] 注册 GitHub 账号
- [ ] 注册 Vercel 账号  
- [ ] 导出项目代码
- [ ] 上传到 GitHub
- [ ] 在 Vercel 部署
- [ ] 测试部署后的游戏
- [ ] 分享给朋友！🎉

需要更详细的步骤说明，随时问我！
