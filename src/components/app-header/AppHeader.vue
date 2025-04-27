<template>
  <header class="app-header">
    <v-container class="pt-6 mb-6" fluid>
      <div class="app-header__content mb-4 mb-md-0">
        <RouterLink to="/">
          <v-img class="app-header__logo" src="@/assets/logo.svg" />
        </RouterLink>
        <ProductSearchbar class="app-header__searchbar-desktop d-none d-md-flex" />
        <div class="app-header__right">
          <AppHeaderCart />
          <v-avatar image="@/assets/images/placeholder_avatar.jpg" size="42" />
        </div>
      </div>
      <ProductSearchbar class="app-header__searchbar-mobile d-flex d-md-none" />
    </v-container>
    <v-divider />
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgb(var(--v-theme-background));

  &__content {
    display: flex;
    gap: 24px;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    flex-grow: 0;
    flex-shrink: 0;
    width: 140px;
    height: auto;
  }

  &__right {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  &__searchbar-mobile {
    max-width: 100%;
  }
}
</style>
