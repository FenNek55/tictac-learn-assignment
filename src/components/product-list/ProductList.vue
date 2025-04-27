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
  </div>

</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore';

  const productsStore = useProductsStore()
  const { products, areProductsLoading } = storeToRefs(productsStore)
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
      max-width: 260px;
    }
  }
}
</style>
