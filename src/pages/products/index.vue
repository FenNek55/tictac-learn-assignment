<template>
  <v-container fluid>
    <ProductList class="mb-14" />
  </v-container>
</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore';

  const productsStore = useProductsStore()

  const { fetchProducts, fetchCategories } = productsStore

  onMounted(() => {
    fetchProducts()
    fetchCategories()
  })
</script>
