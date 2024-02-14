import { MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import styles from './Cart.module.scss'
import CartItem from 'components/CartItem/CartItem'
import CloseIcon from 'assets/icons/close.svg?react'
import { useCheckout } from 'contexts/CheckoutContext'

type CartProps = {
  hideCart: () => void
}

export default function Cart({ hideCart }: CartProps) {
  const { purchases } = useCheckout()

  const onCartClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return createPortal(
    <div className={styles.cartBackground} onClick={hideCart}>
      <aside className={styles.cart} onClick={onCartClick}>
        <section className={styles.cartHeader}>
          <button className={styles.closeButton} onClick={hideCart}>
            <CloseIcon />
          </button>
        </section>
        {purchases && purchases.length > 0 ? (
          <ul className={styles.cartItems}>
            {purchases.map(purchase => (
              <CartItem key={purchase.product.id} purchase={purchase} />
            ))}
          </ul>
        ) : <p className={styles.empty}>No purchases</p>}
        <button
          className={styles.checkoutButton}
          disabled={purchases?.length === 0}
        >
          Checkout
        </button>
      </aside>
    </div>,
    document.getElementById('portal') as HTMLDivElement
  )
}