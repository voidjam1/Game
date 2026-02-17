# 如何添加自己的图片资源

## 📁 步骤1：准备图片文件夹

在项目根目录的 `/public` 文件夹中创建以下结构：

```
/public
  /images
    /characters      ← 角色立绘文件夹
      wanhui.png     ← 万辉的立绘
      yinyu.png      ← 殷玉的立绘
      mirror_girl.png
    /backgrounds     ← 背景图文件夹
      room_start.jpg
      elevator.jpg
      floor_9.jpg
      floor_8.jpg
      floor_1.jpg
    /cg             ← CG插图文件夹
      ending_true.png
      mirror_scene.png
```

## 🖼️ 步骤2：修改代码中的图片路径

打开 `/src/app/data/story.ts`，找到要修改的节点，将图片URL替换为本地路径：

### 示例1：修改角色立绘

```typescript
// 修改前（使用网络图片）
intro_1: {
  id: 'intro_1',
  type: 'dialogue',
  character: 'wanhui',
  text: '...这是哪里？',
  characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  characterPosition: 'center',
  next: 'intro_2',
},

// 修改后（使用本地图片）
intro_1: {
  id: 'intro_1',
  type: 'dialogue',
  character: 'wanhui',
  text: '...这是哪里？',
  characterSprite: '/images/characters/wanhui.png',  // ← 改成这样
  characterPosition: 'center',
  next: 'intro_2',
},
```

### 示例2：修改背景图

```typescript
// 修改前
floor_9_intro: {
  id: 'floor_9_intro',
  type: 'scene',
  background: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200',
  character: 'narrator',
  text: '【第9层】...',
  next: 'floor_9_1',
},

// 修改后
floor_9_intro: {
  id: 'floor_9_intro',
  type: 'scene',
  background: '/images/backgrounds/floor_9.jpg',  // ← 改成这样
  character: 'narrator',
  text: '【第9层】...',
  next: 'floor_9_1',
},
```

### 示例3：修改CG

```typescript
// 修改前
true_ending: {
  id: 'true_ending',
  type: 'ending',
  endingType: 'good',
  background: 'https://...',
  cg: 'https://images.unsplash.com/photo-1469173479606-ada03df615aa?w=1200',
  character: 'narrator',
  text: '...',
  flag: 'ending_true',
},

// 修改后
true_ending: {
  id: 'true_ending',
  type: 'ending',
  endingType: 'good',
  background: '/images/backgrounds/floor_1.jpg',
  cg: '/images/cg/ending_true.png',  // ← 改成这样
  character: 'narrator',
  text: '...',
  flag: 'ending_true',
},
```

## 🎨 推荐的图片规格

### 角色立绘
- **尺寸**：800px × 1200px 或更高
- **格式**：PNG（支持透明背景）
- **要求**：
  - 去除背景（透明PNG）
  - 人物居中
  - 预留上方空间（避免被对话框遮挡）

### 背景图
- **尺寸**：1920px × 1080px（16:9）
- **格式**：JPG 或 PNG
- **氛围**：昏暗、冷色调（符合恐怖主题）

### CG插图
- **尺寸**：1920px × 1080px（16:9）
- **格式**：PNG 或 JPG
- **用途**：关键剧情场景的精美插图

## 🔍 快速替换所有角色立绘

如果你想一次性替换所有万辉的立绘，可以在角色定义中修改：

```typescript
// 在 /src/app/data/story.ts 文件开头
export const characters: Record<string, Character> = {
  wanhui: {
    id: 'wanhui',
    name: '万辉',
    sprite: '/images/characters/wanhui.png',  // ← 改这里
  },
  yinyu: {
    id: 'yinyu',
    name: '殷玉',
    sprite: '/images/characters/yinyu.png',  // ← 改这里
  },
  // ...其他角色
};
```

但是，如果你在具体节点中设置了 `characterSprite`，那个节点会优先使用节点中的设置。

## 💡 小技巧

### 1. 为不同情绪准备多个立绘变体
```
/characters
  wanhui_normal.png    ← 普通表情
  wanhui_scared.png    ← 害怕表情
  wanhui_shocked.png   ← 震惊表情
  wanhui_smile.png     ← 微笑表情
```

然后在不同场景使用不同的立绘：
```typescript
// 害怕的场景
characterSprite: '/images/characters/wanhui_scared.png',

// 震惊的场景
characterSprite: '/images/characters/wanhui_shocked.png',
```

### 2. 使用图层式立绘（高级）
如果你会画多层立绘，可以准备：
- 身体层（不变）
- 表情层（可替换）
- 装饰层（可选）

### 3. 保持风格一致
确保所有角色的画风、线条粗细、配色保持一致。

## ⚠️ 注意事项

1. **文件大小**：尽量优化图片大小，避免过大影响加载速度
   - 立绘：建议 < 500KB
   - 背景：建议 < 1MB
   - CG：建议 < 1.5MB

2. **文件命名**：使用英文和数字，避免中文和特殊字符
   - ✅ `wanhui_scared.png`
   - ❌ `万辉_害怕.png`

3. **路径大小写**：路径是区分大小写的
   - `/images/Characters/wanhui.png` ≠ `/images/characters/wanhui.png`

## 🚀 测试你的图片

保存文件后，刷新浏览器。如果图片没有显示：
1. 检查文件路径是否正确
2. 检查文件名是否匹配（注意大小写）
3. 打开浏览器控制台查看是否有错误信息
