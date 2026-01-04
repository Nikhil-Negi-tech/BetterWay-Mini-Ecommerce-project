import type { CartItem, Product } from '../types'

export type CartState = {
  itemsById: Record<number, CartItem>
}

export type CartAction =
  | { type: 'cart/add'; product: Product }
  | { type: 'cart/remove'; productId: number }
  | { type: 'cart/setQuantity'; productId: number; quantity: number }
  | { type: 'cart/clear' }

export const initialCartState: CartState = {
  itemsById: {},
}

function clampQuantity(quantity: number, stock: number): number {
  if (!Number.isFinite(quantity)) return 1
  return Math.max(1, Math.min(Math.floor(quantity), stock))
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'cart/add': {
      const product = action.product
      if (product.stock <= 0) return state

      const existing = state.itemsById[product.id]
      const nextQuantity = clampQuantity((existing?.quantity ?? 0) + 1, product.stock)

      return {
        itemsById: {
          ...state.itemsById,
          [product.id]: {
            productId: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock,
            quantity: nextQuantity,
          },
        },
      }
    }

    case 'cart/remove': {
      const next = { ...state.itemsById }
      delete next[action.productId]
      return { itemsById: next }
    }

    case 'cart/setQuantity': {
      const item = state.itemsById[action.productId]
      if (!item) return state

      const nextQuantity = clampQuantity(action.quantity, item.stock)
      return {
        itemsById: {
          ...state.itemsById,
          [action.productId]: { ...item, quantity: nextQuantity },
        },
      }
    }

    case 'cart/clear':
      return initialCartState

    default:
      return state
  }
}

export function selectCartItems(state: CartState): CartItem[] {
  return Object.values(state.itemsById)
}

export function selectCartTotals(state: CartState): { totalItems: number; totalPrice: number } {
  const items = Object.values(state.itemsById)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  return { totalItems, totalPrice }
}
