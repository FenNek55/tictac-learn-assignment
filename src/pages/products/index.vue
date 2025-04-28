<template>
  <v-container fluid max-width="2000">
    <!-- Example of a page built with some custom components and logic -->
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
