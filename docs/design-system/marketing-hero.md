# MarketingHero

营销页顶部：可选眉题、标题、说明和操作区。用在已有页面宽度里，不要再套一层 `UPageHero`，那个组件自带容器和另一套字号。

源码：`app/components/marketing/Hero.vue`

按钮继续用 `UButton`，不要封装按钮。

## Props

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 是 | 主标题 |
| `eyebrow` | `string` | 否 | 标题上方的短标签 |
| `description` | `string` | 否 | 标题下的说明 |

## Slots

| Slot | 说明 |
| --- | --- |
| `title` | 替换标题文本 |
| `description` | 替换说明 |
| `actions` | 操作按钮 |
| `default` | 操作区后面的补充内容 |

## 示例

```vue
<MarketingHero
  eyebrow="Your next chapter"
  title="A fresh start for your next idea."
  description="A simple starting point for your next product."
>
  <template #actions>
    <UButton size="xl">Get started</UButton>
    <UButton size="xl" to="/pricing" variant="outline">View pricing</UButton>
  </template>
</MarketingHero>
```

Loading、Empty、Error 不适用于这个组件。异步内容放到后面的区块里，用 `UiAsyncState`。
