import { AllProductsParams } from 'entities/types'
import { ApiKeys } from 'entities/constants'

export const queryKeys = {
  allProducts: (params: AllProductsParams) => [ApiKeys.AllProducts, params],
  singleProduct: (productId: string) => [ApiKeys.SingleProduct, productId]
}