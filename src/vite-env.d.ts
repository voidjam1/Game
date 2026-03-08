/// <reference types="vite/client" />

// 声明 figma:asset 模块类型
declare module 'figma:asset/*' {
  const content: string;
  export default content;
}
