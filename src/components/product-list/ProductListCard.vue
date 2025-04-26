<template>
  <div class="product-card">
    <ProductListCardSlider :img-urls="product.images" />
    <div class="product-card__content pa-2">
      <h2 class="text-body-1 font-weight-bold mb-1">{{ product.title }}</h2>
      <p class="text-body-2 font-weight-light">{{ product.price }}$</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Product } from '@/types';

  interface Props {
    product: Product
  }

  defineProps<Props>()
</script>

<style lang="scss" scoped>
.product-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 16px;
  overflow: hidden;
}
</style>
