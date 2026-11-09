export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'indigo',
      success: 'green',
      info: 'sky',
      warning: 'amber',
      error: 'red',
      neutral: 'slate',
    },
    button: {
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md',
      },
    },
    card: {
      slots: {
        root: () => 'rounded-2xl overflow-hidden',
        header: () => 'p-7',
        body: () => 'p-7',
        footer: () => 'p-7',
      },
      defaultVariants: {
        variant: 'outline',
      },
    },
    alert: {
      defaultVariants: {
        color: 'neutral',
        variant: 'subtle',
        orientation: 'vertical',
      },
    },
    empty: {
      defaultVariants: {
        variant: 'naked',
        size: 'md',
      },
    },
    container: {
      base: () => 'w-full max-w-(--ui-container) mx-auto px-5',
    },
  },
})
