# Safari/iPad 调试指南

## 已完成的修复

### 1. ✅ 移除了 Safari 中烦人的错误弹窗
- 移除了 `main.tsx` 中的 `window.onerror` alert
- 添加了 React ErrorBoundary 组件用于友好的错误显示

### 2. ✅ 修复了 GitHub Actions 工作流位置
- 将工作流文件从 `/workflows/deploy.yml` 移动到 `.github/workflows/deploy.yml`
- 这是 GitHub Actions 识别工作流的正确位置

### 3. ✅ 优化了 Safari 兼容性
- 在 MainMenu.tsx 中，将 `window.innerWidth` 改为使用百分比定位，避免 SSR 问题
- 添加了 Safari 特定的 meta 标签到 `index.html`
- 添加了 `-webkit-tap-highlight-color` 和其他 Safari 优化

### 4. ✅ 添加了调试工具
- 创建了 `DebugInfo.tsx` 组件（按住右下角3秒可查看）
- 可以查看设备信息、视口大小、在线状态等

### 5. ✅ 改进了构建配置
- 更新了 `vite.config.ts`，添加了明确的构建选项
- 确保 `base: '/Game/'` 路径正确

## 部署步骤

### 1. 提交并推送代码到 GitHub

```bash
git add .
git commit -m "修复 Safari 兼容性和 GitHub Actions 配置"
git push origin main
```

### 2. 检查 GitHub Actions 构建

1. 访问你的 GitHub 仓库：`https://github.com/voidjam1/Game`
2. 点击顶部的 "Actions" 标签
3. 查看最新的工作流运行状态
4. 如果构建失败，点击查看详细日志

### 3. 配置 GitHub Pages

构建成功后：

1. 进入仓库的 "Settings" > "Pages"
2. **Source** 选择 `gh-pages` 分支
3. **Folder** 选择 `/ (root)`
4. 点击 "Save"
5. 等待几分钟，页面会显示已发布的 URL：`https://voidjam1.github.io/Game/`

## 在 iPad Safari 上测试

### 访问网站
打开 Safari，访问：`https://voidjam1.github.io/Game/`

### 如果看到白屏，尝试以下操作：

#### 1. 查看调试信息
- 按住屏幕右下角 3 秒
- 会显示调试面板，包含设备和构建信息

#### 2. 检查浏览器控制台（iPad）
- 在 Mac 上：
  1. 用数据线连接 iPad 和 Mac
  2. 在 Mac 上打开 Safari
  3. 菜单栏 > 开发 > [你的 iPad] > [网页名称]
  4. 查看控制台错误信息

#### 3. 清除缓存
- Safari 设置 > 清除历史记录和网站数据
- 或者使用无痕浏览模式

#### 4. 检查 URL 路径
确保访问的 URL 完整且正确：
- ✅ 正确：`https://voidjam1.github.io/Game/`
- ❌ 错误：`https://voidjam1.github.io/Game` (缺少末尾的 `/`)
- ❌ 错误：`https://voidjam1.github.io/` (缺少 `/Game/`)

## 常见问题

### Q1: GitHub Actions 构建失败
**可能原因：**
- `package-lock.json` 与 `package.json` 不同步

**解决方案：**
```bash
# 删除旧的锁文件和 node_modules
rm -rf node_modules package-lock.json
# 重新安装
npm install
# 提交新的 package-lock.json
git add package-lock.json
git commit -m "更新 package-lock.json"
git push
```

### Q2: 页面显示 404
**可能原因：**
- GitHub Pages 还未启用或配置错误
- `base` 路径配置不匹配

**解决方案：**
1. 确认 GitHub Pages 设置中已选择 `gh-pages` 分支
2. 检查 `vite.config.ts` 中的 `base` 是否为 `'/Game/'`
3. 仓库名称必须与 base 路径匹配

### Q3: CSS 样式丢失或显示异常
**可能原因：**
- 静态资源路径错误

**解决方案：**
- 在 `vite.config.ts` 中确保 `base: '/Game/'` 末尾有斜杠
- 清除浏览器缓存后重试

### Q4: 动画卡顿或不流畅
**可能原因：**
- iPad 性能限制
- Motion/Framer Motion 配置问题

**解决方案：**
- 在 SettingsMenu 中降低动画速度
- 检查是否启用了省电模式

### Q5: 触摸事件无响应
**可能原因：**
- Safari 的触摸事件处理不同

**解决方案：**
- 已在 CSS 中添加 `touch-action: manipulation`
- 确保按钮有足够大的点击区域（至少 44x44px）

## 本地测试构建

在推送到 GitHub 之前，可以先本地测试：

```bash
# 构建项目
npm run build

# 预览构建结果（需要安装 serve）
npx serve -s dist -l 3000

# 或使用 Vite 预览
npx vite preview --base=/Game/
```

然后在 iPad Safari 上访问你的本地 IP 地址（需要在同一网络）：
`http://你的电脑IP:3000/Game/`

## 下一步

如果以上所有步骤都完成但仍有问题，请：

1. 截图错误信息（如果有）
2. 记录调试信息面板的内容
3. 检查 GitHub Actions 的构建日志
4. 确认 GitHub Pages 设置正确

部署成功后，你应该能在 iPad Safari 上看到主菜单，包含以下选项：
- 开始游戏
- 继续游戏（初次访问时灰色）
- 读取存档
- CG画廊
- 设置
