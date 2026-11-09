# UiMetric

标签加一个大数字，用于额度、价格或其他单个指标。Loading、Empty、Error 交给 `UiAsyncState`。

源码：`app/components/ui/Metric.vue`

## Props

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `label` | `string` | 是 | 指标名称 |
| `value` | `string \| number \| null` | 否 | 未传 `status` 时，`null`、`undefined` 和空字符串视为 empty。`0` 是有效值 |
| `hint` | `string` | 否 | Ready 状态下数字下方的说明 |
| `status` | `'loading' \| 'empty' \| 'error' \| 'ready'` | 否 | 显式状态。不传时按 `value` 推断 |
| `emptyTitle` | `string` | 否 | 默认 `No value yet` |
| `errorTitle` | `string` | 否 | 默认 `Could not load this value` |

## Slots

| Slot | 说明 |
| --- | --- |
| `default` | 替换 Ready 状态下的数字 |
| `actions` | Ready 时跟在数字后；Empty / Error 时作为重试等操作 |

## 示例

```vue
<UiMetric label="Available credits" :value="120" hint="Ready to use" />

<UiMetric label="Available credits" status="loading" />

<UiMetric label="Available credits" status="empty" />

<UiMetric label="Available credits" status="error">
  <template #actions>
    <UButton variant="outline" @click="refresh">Retry</UButton>
  </template>
</UiMetric>
```

适用状态：`loading`、`empty`、`error`、`ready`。
