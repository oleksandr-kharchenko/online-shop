export type PaginationBase = {
  total: number,
  skip: number,
  limit: number
}

export type UserCreds = {
  username: string,
  password: string
}

export type UserSchema = {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string
}

export type ProductSchema = {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[]
}

export type AllProductsParams = {
  limit: number,
  skip: number
}

export type AllProductsResponse = PaginationBase & {
  products: ProductSchema[]
}

export type PurchaseSchema = {
  product: ProductSchema,
  quantity: number
}