import { createRoot } from 'react-dom/client'
import ProductList from './productList'
import { populaires, nouveautes } from './products'

createRoot(document.getElementById('produits-populaires')).render(
  <ProductList products={populaires} />
)
createRoot(document.getElementById('nouveautes')).render(
  <ProductList products={nouveautes} />
)