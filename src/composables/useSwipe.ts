import type { Ref } from 'vue'

export function useSwipe (targetElement: Ref<HTMLElement | null>, onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startX = ref(0)
  const startY = ref(0)

  const handleTouchStart = (e: TouchEvent) => {
    startX.value = e.touches[0].clientX
    startY.value = e.touches[0].clientY
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY

    const deltaX = endX - startX.value
    const deltaY = endY - startY.value

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        onSwipeRight()
      } else {
        onSwipeLeft()
      }
    }
  }

  onMounted(() => {
    targetElement.value?.addEventListener('touchstart', handleTouchStart)
    targetElement.value?.addEventListener('touchend', handleTouchEnd)
  })

  onUnmounted(() => {
    targetElement.value?.removeEventListener('touchstart', handleTouchStart)
    targetElement.value?.removeEventListener('touchend', handleTouchEnd)
  })
}
