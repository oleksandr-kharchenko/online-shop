import { useNavigate } from 'react-router-dom'
import styles from './ProductCard.module.scss'
import CartIcon from 'assets/icons/cart.svg?react'
import { useCheckout } from 'contexts/CheckoutContext'
import { ProductSchema } from 'entities/types'

type ProductCardProps = {
  product: ProductSchema
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const onNavigate = () => navigate(`/products/${product.id}`)

  const { addPurchase } = useCheckout()
  const addToCart = () => {
    (addPurchase as (product: ProductSchema) => void)(product)
  }

  return (
    <div className={styles.productCard}>
      <div className={styles.thumbnailContainer} onClick={onNavigate}>
        <img
          className={styles.thumbnail}
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div className={styles.basicInfo}>
        <div>
          <p>{product.title}</p>
          <p className={styles.price}>
            ${product.price.toFixed(2)}
          </p>
        </div>
        <button className={styles.purchaseButton} onClick={addToCart}>
          <CartIcon />
        </button>
      </div>
    </div>
  )
}