import { all, takeLatest, select, call, put } from 'redux-saga/effects'
import { IState } from '../..'
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess
} from './reducer'
import api from '../../../services/api'
import { AxiosResponse } from 'axios'
import { ActionTypes } from './reducer'

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
  id: number
  quantity: number
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload

  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((i) => i.product.id === product.id)?.quantity ?? 0
    )
  })

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  )

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product))
  } else {
    yield put(addProductToCartFailure(product.id))
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
])