import type { Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  //this is a lazy approach, each entry should consist of product and number of given product. Here we just append to the array
  const cart = ref<Product[]>([])

  const numberOfItems = computed(() => {
    return cart.value.length
  })

  const addItemToCart = (item: Product, n: number = 1) => {
    const itemsToAdd = Array(n).fill(item)
    cart.value = [...itemsToAdd, ...cart.value]
  }

  const removeItemFromCart = (itemId: number) => {
    cart.value = cart.value.filter(item => item.id !== itemId)
  }

  return {
    cart,
    numberOfItems,
    addItemToCart,
    removeItemFromCart,
  }
})
