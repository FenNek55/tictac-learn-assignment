<template>
  <div class="product-list__wrapper">
    <div v-if="!areProductsLoading" class="product-list">
      <ProductListCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else class="product-list">
      <v-skeleton-loader v-for="n in 20" :key="n" height="340" type="image, list-item-two-line" />
    </div>
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
    gap: 16px;
}
</style>
