import { createContext } from 'react'
import type { CartAction, CartState } from './cartReducer'

export const CartStateContext = createContext<CartState | null>(null)
export const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null)
