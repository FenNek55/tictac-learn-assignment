<template>
  <div
    class="product-card rounded-lg"
    :class="[{
      'product-card--dark': isDark
    }]"
  >
    <ProductListCardSlider :img-urls="product.images" />
    <div class="product-card__content pa-2">
      <h2 class="text-body-2 mb-2">{{ product.title }}</h2>
      <p class="text-body-1 font-weight-bold mb-4">{{ product.price }}$</p>
      <v-btn color="primary" prepend-icon="mdi-cart-plus" size="small">Add to cart</v-btn>
    </div>
    <v-hover>
      <template
        #default="{ isHovering, props}"
      >
        <v-btn
          v-bind="props"
          class="product-card__like"
          :color="isHovering ? 'primary' : 'grey-lighten-2'"
          density="comfortable"
          elevation="1"
          icon="mdi-heart"
          variant="text"
        />
      </template>
    </v-hover>
  </div>
</template>

<script lang="ts" setup>
  import type { Product } from '@/types';
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const isDark = computed(() => theme.global.current.value.dark)

  interface Props {
    product: Product
  }

  defineProps<Props>()
</script>

<style lang="scss" scoped>
.product-card {
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  overflow: hidden;
  transition: box-shadow 0.1s;

  &:hover {
    box-shadow: 2px 2px 7px rgba(var(--v-theme-on-surface), 0.3);
  }

  &--dark {
    &:hover {
      box-shadow: none;
      border: 1px solid rgba(var(--grey-lighten-6), 1);
    }
  }

  &__like {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
  }
}
</style>
