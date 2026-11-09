# UiAsyncState

一个区域内的 Loading、Empty、Error、Ready 切换。账号、列表和营销区块都走这个组件，不要再手写三套提示。

源码：`app/components/ui/AsyncState.vue`

## Props

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status` | `'loading' \| 'empty' \| 'error' \| 'ready'` | 是 | 当前状态 |
| `title` | `string` | 否 | Empty / Error 标题。Loading 时作为屏幕阅读器文本 |
| `description` | `string` | 否 | Empty / Error 说明 |

## Slots

| Slot | 说明 |
| --- | --- |
| `default` | `status` 为 `ready` 时的内容 |
| `loading` | 替换默认骨架屏 |
| `empty` | 替换默认 `UEmpty` |
| `error` | 替换默认 `UAlert` |
| `actions` | Empty / Error 上的操作，例如重试 |

默认 Loading 使用 `USkeleton`。默认 Empty 使用 `UEmpty`。默认 Error 使用 `UAlert`，`color="error"`。

## 示例

```vue
<UiAsyncState :status="status" title="No purchases yet" description="Purchases will appear here.">
  <BillingTable :rows="rows" />
  <template #actions>
    <UButton variant="outline" @click="refresh">Retry</UButton>
  </template>
</UiAsyncState>
```

`ready` 渲染默认插槽。`loading`、`empty`、`error` 分别渲染对应状态。
