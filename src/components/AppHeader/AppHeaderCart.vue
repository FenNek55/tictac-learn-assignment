<template>
  <div class="header-cart">
    <v-icon color="dark" icon="mdi-cart" size="large" />
    <div class="header-cart__count">
      <span>
        {{ cartCount }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
//placeholder counter, use real count when implementing cart
  const cartCount = ref(3);
</script>

<style lang="scss" scoped>
.header-cart {
    position: relative;

    &__count {
        position: absolute;
        top: -50%;
        right: -50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(var(--v-theme-primary));
        border-radius: 999px;
        color: white;
        font-weight: 500;

    }
}
</style>
