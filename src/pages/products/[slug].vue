<template>
  <!-- Example of a page built mainly with vuetify functionality -->
  <v-container class="product-page" max-width="1400px">
    <v-skeleton-loader :loading="isLoading" type="subtitle">
      <v-breadcrumbs v-if="productInfo" class="ma-0 mb-8 pa-0" :items="['products', productInfo?.title]" />
    </v-skeleton-loader>
    <v-row class="mb-8">
      <v-col cols="12" md="5" sm="10">
        <v-skeleton-loader height="500" :loading="isLoading" type="image">
          <v-carousel v-model:model-value="selectedPhoto">
            <v-carousel-item v-for="imgUrl in productInfo?.images" :key="imgUrl" cover :src="imgUrl">
              <template #error>
                <img
                  alt="No image available"
                  class="card-img-slider__error-image"
                  src="/public-images/no-img-placeholder.jpg"
                >
              </template>
            </v-carousel-item>
          </v-carousel>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="1" sm="2">
        <div class="d-none d-sm-flex ga-4 flex-column">
          <button
            v-for="(imgUrl, index) in productInfo?.images"
            :key="imgUrl"
            class="opacity-60"
            :class="[{
              'opacity-100': index === selectedPhoto
            }]"
            @click="setSelectedPhoto(index)"
          >
            <v-img
              class="rounded-sm"
              :src="imgUrl"
            />
          </button>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-skeleton-loader :loading="isLoading" max-width="200" type="subtitle">
          <p class="text-overline mb-n2 text-medium-emphasis">{{ productInfo?.category.name }}</p>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="isLoading" max-width="600" type="heading">
          <h1 class="mb-1">{{ productInfo?.title }}</h1>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="isLoading" max-width="100" type="heading">
          <div class="d-flex align-center ga-1 mb-4">
            <v-rating
              active-color="amber-darken-2"
              hover
              :length="5"
              :model-value="4"
              readonly
              :size="32"
            /><p class="text-body-2">4.14/5</p>
          </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="isLoading" max-width="200">
          <p class="mb-6 mr-4 text-h3 font-weight-bold">${{ productInfo?.price }}</p>
          <p class="mb-6 text-h5 font-weight-regular opacity-40 text-decoration-line-through">${{ fakePromoPrice }}</p>
        </v-skeleton-loader>
        <v-divider class="mb-6" />
        <v-skeleton-loader :loading="isLoading" max-width="150" type="heading">
          <h2 class="mb-2">Description</h2>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="isLoading" type="paragraph, paragraph">
          <p class="text-body-1 mb-8">{{ productInfo?.description }}</p>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="isLoading" type="button" width="200">
          <div>
            <div class="mb-2">
              <v-label>
                Quantity
              </v-label>
            </div>
            <div class="d-flex flex-sm-row flex-column ga-4 align-start align-sm-center">
              <div>
                <v-number-input
                  v-model="quantity"
                  class=""
                  control-variant="split"
                  density="comfortable"
                  hide-details="auto"
                  :hide-input="false"
                  :inset="false"
                  max-width="160"
                  :min="1"
                  :reverse="false"
                  variant="outlined"
                />
              </div>
              <v-btn
                v-if="productInfo"
                class="product-card__cart-btn"
                color="primary"
                elevation="0"
                prepend-icon="mdi-cart-plus"
                size="large"
                @click.stop.prevent="addItemToCart(productInfo, quantity)"
              >
                Add to cart
              </v-btn>
            </div>
          </div>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="mb-8" />
        <h2>See also:</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="product in recommendedProducts"
        :key="product.id"
        cols="12"
        md="3"
        sm="6"
      >
        <ProductListCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useProductsStore } from '@/stores/useProductsStore';
  import { useCartStore } from '@/stores/useCartStore';
  import type { Product } from '@/types';

  const productInfo = ref<Product | null>(null)
  const isLoading = ref(true)
  const selectedPhoto = ref(0)
  const quantity = ref(1)

  const { addItemToCart } = useCartStore()

  const fakePromoPrice = computed(() => productInfo.value?.price ? productInfo.value.price + 10 : 0)

  const setSelectedPhoto = (index: number) => {
    selectedPhoto.value = index
  }

  const route = useRoute('/products/[slug]')
  const productsStore = useProductsStore()
  const { fetchSingleProduct, fetchProducts } = productsStore
  const { recommendedProducts } = storeToRefs(productsStore)

  async function loadProduct (slug: string) {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
    isLoading.value = true
    productInfo.value = await fetchSingleProduct(slug)
    isLoading.value = false
    selectedPhoto.value = 0
  }

  const initKeyboardControls = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (selectedPhoto.value > 0) {
          selectedPhoto.value--
        }
      }
      if (e.key === 'ArrowRight') {
        if (selectedPhoto.value < (productInfo.value?.images.length || 0) - 1) {
          selectedPhoto.value++
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }

  onMounted(async () => {
    // could use 'fetch recommendations' in real-life app
    fetchProducts()
    initKeyboardControls()
    await loadProduct(route.params.slug)
  })

  watch(
    () => route.params.slug,
    newSlug => loadProduct(newSlug)
  )
</script>
