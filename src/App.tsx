import './App.css'
import { CartProvider } from './cart/CartProvider'
import { CartPanel } from './components/CartPanel'
import { ProductsSection } from './components/ProductsSection'

function App() {
  return (
    <CartProvider>
      <div className="appShell">
        <ProductsSection />
        <CartPanel />
      </div>
    </CartProvider>
  )
}

export default App
