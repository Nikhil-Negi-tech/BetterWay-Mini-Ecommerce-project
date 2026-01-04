import { useEffect, useMemo } from 'react'
import type { Product } from '../types'
import { formatCurrency } from '../utils/format'

type Props = {
  productId: number | null
  products: Product[]
  onClose: () => void
}

export function ProductDetailsModal({ productId, products, onClose }: Props) {
  const product = useMemo(() => {
    if (productId == null) return null
    return products.find((p) => p.id === productId) ?? null
  }, [productId, products])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    if (productId != null) {
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }

    return
  }, [productId, onClose])

  if (productId == null || !product) return null

  const inStock = product.stock > 0

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Product details">
      <div className="modalBackdrop" onClick={onClose} />
      <div className="modalCard">
        <div className="modalHeader">
          <div className="modalTitle" title={product.name}>
            {product.name}
          </div>
          <button className="iconButton" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modalBody">
          <div className="modalRow">
            <span className="modalLabel">Price</span>
            <span className="modalValue">{formatCurrency(product.price)}</span>
          </div>
          <div className="modalRow">
            <span className="modalLabel">Category</span>
            <span className="modalValue">{product.category}</span>
          </div>
          <div className="modalRow">
            <span className="modalLabel">Stock</span>
            <span className={inStock ? 'stock ok' : 'stock out'}>
              {inStock ? `In stock (${product.stock})` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
