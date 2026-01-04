import { memo } from 'react'
import type { Product } from '../types'
import { formatCurrency } from '../utils/format'

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
  onViewDetails: (productId: number) => void
}

export const ProductCard = memo(function ProductCard({ product, onAddToCart, onViewDetails }: Props) {
  const inStock = product.stock > 0

  return (
    <div className="productCard">
      <div className="productHeader">
        <div className="productName" title={product.name}>
          {product.name}
        </div>
        <div className="productPrice">{formatCurrency(product.price)}</div>
      </div>

      <div className="productMeta">
        <div className="badge">{product.category}</div>
        <div className={inStock ? 'stock ok' : 'stock out'}>
          {inStock ? 'In stock' : 'Out of stock'}
        </div>
      </div>

      <div className="productActions">
        <button className="button secondary" type="button" onClick={() => onViewDetails(product.id)}>
          View
        </button>
        <button
          className="button"
          type="button"
          disabled={!inStock}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
})
