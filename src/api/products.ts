import type { Product } from '../types'

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Basic T-Shirt', price: 19.99, category: 'fashion', stock: 18 },
  { id: 2, name: 'Running Shoes', price: 69.99, category: 'fashion', stock: 8 },
  { id: 3, name: 'Wireless Mouse', price: 24.5, category: 'electronics', stock: 25 },
  { id: 4, name: 'Mechanical Keyboard', price: 89.0, category: 'electronics', stock: 6 },
  { id: 5, name: 'Stainless Water Bottle', price: 15.0, category: 'home', stock: 30 },
  { id: 6, name: 'Coffee Grinder', price: 39.0, category: 'home', stock: 10 },
  { id: 7, name: 'Notebook Set', price: 12.0, category: 'stationery', stock: 22 },
  { id: 8, name: 'Gel Pens Pack', price: 9.5, category: 'stationery', stock: 0 },
  { id: 9, name: 'Face Moisturizer', price: 14.99, category: 'beauty', stock: 12 },
  { id: 10, name: 'Sunscreen SPF 50', price: 11.99, category: 'beauty', stock: 16 },
  { id: 11, name: 'Yoga Mat', price: 29.99, category: 'sports', stock: 9 },
  { id: 12, name: 'Dumbbell Set', price: 49.99, category: 'sports', stock: 4 },
  { id: 13, name: 'Bluetooth Speaker', price: 34.99, category: 'electronics', stock: 7 },
  { id: 14, name: 'Ceramic Mug', price: 8.99, category: 'home', stock: 20 },
  { id: 15, name: 'Desk Lamp', price: 22.99, category: 'home', stock: 5 },
]

type DummyJsonProduct = {
  id: number
  title?: string
  name?: string
  price?: number
  category?: string
  stock?: number
}

type DummyJsonResponse = {
  products?: DummyJsonProduct[]
}

function mapDummyJsonToProduct(item: DummyJsonProduct): Product {
  return {
    id: Number(item.id),
    name: String(item.title ?? item.name ?? 'Unnamed product'),
    price: Number(item.price ?? 0),
    category: String(item.category ?? 'uncategorized'),
    stock: Number(item.stock ?? 0),
  }
}

export type ProductsResponse = {
  products: Product[]
  source: 'api' | 'mock'
}

export async function fetchProducts(limit: number = 20): Promise<ProductsResponse> {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = (await response.json()) as DummyJsonResponse
    const list = Array.isArray(data?.products) ? data.products : []

    const products = list.map(mapDummyJsonToProduct)
    return { products: products.slice(0, limit), source: 'api' }
  } catch {
    return { products: MOCK_PRODUCTS, source: 'mock' }
  }
}
