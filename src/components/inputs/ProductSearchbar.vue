<template>
  <form class="product-searchbar" @submit.prevent>
    <label class="product-searchbar__label" for="product-searchbar">
      <input id="product-searchbar" class="product-searchbar__input" placeholder="Search TicTac Shop" type="text">
    </label>
    <button class="product-searchbar__submit-button">
      <v-icon color="white" icon="mdi-magnify" size="large" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
.product-searchbar {
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
        color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

        &::placeholder {
            color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
        }

        &:focus {
            outline: none;

            &::placeholder {
                color: transparent;
            }
        }
    }

    &__submit-button {
        margin: 8px;
        padding: 6px;
        border-radius: 999px;
        background-color: rgb(var(--v-theme-primary));
        transition: background-color 0.1s;

        &:hover {
            background-color: rgb(var(--v-theme-primary-dark));
        }
    }
}
</style>
