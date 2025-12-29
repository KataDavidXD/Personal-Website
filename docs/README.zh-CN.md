# 个人网站

基于 Next.js 14、MDX 和 Tailwind CSS 构建的现代化个人网站。

## ✨ 特性

- **📝 MDX 博客**：使用 Markdown + React 组件编写文章
- **🎨 精美设计**：现代 UI，支持深色/浅色主题
- **🚀 极速加载**：静态生成 + 边缘缓存
- **📊 SEO 优化**：Meta 标签、OG 图片、Sitemap、RSS
- **📱 响应式**：移动端优先设计
- **💬 评论系统**：Giscus 集成（基于 GitHub Discussions）
- **📧 Newsletter**：支持 Substack/Beehiiv 集成

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 样式 | Tailwind CSS |
| 内容 | Contentlayer + MDX |
| 动画 | Framer Motion |
| 部署 | Vercel |
| 图标 | Lucide Icons |

---

## 🚀 快速开始

### 环境要求

- Node.js 18+（推荐 20+）
- npm 或 pnpm

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的配置：

```env
# 网站 URL（部署后修改为你的域名）
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Umami 分析（可选）
UMAMI_WEBSITE_ID=
UMAMI_SCRIPT_URL=

# Giscus 评论（可选）
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

### 3. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 4. 构建生产版本

```bash
pnpm build
pnpm start
```

---

## 📝 内容管理

### 目录结构

```
content/
├── blog/           # 博客文章
│   └── 2024/       # 按年份组织
├── projects/       # 项目展示
├── papers/         # 学术论文
└── pages/          # 静态页面（关于、现在）
```

### 创建新博客文章

**方法一：使用脚本**

```bash
pnpm new-post
```

按提示输入标题、描述、分类和标签。

**方法二：手动创建**

在 `content/blog/2024/` 下创建 `.mdx` 文件：

```mdx
---
title: "文章标题"
description: "文章描述"
date: 2024-12-29
category: agent-infra  # agent-infra | game-engine | thinking
language: zh           # en | zh | bilingual
tags:
  - AI
  - 技术
published: true        # false = 草稿
featured: false        # true = 首页推荐
---

正文内容...
```

### 创建项目页面

在 `content/projects/` 下创建 `.mdx` 文件：

```mdx
---
title: "项目名称"
description: "项目简介"
status: active         # active | completed | archived
startDate: 2024-01-01
stack:
  - Python
  - React
github: https://github.com/...
featured: true
---

项目详细介绍...
```

---

## 🎨 个性化配置

### 修改站点信息

编辑 `src/lib/constants.ts`：

```typescript
export const siteConfig = {
  name: '你的名字',
  title: '你的名字 - 个人主页',
  description: '网站描述...',
  author: {
    name: '你的名字',
    email: 'your@email.com',
    twitter: '@yourhandle',
    github: 'yourusername',
  },
  // ...
};
```

### 修改导航栏

编辑 `src/components/layout/Header.tsx`：

```typescript
const navigation = [
  { name: '博客', href: '/blog' },
  { name: '项目', href: '/projects' },
  { name: '论文', href: '/papers' },
  { name: '关于', href: '/about' },
];
```

### 修改社交链接

编辑 `src/components/layout/Footer.tsx` 中的 `socialLinks` 数组。

---

## 🚢 部署指南

### 方案一：Vercel（推荐）

1. **推送代码到 GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

2. **导入到 Vercel**

- 访问 [vercel.com](https://vercel.com)
- 点击 "New Project"
- 选择你的 GitHub 仓库
- 框架自动识别为 Next.js

3. **配置环境变量**

在 Vercel 项目设置中添加：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SITE_URL` | `https://你的域名.com` |

4. **绑定自定义域名**（可选）

- 在 Vercel 项目设置 → Domains
- 添加你的域名
- 按提示配置 DNS

### 方案二：Cloudflare Pages

1. 推送代码到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Pages → Create a project → Connect to Git
4. 构建设置：
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

### 方案三：自托管

```bash
# 构建
npm run build

# 使用 PM2 运行
npm install -g pm2
pm2 start npm --name "personal-website" -- start

# 或使用 Docker（需要自己创建 Dockerfile）
```

---

## 📊 分析与评论

### 配置 Umami 分析

1. 在 [umami.is](https://umami.is) 或自托管 Umami
2. 创建网站，获取 Website ID 和脚本 URL
3. 添加到 `.env.local`：

```env
UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
UMAMI_SCRIPT_URL=https://analytics.yourdomain.com/script.js
```

### 配置 Giscus 评论

1. 在 GitHub 仓库启用 Discussions
2. 访问 [giscus.app](https://giscus.app) 生成配置
3. 添加到 `.env.local`：

```env
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

---

## 🔧 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm start` | 运行生产服务器 |
| `pnpm lint` | 代码检查 |
| `pnpm format` | 格式化代码 |
| `pnpm new-post` | 创建新文章 |

---

## 📁 项目结构

```
personal-website/
├── content/                # MDX 内容
│   ├── blog/              # 博客文章
│   ├── projects/          # 项目
│   ├── papers/            # 论文
│   └── pages/             # 静态页面
├── public/                 # 静态资源
│   ├── images/            # 图片
│   ├── papers/            # PDF 文件
│   └── robots.txt         # SEO
├── src/
│   ├── app/               # Next.js 页面
│   ├── components/        # React 组件
│   ├── lib/               # 工具函数
│   └── types/             # TypeScript 类型
├── docs/
│   ├── architecture.md    # 架构文档
│   └── TODO.md            # 开发计划
└── scripts/               # 脚本工具
```

---

## 🔄 更新维护

### 更新依赖

```bash
# 检查过时的包
npm outdated

# 更新所有依赖
npm update

# 更新到最新主版本（谨慎）
npx npm-check-updates -u
npm install
```

### 备份内容

定期备份 `content/` 目录，这是你所有文章的源文件。

---

## ❓ 常见问题

### Q: 如何添加新的内容分类？

编辑 `contentlayer.config.ts` 中的 `category` 枚举，以及 `src/lib/constants.ts` 中的 `pillars` 和 `categories`。

### Q: 如何修改主题颜色？

编辑 `src/app/globals.css` 中的 CSS 变量和 `tailwind.config.ts` 中的颜色配置。

### Q: 部署后图片不显示？

确保图片放在 `public/` 目录下，并使用相对路径引用（如 `/images/photo.jpg`）。

### Q: 如何启用中文支持？

1. 在文章 frontmatter 中设置 `language: zh`
2. 修改 `src/app/layout.tsx` 中的 `lang="en"` 为 `lang="zh"`（如果主要是中文内容）

---

## 📄 许可证

MIT License - 可自由用于个人或商业项目。

---

## 🙏 致谢

感谢开源社区的优秀项目：Next.js, Tailwind CSS, Contentlayer, Vercel。

