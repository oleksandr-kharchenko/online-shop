import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { ProductSchema, PurchaseSchema } from 'entities/types'

type CheckoutContextSchema = Partial<{
  purchases: PurchaseSchema[],
  addPurchase: (product: ProductSchema) => void,
  removePurchase: (productId: number) => void,
  increaseQuantity: (productId: number) => void,
  decreaseQuantity: (productId: number) => void
}>

const CheckoutContext = createContext<CheckoutContextSchema>({ purchases: [] })
export const useCheckout = () => useContext(CheckoutContext)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const savedPurchases = localStorage.getItem('purchases')
  const [purchases, setPurchases] = useState<PurchaseSchema[]>(
    savedPurchases ? JSON.parse(savedPurchases) : []
  )

  const addPurchase = (product: ProductSchema) => {
    setPurchases(state => {
      const productAdded = state.some(purchase => purchase.product.id === product.id)

      if (productAdded) {
        return state.map(purchase => {
          return purchase.product.id === product.id
            ? { ...purchase, quantity: purchase.quantity + 1 }
            : purchase
        })
      }

      return [...state, { product, quantity: 1 }]
    })
  }

  const removePurchase = (productId: number) => {
    setPurchases(state => state.filter(purchase => purchase.product.id !== productId))
  }

  const increaseQuantity = (productId: number) => {
    setPurchases(state => state.map(purchase => {
      return purchase.product.id === productId
        ? { ...purchase, quantity: purchase.quantity + 1 }
        : purchase
    }))
  }

  const decreaseQuantity = (productId: number) => {
    setPurchases(state => state.map(purchase => {
      return purchase.product.id === productId
        ? { ...purchase, quantity: purchase.quantity - 1 }
        : purchase
    }))
  }

  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases))
  }, [purchases])

  const value = {
    purchases,
    addPurchase,
    removePurchase,
    increaseQuantity,
    decreaseQuantity
  }

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}