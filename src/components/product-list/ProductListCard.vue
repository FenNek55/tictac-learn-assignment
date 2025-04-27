<template>
  <div class="product-card rounded-lg">
    <ProductListCardSlider :img-urls="product.images" />
    <div class="product-card__content pa-2">
      <h2 class="text-body-2 mb-2">{{ product.title }}</h2>
      <p class="text-body-1 font-weight-bold">{{ product.price }}$</p>
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
  overflow: hidden;
  transition: box-shadow 0.1s, transform 0.1s;

  &:hover {
    box-shadow: 2px 2px 7px rgba(var(--v-theme-on-surface), 0.3);
    transform: scale(1.02)
  }
}
</style>
