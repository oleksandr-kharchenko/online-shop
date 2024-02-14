import { useMutation, useQuery } from '@tanstack/react-query'
import { Api } from 'api/config'
import {
  AllProductsParams,
  AllProductsResponse,
  ProductSchema,
  UserCreds,
  UserSchema
} from 'entities/types'
import { queryKeys } from 'api/keys'

export const useLogIn = () => {
  return useMutation({
    mutationFn: (data: UserCreds) => Api.post<never, UserSchema>('auth/login', data)
  })
}

export const useAllProducts = (params: AllProductsParams) => {
  return useQuery({
    queryKey: queryKeys.allProducts(params),
    queryFn: () => Api.get<never, AllProductsResponse>('products', { params })
  })
}

export const useSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.singleProduct(productId),
    queryFn: () => Api.get<never, ProductSchema>(`products/${productId}`)
  })
}