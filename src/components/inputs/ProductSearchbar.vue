<template>
  <form
    class="product-searchbar"
    :class="[{
      'product-searchbar--dark': isDark
    }]"
    @submit.prevent="onSubmit"
  >
    <label class="product-searchbar__label" for="product-searchbar">
      <input
        id="product-searchbar"
        v-model="model"
        class="product-searchbar__input"
        placeholder="Search TicTac Shop"
        type="text"
      >
    </label>
    <v-btn
      v-if="model"
      class="product-searchbar__clear ma-2"
      icon="mdi-close"
      variant="flat"
      @click="onClearInput"
    />
    <v-btn
      class="ma-2"
      color="primary"
      elevation="0"
      icon="mdi-magnify"
      type="submit"
    />
  </form>
</template>

<script lang="ts" setup>
  import { useTheme } from 'vuetify'
  const theme = useTheme()

  const isDark = computed(() => theme.global.current.value.dark)

  const model = defineModel<string>({ default: '' })

  const emit = defineEmits(['submit-search', 'clear-input'])

  const onClearInput = () => {
    model.value = ''
    emit('clear-input')
  }

  const onSubmit = () => {
    emit('submit-search')
  }
</script>

<style lang="scss" scoped>
.product-searchbar {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  box-shadow: 2px 2px 4px rgba(138, 138, 138, 0.4);
  border-radius: 999px;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  transition: box-shadow 0.2s, border 0.1s;

  &:focus-within, &:hover {
    box-shadow: 2px 2px 5px rgba(138, 138, 138, 0.8);
  }

  &:focus-within {
    border: 1px solid rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }

  &--dark {
    box-shadow: none;

    &:focus-within, &:hover {
        box-shadow: none !important;
    }
  }

  &__label {
    cursor: pointer;
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: stretch;
  }

  &__input {
    font-weight: 500;
    width: 100%;
    padding-left: 16px;
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));

    &::placeholder {
        color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
    }

    &:focus {
        outline: none;

        &::placeholder {
            color: transparent;
        }
    }
  }
}
</style>
