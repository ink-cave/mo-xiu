# mo-xiu Server

基于 NestJS 的后端服务，为 mo-xiu 项目提供 API 接口和数据库交互。

## 项目概述

`mo-xiu server` 是一个基于 NestJS 框架的后端服务，主要功能包括：

- **用户管理**：用户注册、登录、查询、更新、删除
- **产品管理**：产品创建、查询、更新、删除
- **数据库交互**：使用 TypeORM 与 SQLite 数据库交互
- **API 接口**：提供 RESTful API 接口供前端调用

## 技术栈

- **NestJS**：Node.js 后端框架
- **TypeScript**：类型安全的 JavaScript 超集
- **TypeORM**：对象关系映射库
- **SQLite**：轻量级数据库
- **class-validator**：数据验证库
- **bcrypt**：密码加密库

## 目录结构

```
server/
├── src/
│   ├── user/            # 用户模块
│   │   ├── dto/         # 数据传输对象
│   │   ├── entities/    # 数据库实体
│   │   ├── user.controller.ts    # 用户控制器
│   │   ├── user.service.ts       # 用户服务
│   │   ├── user.module.ts        # 用户模块
│   │   └── ...
│   ├── product/         # 产品模块
│   │   ├── dto/         # 数据传输对象
│   │   ├── entities/    # 数据库实体
│   │   ├── product.controller.ts    # 产品控制器
│   │   ├── product.service.ts       # 产品服务
│   │   ├── product.module.ts        # 产品模块
│   │   └── ...
│   ├── app.controller.ts    # 应用控制器
│   ├── app.service.ts       # 应用服务
│   ├── app.module.ts        # 应用模块
│   └── main.ts              # 应用入口
├── test/              # 测试目录
├── .gitignore         # Git 忽略文件
├── README.md          # 项目说明文档
├── nest-cli.json      # Nest CLI 配置
├── package.json       # 项目配置
├── tsconfig.build.json # TypeScript 构建配置
└── tsconfig.json      # TypeScript 配置
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
npm run start:dev

# 或使用 pnpm
pnpm start:dev
```

服务将在 `http://localhost:3000` 启动。

### 构建项目

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

### 生产模式运行

```bash
# 使用 npm
npm run start:prod

# 或使用 pnpm
pnpm start:prod
```

## API 接口

### 用户接口

| 方法   | 路径        | 描述         |
| ------ | ----------- | ------------ |
| POST   | /user       | 创建用户     |
| POST   | /user/login | 用户登录     |
| GET    | /user       | 获取所有用户 |
| GET    | /user/:id   | 获取单个用户 |
| PATCH  | /user/:id   | 更新用户     |
| DELETE | /user/:id   | 删除用户     |

### 产品接口

| 方法   | 路径         | 描述         |
| ------ | ------------ | ------------ |
| POST   | /product     | 创建产品     |
| GET    | /product     | 获取所有产品 |
| GET    | /product/:id | 获取单个产品 |
| PATCH  | /product/:id | 更新产品     |
| DELETE | /product/:id | 删除产品     |

## 数据库配置

项目使用 SQLite 数据库，配置如下：

- **数据库类型**：SQLite
- **数据库文件**：`mo_xiu.sqlite`（项目根目录自动生成）
- **实体路径**：`src/**/*.entity{.ts,.js}`
- **同步模式**：`true`（开发环境自动建表，生产务必关闭）

## 测试

### 运行单元测试

```bash
# 使用 npm
npm run test

# 或使用 pnpm
pnpm test
```

### 运行端到端测试

```bash
# 使用 npm
npm run test:e2e

# 或使用 pnpm
pnpm test:e2e
```

### 运行测试覆盖率

```bash
# 使用 npm
npm run test:cov

# 或使用 pnpm
pnpm test:cov
```

## 部署

### 构建项目

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

### 启动生产模式

```bash
# 使用 npm
npm run start:prod

# 或使用 pnpm
pnpm start:prod
```

### 环境变量

生产环境建议配置以下环境变量：

- `NODE_ENV`：`production`
- `PORT`：服务端口（默认 3000）
- `DATABASE_URL`：数据库连接字符串

## 开发指南

### 添加新模块

1. **创建模块目录**：

   ```bash
   nest generate module <module-name>
   ```

2. **创建控制器**：

   ```bash
   nest generate controller <module-name>
   ```

3. **创建服务**：

   ```bash
   nest generate service <module-name>
   ```

4. **创建实体**：

   ```bash
   nest generate class <module-name>/entities/<entity-name>.entity
   ```

5. **创建 DTO**：
   ```bash
   nest generate class <module-name>/dto/create-<module-name>.dto
   nest generate class <module-name>/dto/update-<module-name>.dto
   ```

### 代码质量

- **代码格式化**：

  ```bash
  pnpm format
  ```

- **代码质量检查**：

  ```bash
  pnpm lint
  ```

- **类型检查**：
  ```bash
  pnpm build
  ```

## 许可证

MIT 许可证

## 联系方式

- **项目地址**：https://github.com/your-username/mo-xiu
- **问题反馈**：https://github.com/your-username/mo-xiu/issues
- **贡献**：https://github.com/your-username/mo-xiu/pulls
