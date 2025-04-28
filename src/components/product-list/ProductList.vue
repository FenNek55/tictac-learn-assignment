<template>
  <div class="product-list__wrapper">
    <div class="product-list">
      <ProductListCard v-for="product in products" :key="product.id" :product="product" />
      <v-skeleton-loader
        v-for="n in (areProductsLoading ? 20 : 0)"
        :key="n"
        height="340"
        type="image, list-item, heading, list-item, button"
      />
      <div v-for="n in 6" :key="n" class="product-list__placeholder" />
    </div>
    <div v-if="!areProductsLoading && products.length === 0" class="product-list__no-items">
      <v-icon size="64">mdi-note-search-outline</v-icon>
      <h1>Sorry, no items found!</h1>
    </div>
    <div ref="sentinel" class="product-list__sentinel" />
  </div>
</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore';

  const productsStore = useProductsStore()
  const { loadNextPage } = useProductsStore()
  const { products, areProductsLoading } = storeToRefs(productsStore)

  const sentinel = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  // Important - the api does not provide total amount of products, workaround in the store

  onMounted(() => {
    observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      if (entry.isIntersecting && !areProductsLoading.value) {
        loadNextPage()
      }
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    })

    if (sentinel.value) {
      observer.observe(sentinel.value)
    }
  })

  onUnmounted(() => {
    if (observer && sentinel.value) {
      observer.unobserve(sentinel.value)
    }
  })
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use 'vuetify/settings' as v;

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: stretch;
  flex: 1 1 240px;

  & > * {
    flex: 1 1 240px;
    min-width: 260px;
    max-width: none;
  }

  @media (min-width: map.get(v.$grid-breakpoints, md)) {
    & > * {
      min-width: 220px;
      max-width: 300px;
    }
  }

  &__no-items {
    opacity: 0.6;
    margin: 0 auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
