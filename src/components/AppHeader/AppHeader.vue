<template>
  <v-container class="app-header">
    <div class="app-header__content">
      <RouterLink to="/">
        <v-img class="app-header__logo" src="@/assets/fakeshop_logo.svg" width="160" />
      </RouterLink>
      <ProductSearchbar class="app-header__searchbar-desktop" />
      <div class="app-header__right">
        <AppHeaderCart />
        <v-avatar image="@/assets/images/placeholder_avatar.jpg" size="42" />
      </div>
    </div>
    <ProductSearchbar class="app-header__searchbar-mobile" />
  </v-container>
</template>

<style lang="scss" scoped>
.app-header {
    &__content {
        display: flex;
        gap: 24px;
        justify-content: space-between;
        align-items: center;
    }

    &__logo {
        flex-grow: 0;
        flex-shrink: 0;
        width: 120px;
        height: auto;
    }

    &__right {
        display: flex;
        gap: 32px;
        align-items: center;
    }

    // &__searchbar-desktop {
    //   display: none;
    // }
}
</style>
