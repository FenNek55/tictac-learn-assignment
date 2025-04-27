<template>
  <div ref="slider" class="card-img-slider">
    <v-btn
      v-show="!isFirstSlide"
      class="card-img-slider__button--prev"
      density="compact"
      icon="mdi-chevron-left"
      size="large"
      @click="goToPrev"
    />
    <div
      class="card-img-slider__content"
      :style="{
        transform: `translateX(-${contentTransition}px)`
      }"
    >
      <v-img
        v-for="url in imgUrls"
        :key="url"
        class="card-img-slider__image"
        :src="url"
      />
    </div>
    <v-btn
      v-show="!isLastSlide"
      class="card-img-slider__button--next"
      density="compact"
      icon="mdi-chevron-right"
      size="large"
      @click="goToNext"
    />
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    imgUrls: string[]
  }

  const props = defineProps<Props>()

  const slider = ref<HTMLDivElement | null>(null)
  const currentSlide = ref(0)
  const sliderWidth = ref(0)

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

  onMounted(() => {
    readWidth()
    window.addEventListener('resize', readWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', readWidth)
  })
</script>

<style lang="scss" scoped>
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
    }

    &__button {
        opacity: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;

        &:focus, &:hover {
            opacity: 1;
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
}
</style>
