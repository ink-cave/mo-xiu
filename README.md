# mo-xiu

基于 pnpm monorepo 架构的全栈多端技术实践与产品化项目，持续集成迭代。

## 项目概述

`mo-xiu` 是一个全栈多端项目，包含以下子项目：

- **server**：基于 NestJS 的后端服务，提供 API 接口和数据库交互
- **admin**：基于 Vue 3 的管理后台，用于管理系统数据和用户
- **website**：基于 Next.js 的前端网站，面向最终用户展示内容

## 技术栈

### 后端技术栈

- **NestJS**：Node.js 后端框架
- **TypeScript**：类型安全的 JavaScript 超集
- **TypeORM**：对象关系映射库
- **SQLite**：轻量级数据库

### 前端技术栈

- **Vue 3**：渐进式 JavaScript 框架（管理后台）
- **Next.js**：React 框架（前端网站）
- **TypeScript**：类型安全的 JavaScript 超集
- **Tailwind CSS**：实用优先的 CSS 框架

### 开发工具

- **pnpm**：快速、节省空间的包管理器
- **Turbo**：高效的构建系统
- **ESLint**：代码质量检查工具
- **Prettier**：代码格式化工具
- **TypeScript**：类型检查工具

## 目录结构

```
mo-xiu/
├── apps/
│   ├── admin/         # Vue 3 管理后台
│   ├── server/        # NestJS 后端服务
│   └── website/       # Next.js 前端网站
├── packages/          # 共享包
│   ├── core/          # 核心功能
│   ├── react-hooks/   # React 钩子
│   ├── react-ui/      # React UI 组件
│   ├── types/         # 类型定义
│   ├── utils/         # 工具函数
│   ├── vue-composables/ # Vue 组合式 API
│   ├── vue-ui/        # Vue UI 组件
│   └── web-components/ # Web 组件
├── .gitignore         # Git 忽略文件
├── README.md          # 项目说明文档
├── .prettierrc        # Prettier 配置
├── package.json       # 项目配置
├── pnpm-lock.yaml     # pnpm 依赖锁文件
├── pnpm-workspace.yaml # pnpm 工作区配置
├── tsconfig.base.json # TypeScript 基础配置
└── turbo.json         # Turbo 配置
```

## 快速开始

### 前置要求

- **Node.js**：v18.0.0 或更高版本
- **pnpm**：v8.0.0 或更高版本

### 安装依赖

```bash
pnpm install
```

### 开发模式运行

#### 运行所有应用

```bash
pnpm dev
```

#### 运行特定应用

```bash
# 运行后端服务
cd apps/server
pnpm start:dev

# 运行管理后台
cd apps/admin
pnpm dev

# 运行前端网站
cd apps/website
pnpm dev
```

### 构建项目

#### 构建所有应用

```bash
pnpm build
```

#### 构建特定应用

```bash
# 构建后端服务
cd apps/server
pnpm build

# 构建管理后台
cd apps/admin
pnpm build

# 构建前端网站
cd apps/website
pnpm build
```

## 代码质量

### 代码格式化

使用 Prettier 进行代码格式化：

```bash
pnpm format
```

### 代码质量检查

使用 ESLint 进行代码质量检查：

```bash
pnpm lint
```

### 类型检查

使用 TypeScript 进行类型检查：

```bash
pnpm build
```

## 测试

### 运行所有测试

```bash
pnpm test
```

### 运行特定应用测试

```bash
# 运行后端服务测试
cd apps/server
pnpm test

# 运行管理后台测试
cd apps/admin
pnpm test

# 运行前端网站测试
cd apps/website
pnpm test
```

## 部署

### 后端服务部署

```bash
# 构建
cd apps/server
pnpm build

# 启动生产模式
pnpm start:prod
```

### 管理后台部署

```bash
# 构建
cd apps/admin
pnpm build

# 部署到静态网站托管服务
# 例如 Vercel、Netlify、GitHub Pages 等
```

### 前端网站部署

```bash
# 构建
cd apps/website
pnpm build

# 部署到 Vercel 或其他静态网站托管服务
```

## 贡献指南

1. **克隆仓库**：

   ```bash
   git clone https://github.com/your-username/mo-xiu.git
   cd mo-xiu
   ```

2. **创建分支**：

   ```bash
   git checkout -b feature/your-feature
   ```

3. **安装依赖**：

   ```bash
   pnpm install
   ```

4. **开发功能**：
   - 编写代码
   - 运行测试
   - 确保代码质量

5. **提交代码**：

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

6. **推送分支**：

   ```bash
   git push origin feature/your-feature
   ```

7. **创建 Pull Request**：
   - 打开 GitHub 仓库
   - 创建新的 Pull Request
   - 描述你的更改
   - 等待审核

## 许可证

MIT 许可证

## 联系方式

- **项目地址**：https://github.com/your-username/mo-xiu
- **问题反馈**：https://github.com/your-username/mo-xiu/issues
- **贡献**：https://github.com/your-username/mo-xiu/pulls
