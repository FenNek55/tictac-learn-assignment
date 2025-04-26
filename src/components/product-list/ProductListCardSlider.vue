<template>
  <div ref="slider" class="card-img-slider">
    <button v-show="!isFirstSlide" class="card-img-slider__button--prev" @click="goToPrev">
      <v-icon>mdi-chevron-left</v-icon>
    </button>
    <div
      ref="sliderContent"
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

  const currentSlide = ref(0)
  const slider = ref<HTMLDivElement | null>(null)
  const sliderContent = ref<HTMLDivElement | null>(null)

  const contentTransition = computed(() => {
    if(!slider.value) return 0
    return slider.value.clientWidth * currentSlide.value
  })

  const isFirstSlide = computed(() => {
    return currentSlide.value === 0
  })

  const isLastSlide = computed(() => {
    return currentSlide.value === props.imgUrls.length - 1
  })

  const goToPrev = () => {
    if (currentSlide.value === 0) return

    currentSlide.value = currentSlide.value - 1
  }

  const goToNext = () => {
    if (currentSlide.value === props.imgUrls.length - 1) return

    currentSlide.value = currentSlide.value + 1
  }
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
        background-color: white;
        z-index: 1;
        border-radius: 999px;
        padding: 5px;
        transition: opacity 0.1s;

        &:focus {
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
