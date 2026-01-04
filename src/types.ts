export type Product = {
  id: number
  name: string
  price: number
  category: string
  stock: number
}

export type CartItem = {
  productId: number
  name: string
  price: number
  category: string
  stock: number
  quantity: number
}
