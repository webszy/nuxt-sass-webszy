# MarketingFeatureGrid

一组标题加说明的卡片。卡片使用 `UCard`。没有数据、正在加载或加载失败时使用 `UiAsyncState`。

源码：`app/components/marketing/FeatureGrid.vue`

## Props

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `items` | `{ title: string, description: string }[]` | 是 | 卡片内容 |
| `status` | `'loading' \| 'empty' \| 'error' \| 'ready'` | 否 | 默认 `ready`。`ready` 且 `items` 为空时显示 empty |
| `emptyTitle` | `string` | 否 | 空状态标题 |
| `emptyDescription` | `string` | 否 | 空状态说明 |
| `errorTitle` | `string` | 否 | 错误标题 |
| `errorDescription` | `string` | 否 | 错误说明 |

## Slots

| Slot | 说明 |
| --- | --- |
| `item` | 自定义单张卡片内容，参数为 `{ item }` |
| `actions` | Loading 以外的 Empty / Error 操作 |

## 示例

```vue
<MarketingFeatureGrid :items="features" />

<MarketingFeatureGrid :items="[]" status="loading" />

<MarketingFeatureGrid :items="[]" />

<MarketingFeatureGrid :items="features" status="error" error-title="Could not load features">
  <template #actions>
    <UButton variant="outline" @click="refresh">Retry</UButton>
  </template>
</MarketingFeatureGrid>
```

适用状态：`loading`、`empty`、`error`、`ready`。
