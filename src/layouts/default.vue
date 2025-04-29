<template>
  <div class="default-layout">
    <AppHeader />
    <v-main class="default-layout__content">
      <RouterView />
      <v-snackbar
        v-model="isErrorVisible"
        color="error"
      >
        {{ errorMsg }}
        <template #actions>
          <v-btn
            variant="plain"
            @click="isErrorVisible = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="isSuccessVisible"
        color="success"
      >
        Item added to cart!
        <template #actions>
          <v-btn
            variant="plain"
            @click="isSuccessVisible = false"
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
  import { useCartStore } from '@/stores/useCartStore'

  const { errorMsg } = storeToRefs(useProductsStore())
  const { numberOfItems } = storeToRefs(useCartStore())

  const isErrorVisible = ref(false)
  const isSuccessVisible = ref(false)

  watch(errorMsg, newMsg => {
    if (newMsg) {
      isErrorVisible.value = true
    }
  })

  watch(numberOfItems, () => {
    isSuccessVisible.value = true
  })
</script>


<style lang="scss" scoped>
.default-layout {
  &__content {
    padding-top: 24px;
  }
}
</style>
