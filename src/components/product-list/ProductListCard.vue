<template>
  <RouterLink
    class="product-card rounded-lg"
    :class="[{
      'product-card--dark': isDark
    }]"
    :to="{
      name: '/products/[slug]',
      params: {
        slug: product.slug
      }
    }"
  >
    <ProductListCardSlider :img-urls="product.images" />
    <div class="product-card__content pa-3">
      <p class="text-caption product-card__category">{{ product.category.name }}</p>
      <h2 class="text-body-1 font-weight-light mb-2">{{ product.title }}</h2>
      <p class="text-body-1 font-weight-bold mb-4">{{ product.price }}$</p>
      <v-btn
        class="product-card__cart-btn"
        color="primary"
        elevation="0"
        prepend-icon="mdi-cart-plus"
        size="small"
        @click.stop.prevent
      >
        Add to cart
      </v-btn>
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
          @click.stop.prevent
        />
      </template>
    </v-hover>
  </RouterLink>
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
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  overflow: hidden;
  transition: box-shadow 0.1s;
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--v-theme-surface));

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &:hover {
    box-shadow: 2px 2px 7px rgba(var(--v-theme-on-surface), 0.3);
  }

  &--dark {
    &:hover {
      box-shadow: none;
    }
  }

  &__like {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
  }

  &__cart-btn {
    width: fit-content;
    margin-top: auto;
  }

  &__category {
    opacity: var(--v-medium-emphasis-opacity);
  }
}
</style>
