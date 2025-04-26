import type { Category, Product, ProductFilters } from '@/types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const filters = ref<Partial<ProductFilters>>({
    limit: 20,
    offset: 0,
  })
  const areProductsLoading = ref(false)
  const areCategoriesLoading = ref(false)

  const fetchProducts = async () => {
    areProductsLoading.value = true

    try {
      const query = new URLSearchParams()

      Object.entries(filters.value).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          query.append(key, val.toString())
        }
      })

      const res = await fetch(`https://api.escuelajs.co/api/v1/products?${query.toString()}`)
      const data = await res.json()

      products.value = data
    } catch(error) {
      console.error('Failed to fetch products', error)
    } finally {
      areProductsLoading.value = false
    }
  }

  return {
    products,
    categories,
    filters,
    areProductsLoading,
    areCategoriesLoading,
    fetchProducts,
  }
})
