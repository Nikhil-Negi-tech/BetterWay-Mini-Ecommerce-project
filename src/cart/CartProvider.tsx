import React, { useEffect, useReducer } from 'react'
import { CartDispatchContext, CartStateContext } from './cartContext'
import { cartReducer, initialCartState, type CartState } from './cartReducer'

const STORAGE_KEY = 'betterway.cart.v1'

function loadInitialState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialCartState
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.itemsById && typeof parsed.itemsById === 'object') {
      return parsed as CartState
    }
    return initialCartState
  } catch {
    return initialCartState
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      void 0
    }
  }, [state])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}
