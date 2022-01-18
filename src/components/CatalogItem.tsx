import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../store'
import {
  addProductToCartRequest,
  IProduct
} from '../store/modules/cart/reducer'

interface CatalogItemProps {
  product: IProduct
}

export default function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch()

  const hasFailedStockCheck = useSelector<IState, boolean>((state) => {
    return state.cart.failedStockCheck.includes(product.id)
  })

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product))
  }, [dispatch, product])

  return (
    <article>
      <strong>{product.title}</strong> {' - '}
      <span>{product.price}</span> {'  '}
      <button type="button" onClick={handleAddProductToCart}>
        Comprar
      </button>
      {hasFailedStockCheck && (
        <span style={{ color: 'red' }}>Falta de estoque</span>
      )}
    </article>
  )
}