import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../api/products'
import type { Product } from '../types'

type UseProductsResult = {
  products: Product[]
  isLoading: boolean
  usedFallback: boolean
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      const result = await fetchProducts(20)
      if (cancelled) return
      setProducts(result.products)
      setUsedFallback(result.source === 'mock')
      setIsLoading(false)
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(
    () => ({ products, isLoading, usedFallback }),
    [products, isLoading, usedFallback],
  )
}
