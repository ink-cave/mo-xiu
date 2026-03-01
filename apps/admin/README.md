# mo-xiu Admin

基于 Vue 3 的管理后台，用于管理 mo-xiu 项目的系统数据和用户。

## 项目概述

`mo-xiu admin` 是一个基于 Vue 3 框架的管理后台，主要功能包括：

- **用户管理**：管理系统用户，包括查看、编辑、删除用户
- **产品管理**：管理系统产品，包括创建、编辑、删除产品
- **系统设置**：管理系统配置和设置
- **数据统计**：查看系统数据统计和分析

## 技术栈

- **Vue 3**：渐进式 JavaScript 框架
- **TypeScript**：类型安全的 JavaScript 超集
- **Vite**：快速的前端构建工具
- **Tailwind CSS**：实用优先的 CSS 框架
- **Vue Router**：Vue 的官方路由

## 目录结构

```
admin/
├── src/
│   ├── assets/         # 静态资源
│   ├── components/     # 组件
│   ├── router/         # 路由配置
│   ├── stores/         # 状态管理
│   ├── views/          # 页面
│   │   ├── home/       # 首页
│   │   ├── user/       # 用户管理
│   │   ├── product/    # 产品管理
│   │   ├── system/     # 系统设置
│   │   └── ...
│   ├── App.vue         # 应用根组件
│   ├── global.css      # 全局样式
│   └── main.ts         # 应用入口
├── public/             # 公共静态资源
├── .gitignore          # Git 忽略文件
├── README.md           # 项目说明文档
├── index.html          # HTML 入口文件
├── package.json        # 项目配置
├── tsconfig.app.json   # TypeScript 应用配置
├── tsconfig.json       # TypeScript 配置
├── tsconfig.node.json  # TypeScript Node 配置
└── vite.config.ts      # Vite 配置
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

服务将在 `http://localhost:5173` 启动。

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
npm run preview

# 或使用 pnpm
pnpm preview
```

## 页面结构

### 首页

- 系统概览
- 数据统计
- 最近活动

### 用户管理

- 用户列表
- 用户详情
- 创建用户
- 编辑用户
- 删除用户

### 产品管理

- 产品列表
- 产品详情
- 创建产品
- 编辑产品
- 删除产品

### 系统设置

- 系统配置
- 权限管理
- 日志查看

## 开发指南

### 添加新页面

1. **创建页面组件**：在 `src/views` 目录下创建新的页面目录和组件文件

2. **配置路由**：在 `src/router/index.ts` 文件中添加新的路由配置

3. **添加导航菜单**：在适当的位置添加导航菜单链接

### 添加新组件

1. **创建组件文件**：在 `src/components` 目录下创建新的组件文件

2. **使用组件**：在页面中导入并使用组件

### 样式管理

- 使用 Tailwind CSS 进行样式管理
- 全局样式在 `src/global.css` 文件中定义
- 组件样式在组件文件中使用 `<style>` 标签定义

## 部署

### 构建项目

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

### 部署到静态网站托管服务

构建完成后，可以将 `dist` 目录部署到任何静态网站托管服务，例如：

- **Vercel**：https://vercel.com
- **Netlify**：https://www.netlify.com
- **GitHub Pages**：https://pages.github.com
- **AWS S3**：https://aws.amazon.com/s3

## 环境变量

### 开发环境

在 `.env.development` 文件中配置开发环境变量：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 生产环境

在 `.env.production` 文件中配置生产环境变量：

```env
VITE_API_BASE_URL=https://api.mo-xiu.com/api
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
