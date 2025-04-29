<template>
  <RouterLink
    :aria-label="`View details of ${product.title} in ${product.category.name}`"
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
      <p class="text-body-1 font-weight-bold mb-4">${{ product.price }}</p>
      <v-btn
        :aria-label="`Add ${ product.title } to cart`"
        class="product-card__cart-btn"
        color="primary"
        elevation="0"
        prepend-icon="mdi-cart-plus"
        size="small"
        @click.stop.prevent="addItemToCart(product)"
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
          :aria-label="`Add ${ product.title } to wishlist`"
          class="product-card__like"
          :color="isHovering ? 'primary' : 'grey-lighten-2'"
          density="comfortable"
          elevation="1"
          icon="mdi-heart"
          variant="flat"
          @click.stop.prevent
        />
      </template>
    </v-hover>
  </RouterLink>
</template>

<script lang="ts" setup>
  import type { Product } from '@/types';
  import { useTheme } from 'vuetify'
  import { useCartStore } from '@/stores/useCartStore';

  const theme = useTheme()
  const isDark = computed(() => theme.global.current.value.dark)

  const { addItemToCart } = useCartStore()

  interface Props {
    product: Product
  }

  defineProps<Props>()
</script>

<style lang="scss" scoped>
@use 'vuetify/settings' as v;
@use "sass:map";

.product-card {
  $root: &;
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

  &:hover, &:focus {
    box-shadow: 2px 2px 7px rgba(var(--v-theme-on-surface), 0.3);

    #{$root}__like {
      opacity: 1;
    }
  }

  &--dark {
    &:hover, &:focus {
      box-shadow: none;
    }
  }

  &__like {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
    opacity: 1;
    transition: transform 0.1s, opacity 0.1s;

    &:hover {
      transform: scale(1.1);
    }

    @media (min-width: map.get(v.$grid-breakpoints, md)) {
      opacity: 0;
    }
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
