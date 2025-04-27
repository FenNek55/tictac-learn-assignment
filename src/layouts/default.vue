<template>
  <div class="default-layout">
    <AppHeader />
    <v-main class="default-layout__content">
      <RouterView />
    </v-main>
  </div>
</template>

<script lang="ts" setup>
  //
</script>

<style lang="scss" scoped>
.default-layout {
  &__content {
    padding-top: 24px;
  }
}
</style>
