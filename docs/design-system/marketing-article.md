# MarketingArticle

长文或政策页的标题和正文表面。未发布时保持现有的标题加一段说明；加载和失败使用 `UiAsyncState`。

源码：`app/components/marketing/Article.vue`

## Props

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 是 | 文章标题 |
| `status` | `'loading' \| 'empty' \| 'error' \| 'ready'` | 否 | 默认 `ready` |
| `description` | `string` | 否 | Empty 时的正文。Error 时作为错误说明 |
| `errorTitle` | `string` | 否 | 错误标题，默认 `This page could not be loaded` |

## Slots

| Slot | 说明 |
| --- | --- |
| `default` | `ready` 时的正文 |
| `actions` | Loading 以外的 Error 操作 |

Empty 固定渲染一段说明，以便政策占位页保持原来的版式。

## 示例

```vue
<MarketingArticle title="Terms of service" status="empty" description="This policy has not been published yet." />

<MarketingArticle title="Terms of service">
  <p>Published policy text.</p>
</MarketingArticle>

<MarketingArticle title="Terms of service" status="loading" />

<MarketingArticle title="Terms of service" status="error" description="The article could not be loaded." />
```

适用状态：`loading`、`empty`、`error`、`ready`。
