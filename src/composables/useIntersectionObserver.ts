import { onMounted, onUnmounted, ref } from 'vue';

export function useIntersectionObserver (
  callback: () => void,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0 }
) {
  const target = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (target.value) {
      observer.observe(target.value);
    }
  });

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value);
    }
  });

  return {
    target,
  };
}
