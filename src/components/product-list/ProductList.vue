<template>
  <div class="product-list">
    <ProductListCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore';

  const productsStore = useProductsStore()
  const { products, areProductsLoading } = storeToRefs(productsStore)
</script>

<style lang="scss" scoped>
.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 8px;
}
</style>
