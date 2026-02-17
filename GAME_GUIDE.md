# 镜界电梯 - 游戏开发指南

## 📖 游戏概述

《镜界电梯》是一个微恐怖题材的视觉小说游戏。主角万辉在电梯中不断下降，每一层都会遇到不同的怪谈故事，需要做出正确的选择才能继续前进。

## 🎮 当前游戏流程

### 开场
- 万辉醒来在陌生房间
- 遇到神秘声音，进入电梯
- 开始下降之旅

### 第9层：镜子怪谈
- **规则**：走到镜子前，不要回头
- **BE条件**：如果回头看，会遇到黑眼睛的自己
- **挑战**：与镜中少女对话，回答问题

### 第8层：电话怪谈
- **规则**：接电话但不能说出真实姓名
- **BE条件**：
  - 说出真名会被夺走姓名
  - 输入错误密码会触发警报
- **关键信息**：记住密码 4-7-2

### 第1层：最终层
- 遇到怪谈神明殷玉
- 得知真相：万辉已经无法在外界生存
- **最终选择**：
  - 选择冥界→触发特殊剧情→最终还是进入镜中世界
  - 选择镜中世界→直接进入镜中世界
- **真结局**：成为镜中世界的死神

## 🔧 如何添加新的楼层

### 1. 在 `/src/app/data/story.ts` 中添加节点

```typescript
// 示例：添加第7层
floor_7_intro: {
  id: 'floor_7_intro',
  type: 'scene',
  background: '背景图片URL',
  character: 'narrator',
  text: '【第7层】\n\n描述这一层的场景...',
  next: 'floor_7_1',
},

floor_7_1: {
  id: 'floor_7_1',
  type: 'dialogue',
  character: 'voice',
  text: '规则说明...',
  next: 'floor_7_choice',
},

floor_7_choice: {
  id: 'floor_7_choice',
  type: 'choice',
  text: '你决定...',
  choices: [
    {
      text: '正确选项',
      next: 'floor_7_success',
    },
    {
      text: '错误选项',
      next: 'bad_end_floor_7',
    },
  ],
},
```

### 2. 创建坏结局（BE）

```typescript
bad_end_floor_7: {
  id: 'bad_end_floor_7',
  type: 'ending',
  endingType: 'bad',
  background: '背景图片URL',
  character: 'narrator',
  text: 'BE描述...\n\n【坏结局：标题】',
  flag: 'ending_floor_7',  // 用于解锁画廊
},
```

### 3. 连接到下一层

在成功完成当前层后，连接到下一层：

```typescript
floor_7_success: {
  id: 'floor_7_success',
  type: 'scene',
  background: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200',
  character: 'narrator',
  text: '你通过了这一层...',
  next: 'floor_6_intro',  // 跳转到第6层
},
```

## 🎨 怪谈创意建议

### 电梯主题怪谈
1. **数字禁忌**：按某个特定数字会触发诅咒
2. **同行者**：电梯里突然出现不该存在的"乘客"
3. **时间循环**：电梯不断回到同一层

### 房间主题怪谈
1. **红衣女子**：走廊尽头的红衣人
2. **钢琴房**：自己演奏的钢琴
3. **娃娃房**：会移动的人偶

### 互动主题怪谈
1. **留言板**：不能写下某些内容
2. **照片墙**：照片中多出了不该存在的人
3. **时钟房**：必须在特定时间做出选择

## 📝 节点类型说明

### dialogue（对话节点）
```typescript
{
  id: '唯一ID',
  type: 'dialogue',
  character: '角色ID',
  text: '对话内容',
  characterSprite: '角色立绘URL（可选）',
  characterPosition: 'left' | 'center' | 'right',
  next: '下一个节点ID',
}
```

### scene（场景节点）
```typescript
{
  id: '唯一ID',
  type: 'scene',
  background: '背景图片URL',
  text: '场景描述',
  character: '角色ID（可选）',
  next: '下一个节点ID',
}
```

### choice（选择节点）
```typescript
{
  id: '唯一ID',
  type: 'choice',
  text: '选择提示',
  choices: [
    {
      text: '选项文本',
      next: '目标节点ID',
      flag: '标记名（可选）',
      flagValue: '标记值（可选）',
    },
  ],
}
```

### ending（结局节点）
```typescript
{
  id: '唯一ID',
  type: 'ending',
  endingType: 'good' | 'bad' | 'normal',
  background: '背景图片URL',
  cg: 'CG图片URL（可选）',
  character: '角色ID',
  text: '结局文本',
  flag: '结局标记（用于解锁）',
}
```

## 🖼️ 资源管理

### 图片资源
当前使用 Unsplash 的示例图片。要使用自己的资源：

1. **方法1：使用本地图片**
   - 将图片放在 `/public/images/` 文件夹
   - 使用路径：`/images/background.jpg`

2. **方法2：使用外部URL**
   - 直接使用图片的完整URL

### 推荐的图片尺寸
- **背景图**：1920x1080 或 16:9 比例
- **角色立绘**：800x1200 或更高
- **CG**：1920x1080 或 16:9 比例

### 图片氛围建议
- **背景**：昏暗、冷色调、废弃建筑
- **立绘**：保持一致的画风
- **CG**：关键剧情场景的精美插图

## 🎵 音效系统（待添加）

未来可以添加：
- 背景音乐（BGM）
- 音效（SE）：开门声、脚步声、电话铃声
- 语音（Voice）：角色配音

## 🎯 游戏平衡建议

### BE（坏结局）设计原则
1. **明确警告**：规则应该清晰明确
2. **合理惩罚**：违反规则的后果要符合逻辑
3. **可预见性**：玩家应该能预见到风险
4. **不要过于苛刻**：给玩家思考和选择的空间

### 难度曲线
- **前期**（第9-8层）：相对简单，让玩家熟悉机制
- **中期**（第7-4层）：增加复杂度和选择分支
- **后期**（第3-1层）：高难度，需要记忆前面的信息

## 🔍 调试技巧

### 快速测试某个楼层
在 `/src/app/App.tsx` 中修改：

```typescript
const handleNewGame = () => {
  setLoadedState(undefined);
  // 修改这里可以从特定节点开始
  // 例如：从第8层开始测试
  setLoadedState({
    currentNodeId: 'floor_8_intro',
    flags: {},
    history: [],
    unlockedCGs: [],
    unlockedEndings: [],
  });
  setScreen('game');
};
```

### 查看所有结局
所有以 `ending_` 开头的 flag 都会被记录为已解锁的结局。

## 📊 当前游戏统计

- **总楼层数**：3层（第9、8、1层）
- **坏结局数**：6个
- **真结局数**：1个（2条路径）
- **CG数量**：1个

## 🚀 扩展建议

### 短期目标
1. 添加第7-2层的怪谈故事
2. 增加更多的坏结局
3. 添加音效和背景音乐

### 中期目标
1. 增加更多的CG
2. 添加成就系统
3. 优化移动端体验

### 长期目标
1. 添加角色配音
2. 制作更多分支路线
3. 增加隐藏要素和彩蛋
