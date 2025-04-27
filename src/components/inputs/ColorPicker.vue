<template>
  <div class="d-flex flex-wrap gap-2">
    <v-btn
      v-for="color in colors"
      :key="color"
      class="color-btn"
      :class="{ selected: color === modelValue }"
      :style="{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`
      }"
      variant="flat"
      @click="pick(color)"
    />
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    colors: string[]
    size: number
  }

  defineProps<Props>()

  const pick = (val: string) => {
    modelValue.value = val
  }

  const modelValue = defineModel<string>()
</script>

<style scoped>
.color-btn {
  min-width: 0;
  border-radius: 50%;
  --v-btn-height: auto;
  --v-btn-states-opacity: 0;
}

.color-btn.selected {
  outline: 2px solid rgba(0,0,0,.25);
  outline-offset: 2px;
}
</style>
