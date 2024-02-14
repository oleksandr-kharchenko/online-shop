import { ReactNode, useState } from 'react'
import styles from './PageLayout.module.scss'
import Header from 'components/Header/Header'
import Cart from 'components/Cart/Cart'

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [cartOpen, setCartOpen] = useState<boolean>(false)

  const showCart = () => {
    setCartOpen(true)
  }

  const hideCart = () => {
    setCartOpen(false)
  }

  return (
    <div className={styles.pageLayout}>
      <Header showCart={showCart} />
      <section className={styles.mainSection}>
        {children}
      </section>
      {cartOpen && <Cart hideCart={hideCart} />}
    </div>
  )
}