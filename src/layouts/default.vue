<template>
  <div class="default-layout">
    <AppHeader />
    <v-main class="default-layout__content">
      <RouterView />
      <v-snackbar
        v-model="isSnackbarVisible"
        color="error"
      >
        {{ errorMsg }}
        <template #actions>
          <v-btn
            variant="plain"
            @click="isSnackbarVisible = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </div>
</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore'

  const { errorMsg } = storeToRefs(useProductsStore())
  const isSnackbarVisible = ref(false)

  watch(errorMsg, newMsg => {
    if (newMsg) {
      isSnackbarVisible.value = true
    }
  })
</script>


<style lang="scss" scoped>
.default-layout {
  &__content {
    padding-top: 24px;
  }
}
</style>
