import { useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import CartIcon from 'assets/icons/cart.svg?react'
import LogoutIcon from 'assets/icons/logout.svg?react'
import { useAuth } from 'contexts/AuthContext'
import { useCheckout } from 'contexts/CheckoutContext'
import { AppRoutes } from 'entities/constants'

type HeaderProps = {
  showCart: () => void
}

export default function Header({ showCart }: HeaderProps) {
  const navigate = useNavigate()
  const goToProductsPage = () => {
    navigate(AppRoutes.Products)
  }

  const { logOut } = useAuth()
  const { purchases } = useCheckout()

  const cartItemQuantity = Number(purchases
    ?.map(purchase => purchase.quantity)
    .reduce((total, current) => total + current, 0))

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={goToProductsPage}>
        Online Shop
      </h1>
      <div className={styles.controls}>
        <button className={styles.cartButton} onClick={showCart}>
          <CartIcon />
          {cartItemQuantity > 0 && (
            <span className={styles.cartItemQuantity}>
              {cartItemQuantity}
            </span>
          )}
        </button>
        <button className={styles.logoutButton} onClick={logOut}>
          <LogoutIcon />
        </button>
      </div>
    </header>
  )
}