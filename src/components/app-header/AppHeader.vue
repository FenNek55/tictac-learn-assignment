<template>
  <header class="app-header">
    <v-container class="pt-6 mb-6" fluid max-width="2000">
      <div class="app-header__content mb-4 mb-md-0">
        <RouterLink to="/">
          <v-img class="app-header__logo" src="@/assets/logo.svg" />
        </RouterLink>
        <ProductSearchbar v-model="titleFilter" class="app-header__searchbar-desktop d-none d-md-flex" @clear-input="onClearInput" @submit-search="onSearchSubmit" />
        <div class="app-header__right">
          <v-badge color="primary" :content="23">
            <v-btn elevation="0" icon="mdi-cart" />
          </v-badge>
          <v-btn elevation="0" icon="mdi-brightness-6" @click="toggleTheme" />
          <v-avatar image="@/assets/images/placeholder_avatar.jpg" size="42" />
        </div>
      </div>
      <ProductSearchbar v-model="titleFilter" class="app-header__searchbar-mobile d-flex d-md-none" @clear-input="onClearInput" @submit-search="onSearchSubmit" />
    </v-container>
    <v-divider />
  </header>
</template>

<script lang="ts" setup>
  import { debounce } from 'lodash'
  import { useProductsStore } from '@/stores/useProductsStore'
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  const router = useRouter()

  const productsStore = useProductsStore()
  const { fetchProducts } = productsStore
  const { titleFilter } = storeToRefs(productsStore)

  const onSearchSubmit = debounce(() => {
    router.push('/products')
    fetchProducts()
  }, 300)

  const onClearInput = debounce(() => {
    fetchProducts()
  }, 300)

  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'tictac' : 'tictacDark'
  }

</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgb(var(--v-theme-background));

  &__content {
    display: flex;
    gap: 24px;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    flex-grow: 0;
    flex-shrink: 0;
    width: 140px;
    height: auto;
  }

  &__right {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  &__searchbar-mobile {
    max-width: 100%;
  }
}
</style>
