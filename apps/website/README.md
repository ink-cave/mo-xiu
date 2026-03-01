# mo-xiu Website

基于 Next.js 的前端网站，面向最终用户展示 mo-xiu 项目的内容和功能。

## 项目概述

`mo-xiu website` 是一个基于 Next.js 框架的前端网站，主要功能包括：

- **首页**：展示项目的主要信息和功能
- **产品展示**：展示项目的产品和服务
- **关于我们**：介绍项目的背景和团队
- **联系我们**：提供联系方式和反馈渠道
- **CSS 效果**：展示各种 CSS 效果和动画
- **UI 组件**：展示各种 UI 组件和设计

## 技术栈

- **Next.js**：React 框架
- **TypeScript**：类型安全的 JavaScript 超集
- **Tailwind CSS**：实用优先的 CSS 框架
- **React**：JavaScript 库
- **Framer Motion**：动画库

## 目录结构

```
website/
├── app/                # 应用目录
│   ├── about/          # 关于我们
│   ├── css-effects/    # CSS 效果
│   ├── feedback/       # 反馈页面
│   ├── plugins/        # 插件页面
│   ├── products/       # 产品页面
│   ├── ui-components/  # UI 组件页面
│   ├── favicon.ico     # 网站图标
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 布局组件
│   └── page.tsx        # 首页
├── components/         # 组件目录
│   ├── Footer.tsx      # 页脚组件
│   ├── Navbar.tsx      # 导航栏组件
│   └── ...
├── public/             # 公共静态资源
├── .gitignore          # Git 忽略文件
├── README.md           # 项目说明文档
├── components.json     # 组件配置
├── next.config.ts      # Next.js 配置
├── package.json        # 项目配置
├── pnpm-lock.yaml      # pnpm 依赖锁文件
├── postcss.config.mjs  # PostCSS 配置
└── tsconfig.json       # TypeScript 配置
```

## 快速开始

### 前置要求

- **Node.js**：v18.0.0 或更高版本
- **npm** 或 **pnpm**：包管理器

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 开发模式运行

```bash
# 使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

服务将在 `http://localhost:3000` 启动。

### 构建项目

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

### 预览构建结果

```bash
# 使用 npm
npm run start

# 或使用 pnpm
pnpm start
```

## 页面结构

### 首页

- 项目介绍
- 主要功能
- 最新产品
- 联系方式

### 产品页面

- 产品列表
- 产品详情
- 产品分类

### 关于我们

- 项目背景
- 团队介绍
- 发展历程

### CSS 效果

- 各种 CSS 效果展示
- 动画示例
- 交互效果

### UI 组件

- 各种 UI 组件展示
- 组件使用示例
- 设计系统

## 开发指南

### 添加新页面

1. **创建页面目录**：在 `app` 目录下创建新的页面目录

2. **创建页面文件**：在新目录中创建 `page.tsx` 文件

3. **添加导航链接**：在 `components/Navbar.tsx` 文件中添加导航链接

### 添加新组件

1. **创建组件文件**：在 `components` 目录下创建新的组件文件

2. **使用组件**：在页面中导入并使用组件

### 样式管理

- 使用 Tailwind CSS 进行样式管理
- 全局样式在 `app/globals.css` 文件中定义
- 组件样式使用 Tailwind CSS 类名定义

## 部署

### 构建项目

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

### 部署到 Vercel

1. **连接 GitHub 仓库**：在 Vercel 中连接你的 GitHub 仓库

2. **配置部署**：设置部署配置，包括构建命令和输出目录

3. **部署项目**：点击部署按钮，等待部署完成

4. **访问网站**：部署完成后，Vercel 会提供一个访问 URL

### 部署到其他平台

也可以部署到其他静态网站托管服务，例如：

- **Netlify**：https://www.netlify.com
- **GitHub Pages**：https://pages.github.com
- **AWS S3**：https://aws.amazon.com/s3

## 环境变量

### 开发环境

在 `.env.local` 文件中配置开发环境变量：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 生产环境

在 `.env.production` 文件中配置生产环境变量：

```env
NEXT_PUBLIC_API_BASE_URL=https://api.mo-xiu.com/api
```

## 代码质量

### 代码格式化

```bash
# 使用 npm
npm run format

# 或使用 pnpm
pnpm format
```

### 代码质量检查

```bash
# 使用 npm
npm run lint

# 或使用 pnpm
pnpm lint
```

## 许可证

MIT 许可证

## 联系方式

- **项目地址**：https://github.com/your-username/mo-xiu
- **问题反馈**：https://github.com/your-username/mo-xiu/issues
- **贡献**：https://github.com/your-username/mo-xiu/pulls
