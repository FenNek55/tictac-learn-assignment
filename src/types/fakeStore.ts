export type Product = {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
    slug: string
  }
  images: string[]
}

export type Category = {
  id: number
  name: string
  slug: string
  image: string
}

export type ProductFilters = {
  title: string
  price: number
  price_min: number
  price_max: number
  categoryId: number
  categorySlug: string
  limit: number
  offset: number
}
