import vuetify from 'eslint-config-vuetify/index.ts.mjs'

export default [
  {
    ...vuetify,
    languageOptions: {
      ...(vuetify.languageOptions || {}),
      globals: {
        ...(vuetify.languageOptions?.globals || {}),
        IntersectionObserver: 'readonly',
        IntersectionObserverInit: 'readonly',
        HTMLElement: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
  },
]
