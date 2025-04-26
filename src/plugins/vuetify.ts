/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

// TODO: We can move the TicTac theme to a separate file for better organization
export default createVuetify({
  theme: {
    defaultTheme: 'tictac',
    themes: {
      tictac: {
        colors: {
          primary: '#E02A63',
        },
      },
    },
  },
})
