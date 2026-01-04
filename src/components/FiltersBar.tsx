import { useMemo } from 'react'
import type { Product } from '../types'

export type SortOption = 'none' | 'price-asc' | 'price-desc'

type Props = {
  products: Product[]
  search: string
  category: string
  sort: SortOption
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSortChange: (value: SortOption) => void
  onClear: () => void
}

export function FiltersBar({
  products,
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClear,
}: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const p of products) set.add(p.category)
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [products])

  return (
    <div className="filters">
      <div className="field">
        <label className="label" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className="input"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by product name"
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className="select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All categories' : c}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="label" htmlFor="sort">
          Sort
        </label>
        <select
          id="sort"
          className="select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="none">None</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      <div className="field actions">
        <button className="button secondary" type="button" onClick={onClear}>
          Clear all
        </button>
      </div>
    </div>
  )
}
