# Vue 3 项目

这是一个使用Vue 3、TypeScript、Vue Router、Pinia和UnoCSS构建的示例项目。

## 技术栈

- **Vue 3**: 渐进式JavaScript框架
- **TypeScript**: 带类型的JavaScript超集
- **Vue Router**: Vue.js官方路由管理器
- **Pinia**: Vue的状态管理库
- **UnoCSS**: 即时的原子化CSS引擎
- **Sass**: CSS预处理器

## 项目结构

```
website/
├── public/             # 静态资源目录
├── src/                # 源代码目录
│   ├── assets/         # 资源文件(图片、字体等)
│   ├── components/     # 可复用组件
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia状态管理
│   ├── views/          # 页面组件
│   ├── App.vue         # 根组件
│   ├── main.ts         # 应用入口
│   ├── style.scss      # 全局样式
│   └── uno.css         # UnoCSS入口
├── uno.config.ts       # UnoCSS配置
├── vite.config.ts      # Vite配置
├── tsconfig.json       # TypeScript配置
└── package.json        # 项目依赖
```

## 目录结构最佳实践

### Components vs. Views

- **components/**: 存放可复用的组件
  - 这些组件通常不直接与路由关联
  - 例如：按钮、卡片、表单输入、模态框等
  - 命名约定：通常使用Pascal命名法（如`BaseButton.vue`）
  
- **views/**: 存放与路由直接对应的页面组件
  - 这些组件直接映射到路由路径
  - 例如：首页、关于页、用户配置文件页等
  - 命名约定：通常以"View"或"Page"结尾（如`HomeView.vue`）

## 原子化CSS与UnoCSS

本项目使用UnoCSS实现原子化CSS开发，主要优势：

- **开发效率高**: 无需在CSS和HTML之间切换
- **一致性**: 使用预定义的原子类确保设计一致性
- **按需生成**: 只生成实际使用的CSS，文件小
- **响应式设计**: 内置响应式工具类，如`md:flex`

### UnoCSS快捷方式

我们在`uno.config.ts`中定义了一些常用的快捷方式：

```js
shortcuts: {
  'btn': 'py-2 px-4 rounded-lg font-medium transition-all duration-200',
  'btn-primary': 'btn bg-primary text-white hover:bg-opacity-90',
  'card': 'bg-white rounded-lg shadow p-4 dark:bg-dark dark:text-light',
  'container': 'max-w-6xl mx-auto px-4',
  'flex-center': 'flex items-center justify-center',
}
```

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 组件开发规范

- 所有可复用组件应放在`components/`目录下
- 路由页面组件应放在`views/`目录下
- 组件应遵循单一职责原则
- 使用TypeScript类型来定义props和emits
- 使用组合式API（Composition API）和`<script setup>`语法
