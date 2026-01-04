import { memo } from 'react'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'

type Props = {
  products: Product[]
  onAddToCart: (product: Product) => void
  onViewDetails: (productId: number) => void
}

export const ProductGrid = memo(function ProductGrid({ products, onAddToCart, onViewDetails }: Props) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
})
