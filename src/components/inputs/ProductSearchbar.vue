<template>
  <form class="product-searchbar" @submit.prevent>
    <label class="product-searchbar__label" for="product-searchbar">
      <input id="product-searchbar" class="product-searchbar__input" placeholder="Search for products..." type="text">
    </label>
    <button class="product-searchbar__submit-button">
      <v-icon color="white" icon="mdi-magnify" size="x-large" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
.product-searchbar {
    overflow: hidden;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 4px rgb(255, 247, 247);
    border-radius: 999px;
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    transition: box-shadow 0.1s;

    &:focus-within {
        box-shadow: 2px 2px 4px rgb(198, 194, 194);
    }

    &__label {
        cursor: pointer;
        width: 100%;
        flex-grow: 1;
        display: flex;
        align-items: stretch;
    }

    &__input {
        width: 100%;
        padding-left: 16px;

        &:focus {
            outline: none;
        }
    }

    &__submit-button {
        margin: 8px;
        padding: 8px;
        border-radius: 999px;
        background-color: rgb(var(--v-theme-primary));
    }
}
</style>
