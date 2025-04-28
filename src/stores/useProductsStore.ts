import type { Category, Product, ProductFilters } from '@/types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])

  const areProductsLoading = ref(false)
  const areCategoriesLoading = ref(false)

  const perPage = ref(20)
  const currentPage = ref(0)
  const reachedEnd = ref(false)

  const titleFilter = ref<ProductFilters['title']>('')

  const filters = computed(() => {
    return {
      title: titleFilter.value || null,
      offset: currentPage.value * perPage.value,
      limit: perPage.value,
    }
  })

  const recommendedProducts = computed(() => {
    // placeholder recommended products logic
    return products.value.slice(0, 4) || []
  })

  const fetchProducts = async () => {
    reachedEnd.value = false
    areProductsLoading.value = true
    products.value = []
    currentPage.value = 0

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

  const fetchSingleProduct = async (slug: string): Promise<Product | null> => {
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
      const data = await res.json()

      return data
    } catch(error) {
      console.error('Failed to fetch product ' + slug, error)
      return null
    }
  }

  const fetchCategories = async () => {
    areCategoriesLoading.value = true

    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories')
      const data = await res.json()

      categories.value = data
    } catch(error) {
      console.error('Failed to load categories', error)
    } finally {
      areCategoriesLoading.value = false
    }
  }

  const loadNextPage = async () => {
    if (areProductsLoading.value || reachedEnd.value) return

    areProductsLoading.value = true
    currentPage.value++

    try {
      const query = new URLSearchParams()

      Object.entries(filters.value).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          query.append(key, val.toString())
        }
      })

      const res = await fetch(`https://api.escuelajs.co/api/v1/products?${query.toString()}`)
      const data = await res.json()

      if (data.length === 0) {
        reachedEnd.value = true
      } else {
        products.value = [...products.value, ...data]
      }
    } catch(error) {
      console.error('Failed to load next page of products', error)
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
    titleFilter,
    recommendedProducts,
    perPage,
    currentPage,
    fetchProducts,
    fetchCategories,
    fetchSingleProduct,
    loadNextPage,
  }
})
