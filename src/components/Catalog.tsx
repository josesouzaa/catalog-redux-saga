import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { IProduct } from '../store/modules/cart/reducer'
import CatalogItem from './CatalogItem'

export default function Catalog() {
  const [catalog, setCatalog] = useState<IProduct[]>([])

  useEffect(() => {
    api.get('products').then((r) => setCatalog(r.data))
  }, [])

  return (
    <main>
      <h1>Catalog</h1>
      {catalog.map((product) => (
        <CatalogItem key={product.id} product={product} />
      ))}
    </main>
  )
}
