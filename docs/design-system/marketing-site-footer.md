# MarketingSiteFooter

站点页脚：版权和法务链接。

源码：`app/components/marketing/SiteFooter.vue`

## Props

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 是 | 显示在版权行里的站点名 |
| `links` | `{ label: string, to: string }[]` | 否 | 页脚链接 |
| `navLabel` | `string` | 否 | 导航的 `aria-label`，默认 `Legal` |

## Slots

这个组件没有插槽。

## 示例

```vue
<MarketingSiteFooter
  :title="siteName"
  :links="[
    { label: 'Terms', to: '/terms' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Refunds', to: '/refund-policy' },
  ]"
/>
```

Loading、Empty、Error 不适用于这个组件。
