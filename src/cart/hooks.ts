import { useContext, useMemo } from 'react'
import type { Product } from '../types'
import { CartDispatchContext, CartStateContext } from './cartContext'
import { selectCartItems, selectCartTotals, type CartState } from './cartReducer'

export function useCartState(): CartState {
  const ctx = useContext(CartStateContext)
  if (!ctx) throw new Error('useCartState must be used within CartProvider')
  return ctx
}

export function useCartActions() {
  const dispatch = useContext(CartDispatchContext)
  if (!dispatch) throw new Error('useCartActions must be used within CartProvider')

  return useMemo(
    () => ({
      addToCart(product: Product) {
        dispatch({ type: 'cart/add', product })
      },
      removeFromCart(productId: number) {
        dispatch({ type: 'cart/remove', productId })
      },
      setQuantity(productId: number, quantity: number) {
        dispatch({ type: 'cart/setQuantity', productId, quantity })
      },
      clearCart() {
        dispatch({ type: 'cart/clear' })
      },
    }),
    [dispatch],
  )
}

export function useCartItems() {
  const state = useCartState()
  return useMemo(() => selectCartItems(state), [state])
}

export function useCartTotals() {
  const state = useCartState()
  return useMemo(() => selectCartTotals(state), [state])
}
