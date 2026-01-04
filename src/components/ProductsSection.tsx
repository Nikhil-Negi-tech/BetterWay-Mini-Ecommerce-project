import { useCallback, useMemo, useState } from 'react'
import type { Product } from '../types'
import { useProducts } from '../hooks/useProducts'
import { useCartActions } from '../cart/hooks'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useTheme } from '../hooks/useTheme'
import { FiltersBar, type SortOption } from './FiltersBar'
import { ProductGrid } from './ProductGrid'
import { ProductDetailsModal } from './ProductDetailsModal'

function applyFilters(products: Product[], search: string, category: string, sort: SortOption): Product[] {
  const trimmed = search.trim().toLowerCase()

  let result = products

  if (trimmed) {
    result = result.filter((p) => p.name.toLowerCase().includes(trimmed))
  }

  if (category !== 'all') {
    result = result.filter((p) => p.category === category)
  }

  if (sort === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
}

export function ProductsSection() {
  const { products, isLoading, usedFallback } = useProducts()
  const { addToCart } = useCartActions()
  const { isDark, toggleTheme } = useTheme()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<SortOption>('none')
  const debouncedSearch = useDebouncedValue(search, 250)

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const onViewDetails = useCallback((productId: number) => setSelectedProductId(productId), [])
  const onCloseDetails = useCallback(() => setSelectedProductId(null), [])

  const filtered = useMemo(
    () => applyFilters(products, debouncedSearch, category, sort),
    [products, debouncedSearch, category, sort],
  )

  return (
    <section className="products">
      <div className="productsHeader">
        <div>
          <h1 className="h1">Mini E-Commerce</h1>
          <div className="subtle">
            Showing {filtered.length} / {products.length} products
            {usedFallback ? ' (mocked)' : ''}
          </div>
        </div>

        <button className="button secondary" type="button" onClick={toggleTheme}>
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      <FiltersBar
        products={products}
        search={search}
        category={category}
        sort={sort}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onClear={() => {
          setSearch('')
          setCategory('all')
          setSort('none')
        }}
      />

      {isLoading ? (
        <div className="empty">Loading products…</div>
      ) : filtered.length === 0 ? (
        <div className="empty">No products found.</div>
      ) : (
        <ProductGrid products={filtered} onAddToCart={addToCart} onViewDetails={onViewDetails} />
      )}

      <ProductDetailsModal productId={selectedProductId} products={products} onClose={onCloseDetails} />
    </section>
  )
}
