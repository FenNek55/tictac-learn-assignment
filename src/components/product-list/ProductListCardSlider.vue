<template>
  <!-- A custom slider, just to show off the use of a composable and some custom logic. I use vuetify carousel in details page to show different aproach -->
  <div ref="slider" aria-label="Product images carousel" class="card-img-slider" role="region">
    <v-btn
      v-show="!isFirstSlide"
      aria-label="Previous image"
      class="card-img-slider__button--prev"
      density="compact"
      :disabled="isFirstSlide"
      icon="mdi-chevron-left"
      size="large"
      @click="goToPrev"
      @click.stop.prevent
    />
    <div
      ref="swipeContainer"
      class="card-img-slider__content"
      :style="{
        transform: `translateX(-${contentTransition}px)`
      }"
    >
      <v-img
        v-for="url in imgUrls"
        :key="url"
        alt="Product preview"
        class="card-img-slider__image"
        cover
        :src="url"
      >
        <template #error>
          <div
            class="card-img-slider__error-container"
          >
            <img
              alt="No image available"
              class="card-img-slider__error-image"
              src="/public-images/no-img-placeholder.jpg"
            >
          </div>
        </template>
      </v-img>
      <v-img
        v-if="!imgUrls.length"
        alt="No image available"
        class="card-img-slider__image"
        cover
        src="/public-images/no-img-placeholder.jpg"
      />
    </div>
    <v-btn
      v-show="!isLastSlide"
      :aria-disabled="isLastSlide"
      aria-label="Next image"
      class="card-img-slider__button--next"
      density="compact"
      :disabled="isLastSlide"
      icon="mdi-chevron-right"
      size="large"
      @click="goToNext"
      @click.stop.prevent
    />
  </div>
</template>

<script lang="ts" setup>
  import { useSwipe } from '@/composables/useSwipe';

  interface Props {
    imgUrls: string[]
  }

  const props = defineProps<Props>()

  const slider = ref<HTMLDivElement | null>(null)
  const currentSlide = ref(0)
  const sliderWidth = ref(0)
  const swipeContainer = ref<HTMLElement | null>(null)

  const readWidth = () => {
    sliderWidth.value = slider.value?.clientWidth ?? 0
  }

  const contentTransition = computed(() => currentSlide.value * sliderWidth.value)

  const isFirstSlide = computed(() => currentSlide.value === 0)

  const isLastSlide = computed(() => currentSlide.value === props.imgUrls.length - 1 )

  const goToPrev = () => {
    if (isFirstSlide.value) return

    currentSlide.value = currentSlide.value - 1
  }

  const goToNext = () => {
    if (isLastSlide.value) return

    currentSlide.value = currentSlide.value + 1
  }

  useSwipe(swipeContainer, goToNext, goToPrev)

  onMounted(() => {
    readWidth()
    window.addEventListener('resize', readWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', readWidth)
  })
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use 'vuetify/settings' as v;

.card-img-slider {
    $root: &;
    aspect-ratio: 1/1;
    overflow: hidden;
    position: relative;

    &:hover, &:focus-within {
        #{$root}__button {
            opacity: 1;
        }
    }

    &__content {
        transition: transform 0.2s;
        display: flex;
        align-items: stretch;
        height: 100%;
    }

    &__button {
        opacity: 1;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;

        &:focus, &:hover {
            opacity: 1;
        }

        @media (min-width: map.get(v.$grid-breakpoints, md)) {
          opacity: 0;
        }

        &--prev {
            @extend .card-img-slider__button;

            left: 12px;
        }

        &--next {
            @extend .card-img-slider__button;

            right: 12px;
        }
    }

    &__image {
        height: 100%;
        width: 100%;
    }

    .card-img-slider__error-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
    }

    .card-img-slider__error-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
}
</style>
