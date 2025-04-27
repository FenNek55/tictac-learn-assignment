<template>
  <div ref="slider" class="card-img-slider">
    <button v-show="!isFirstSlide" class="card-img-slider__button--prev" @click="goToPrev">
      <v-icon>mdi-chevron-left</v-icon>
    </button>
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
    <button v-show="!isLastSlide" class="card-img-slider__button--next" @click="goToNext">
      <v-icon>mdi-chevron-right</v-icon>
    </button>
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
        background-color: rgb(224, 224, 224);
        z-index: 1;
        border-radius: 999px;
        padding: 5px;
        transition: opacity 0.1s, background-color 0.1s;

        &:focus, &:hover {
            opacity: 1;
            background-color: white;
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
