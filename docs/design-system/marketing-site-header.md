# MarketingSiteHeader

站点顶栏：品牌、主导航和右侧操作。登录按钮通过 `actions` 插槽传入，组件本身不处理登录。

源码：`app/components/marketing/SiteHeader.vue`

## Props

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 是 | 品牌名称，链到首页 |
| `links` | `{ label: string, to: string }[]` | 否 | 主导航 |
| `homeTo` | `string` | 否 | 品牌链接，默认 `/` |
| `navLabel` | `string` | 否 | 导航的 `aria-label`，默认 `Main` |

## Slots

| Slot | 说明 |
| --- | --- |
| `actions` | 导航右侧内容，例如登录按钮 |

## 示例

```vue
<MarketingSiteHeader :title="siteName" :links="[{ label: 'Pricing', to: '/pricing' }]">
  <template #actions>
    <AuthActions />
  </template>
</MarketingSiteHeader>
```

Loading、Empty、Error 不适用于这个组件。
