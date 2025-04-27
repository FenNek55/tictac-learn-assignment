<template>
  <nav class="product-categories">
    <v-btn v-for="category in categories" :key="category.id" prepend-icon="mdi-shape" variant="text">
      {{ category.name }}
    </v-btn>
  </nav>

</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore';

  const productsStore = useProductsStore()

  const { categories } = storeToRefs(productsStore)
</script>
