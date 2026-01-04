import { useMemo } from 'react'
import { useCartActions, useCartItems, useCartTotals } from '../cart/hooks'
import { formatCurrency } from '../utils/format'

export function CartPanel() {
  const items = useCartItems()
  const totals = useCartTotals()
  const { removeFromCart, setQuantity, clearCart } = useCartActions()

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  return (
    <aside className="cart">
      <div className="cartHeader">
        <h2 className="h2">Cart</h2>
        <button
          className="button secondary"
          type="button"
          onClick={clearCart}
          disabled={items.length === 0}
        >
          Clear
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty">Your cart is empty.</div>
      ) : (
        <div className="cartItems">
          {sortedItems.map((item) => (
            <div key={item.productId} className="cartItem">
              <div className="cartItemMain">
                <div className="cartItemTitle">{item.name}</div>
                <div className="cartItemSub">
                  {formatCurrency(item.price)} · Stock: {item.stock}
                </div>
              </div>

              <div className="cartItemControls">
                <button
                  className="iconButton"
                  type="button"
                  onClick={() => setQuantity(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <input
                  className="qty"
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => setQuantity(item.productId, Number(e.target.value))}
                />

                <button
                  className="iconButton"
                  type="button"
                  onClick={() => setQuantity(item.productId, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  aria-label="Increase quantity"
                >
                  +
                </button>

                <button
                  className="button danger"
                  type="button"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cartTotals">
        <div className="totalsRow">
          <span>Total items</span>
          <span className="totalsValue">{totals.totalItems}</span>
        </div>
        <div className="totalsRow">
          <span>Total price</span>
          <span className="totalsValue">{formatCurrency(totals.totalPrice)}</span>
        </div>
      </div>
    </aside>
  )
}
