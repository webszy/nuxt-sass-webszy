# 给 AI 编码工具

做界面之前，先读 `registry/components.json`，再打开对应文档。能复用已有组件或 Nuxt UI 组件时，不要新写一套。

## 顺序

1. 在注册表里按用途查找。名称、源码、文档、props、slots 和状态都在 `registry/components.json`。
2. 注册表没有时，直接使用 Nuxt UI 4.10.0 已有组件：`UButton`、`UCard`、`UAlert`、`UEmpty`、`USkeleton`、`UContainer`、`UModal`、`UTable`、`UForm`、`UInput`。
3. 仍然不够，并且至少会有第二处复用时，再在 `app/components/ui/` 或 `app/components/marketing/` 增加组件。同时补 `docs/design-system/` 文档和注册表条目，并运行 `pnpm registry:check`。

## 不要做的事

- 不要安装另一套 UI 框架，也不要把组件抽成独立 npm 包。
- 不要为 `UButton`、`UCard`、`UModal`、`UAlert`、`UEmpty`、`UTable` 再包一层只转发属性的组件。
- 不要在 `app/assets/css/main.css` 里新增固定色值或全局元素选择器。颜色和圆角用 `--ui-*` 语义变量；组件默认样式写在 `app/app.config.ts`。
- 页面里的 Loading、Empty、Error 使用 `UiAsyncState`。
- 营销页顶部使用 `MarketingHero`。`UPageHero` 自带容器和另一套字号，不要放进现有的 `main`。
- `app/pages/dev/design-system` 只用于本地查看组件。生产构建会去掉 `/dev` 路由，不要把它链到公开导航。
- 不要为了调整界面去改 Clerk、Creem、D1、登录或支付逻辑。

## 本地检查

```sh
pnpm registry:check
pnpm dev
```

开发服务器打开 `/dev/design-system` 查看组件的 Ready、Loading、Empty 和 Error 状态。
