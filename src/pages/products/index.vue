<template>
  <v-container fluid>
    <ProductList />
  </v-container>
</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore';

  const productsStore = useProductsStore()

  const { fetchProducts } = productsStore

  onMounted(() => {
    fetchProducts()
  })
</script>
