import styles from './CartItem.module.scss'
import TrashIcon from 'assets/icons/trash.svg?react'
import PlusIcon from 'assets/icons/plus.svg?react'
import MinusIcon from 'assets/icons/minus.svg?react'
import { useCheckout } from 'contexts/CheckoutContext'
import { PurchaseSchema } from 'entities/types'

type CartItemProps = {
  purchase: PurchaseSchema
}

export default function CartItem({ purchase }: CartItemProps) {
  const { removePurchase, increaseQuantity, decreaseQuantity } = useCheckout()

  const removeFromCart = () => {
    (removePurchase as (productId: number) => void)(purchase.product.id)
  }

  const lowerQuantity = () => {
    (decreaseQuantity as (productId: number) => void)(purchase.product.id)
  }

  const addQuantity = () => {
    (increaseQuantity as (productId: number) => void)(purchase.product.id)
  }

  return (
    <li className={styles.cartItem}>
      <button className={styles.removeButton} onClick={removeFromCart}>
        <TrashIcon />
      </button>
      <p className={styles.title}>{purchase.product.title}</p>
      <div className={styles.amount}>
        <div className={styles.controls}>
          <button
            className={styles.quantityButton}
            onClick={lowerQuantity}
            disabled={purchase.quantity === 1}
          >
            <MinusIcon />
          </button>
          <p>{purchase.quantity}</p>
          <button className={styles.quantityButton} onClick={addQuantity}>
            <PlusIcon />
          </button>
        </div>
        <p className={styles.total}>
          ${purchase.product.price * purchase.quantity}
        </p>
      </div>
    </li>
  )
}