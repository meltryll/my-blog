// 博客文章数据
export const posts = [
  {
    id: 1,
    title: 'Vue 3 入门指南',
    excerpt: '探索 Vue 3 的新特性和改进，以及如何开始使用它构建现代 Web 应用。',
    content: '# Vue 3 入门指南\n\nVue 3 是一款流行的 JavaScript 前端框架，于2020年9月正式发布。它带来了许多新特性和改进，包括组合式API、更好的性能和更小的包体积。\n\n## 新特性\n\n### 组合式API\n组合式API 是 Vue 3 中最显著的变化之一，它允许开发者按照逻辑功能组织代码，而不是按照选项类型。\n\n### 性能提升\nVue 3 在渲染性能和内存使用方面都有显著提升。这主要归功于重写的虚拟DOM实现和更高效的组件更新机制。\n\n### 更小的包体积\n通过按需引入和 Tree-shaking 支持，Vue 3 的运行时体积比 Vue 2 减少了约 41%。\n\n## 开始使用\n\n要开始使用 Vue 3，你可以通过 CDN 引入，也可以使用 Vue CLI 或 Vite 创建项目。\n\n```javascript\n// 通过 CDN 引入\n<script src="https://unpkg.com/vue@next"></script>\n```\n\n或者使用 Vite 创建项目：\n\n```bash\nnpm create vite@latest my-vue3-app -- --template vue\n```',
    date: '2023-10-15',
    category: '前端开发'
  },
  {
    id: 2,
    title: 'JavaScript 异步编程详解',
    excerpt: '深入了解 JavaScript 中的异步编程模式，包括回调、Promise 和 async/await。',
    content: '# JavaScript 异步编程详解\n\nJavaScript 是一门单线程语言，但它通过异步编程模式实现了非阻塞操作，使得应用程序能够更高效地运行。\n\n## 异步编程模式\n\n### 回调',
    date: '2023-10-10',
    category: 'JavaScript'
  },
  {
    id: 3,
    title: 'CSS 布局技巧总结',
    excerpt: '分享一些实用的 CSS 布局技巧，帮助你构建更加灵活和响应式的网页设计。',
    content: '# CSS 布局技巧总结\n\nCSS 布局是前端开发中的重要部分，掌握各种布局技巧可以帮助我们构建更加灵活和响应式的网页设计。\n\n## Flexbox 布局\n\nFlexbox 是一种一维布局模型，它允许我们在水平或垂直方向上排列元素，并控制元素之间的空间分配。\n\n```css\n.container {\n  display: flex;\n  justify-content: center; /* 水平居中 */\n  align-items: center; /* 垂直居中 */\n  gap: 1rem; /* 元素之间的间距 */\n}```\n\n## Grid 布局\n\nGrid 是一种二维布局模型，它允许我们同时控制行和列，创建复杂的布局结构。\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr); /* 创建 3 列，每列宽度相等 */\n  grid-template-rows: auto; /* 行高自动 */\n  gap: 1rem; /* 网格间距 */\n}```\n\n## 响应式布局\n\n响应式布局允许网页在不同设备上呈现出最佳的显示效果。我们可以使用媒体查询来实现响应式设计。\n\n```css\n/* 移动设备 */\n@media (max-width: 768px) {\n  .container {\n    grid-template-columns: 1fr; /* 单列布局 */\n  }\n}\,\n\n/* 桌面设备 */\n@media (min-width: 769px) {\n  .container {\n    grid-template-columns: repeat(3, 1fr); /* 三列布局 */\n  }\n}```\n\n## CSS 变量\n\nCSS 变量允许我们定义可重用的值，使样式更加易于维护。\n\n```css\n:root {\n  --primary-color: #333;\n  --secondary-color: #555;\n  --spacing: 1rem;\n}\,\n\n.container {\n  color: var(--primary-color);\n  margin: var(--spacing);\n}```',
    date: '2023-10-05',
    category: 'CSS'
  },
  {
    id: 4,
    title: 'TypeScript 入门教程',
    excerpt: '了解 TypeScript 的基本概念和语法，以及如何在项目中使用它。',
    content: '# TypeScript 入门教程\n\nTypeScript 是 JavaScript 的一个超集，它添加了静态类型和其他特性，使得代码更加健壮和易于维护。\n\n## 基本类型\n\nTypeScript 支持多种基本数据类型，包括：\n\n```typescript\n// 数字\nlet age: number = 30;\n\n// 字符串\nlet name: string = "John";\n\n// 布尔值\nlet isActive: boolean = true;\n\n// 数组\nlet numbers: number[] = [1, 2, 3];\n// 或者使用泛型\nlet strings: Array<string> = ["a", "b", "c"];\n\n// 元组\nlet person: [string, number] = ["John", 30];\n\n// 枚举\nenum Color {\n  Red,\n  Green,\n  Blue\n}\,\nlet color: Color = Color.Green;\n\n// any - 可以是任何类型\nlet anyValue: any = "Hello";\nanyValue = 42;\n\n// void - 没有返回值\nfunction logMessage(message: string): void {\n  console.log(message);\n}\,\n\n// null 和 undefined\nlet n: null = null;\nlet u: undefined = undefined;\n\n// never - 表示永远不会返回的值\nfunction throwError(message: string): never {\n  throw new Error(message);\n}```\n\n## 接口\n\n接口用于定义对象的结构。\n\n```typescript\ninterface Person {\n  name: string;\n  age: number;\n  address?: string; // 可选属性\n  sayHello(): void; // 方法\n}\,\n\nlet person: Person = {\n  name: "John",\n  age: 30,\n  sayHello() {\n    console.log(`Hello, my name is ${this.name}`);\n  }\n};```\n\n## 类\n\nTypeScript 支持面向对象编程，可以定义类和使用继承。\n\n```typescript\nclass Animal {\n  name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n\n  makeSound() {\n    console.log(`${this.name} makes a sound`);\n  }\n}\,\n\nclass Dog extends Animal {\n  breed: string;\n\n  constructor(name: string, breed: string) {\n    super(name);\n    this.breed = breed;\n  }\n\n  makeSound() {\n    console.log(`${this.name} barks`);\n  }\n}\,\n\nlet dog = new Dog("Buddy", "Labrador");\ndog.makeSound(); // 输出: Buddy barks```',
    date: '2023-09-28',
    category: 'TypeScript'
  },
  {
    id: 5,
    title: 'React Hooks 详解',
    excerpt: '深入了解 React Hooks 的使用方法和最佳实践。',
    content: '# React Hooks 详解\n\nReact Hooks 是 React 16.8 引入的新特性，它允许我们在函数组件中使用状态和生命周期方法。\n\n## 常用 Hooks\n\n### useState\n\nuseState 用于在函数组件中添加状态。\n\n```jsx\nimport React, { useState } from \'react\';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\,\n```\n\n### useEffect\n\nuseEffect 用于处理副作用，相当于类组件中的生命周期方法。\n\n```jsx\nimport React, { useState, useEffect } from \'react\';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  // 相当于 componentDidMount 和 componentDidUpdate\n  useEffect(() => {\n    // 更新文档标题\n    document.title = `You clicked ${count} times`;\n\n    // 清理函数，相当于 componentWillUnmount\n    return () => {\n      document.title = \'React App\';\n    };\n  }, [count]); // 只有当 count 改变时才会执行\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\,\n```\n\n### useContext\n\nuseContext 用于访问上下文。\n\n```jsx\nimport React, { useContext } from \'react\';\nimport { ThemeContext } from \'./ThemeContext\';\n\nfunction ThemedButton() {\n  const theme = useContext(ThemeContext);\n\n  return (\n    <button style={{ background: theme.background, color: theme.foreground }}>\n      I am styled by theme context!\n    </button>\n  );\n}\,\n```\n\n### useReducer\n\nuseReducer 是 useState 的替代方案，适用于复杂的状态逻辑。\n\n```jsx\nimport React, { useReducer } from \'react\';\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case \'increment\':\n      return { count: state.count + 1 };\n    case \'decrement\':\n      return { count: state.count - 1 };\n    default:\n      throw new Error();\n  }\n}\,\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: \'increment\' })}>+</button>\n      <button onClick={() => dispatch({ type: \'decrement\' })}>-</button>\n    </div>\n  );\n}\,\n```\n\n## 自定义 Hooks\n\n我们还可以创建自定义 Hooks 来重用状态逻辑。\n\n```jsx\nimport { useState, useEffect } from \'react\';\n\nfunction useWindowSize() {\n  const [size, setSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight,\n  });\n\n  useEffect(() => {\n    function handleResize() {\n      setSize({\n        width: window.innerWidth,\n        height: window.innerHeight,\n      });\n    }\n\n    window.addEventListener(\'resize\', handleResize);\n    return () => window.removeEventListener(\'resize\', handleResize);\n  }, []);\n\n  return size;\n}\,\n\nfunction WindowSizeDisplay() {\n  const size = useWindowSize();\n\n  return (\n    <div>\n      <p>Window width: {size.width}</p>\n      <p>Window height: {size.height}</p>\n    </div>\n  );\n}\,\n```',
    date: '2023-09-20',
    category: 'React'
  }
]