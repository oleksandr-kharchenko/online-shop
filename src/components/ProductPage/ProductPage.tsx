import { useParams } from 'react-router-dom'
import styles from './ProductPage.module.scss'
import PageLayout from 'components/PageLayout/PageLayout'
import Loader from 'components/Loader/Loader'
import Carousel from 'components/Carousel/Carousel'
import CartIcon from 'assets/icons/cart.svg?react'
import { useSingleProduct } from 'api/queries'
import { useCheckout } from 'contexts/CheckoutContext'
import { ProductSchema } from 'entities/types'

export default function ProductPage() {
  const params = useParams()
  const { data, isLoading } = useSingleProduct(params.id as string)

  const inStock = data && data.stock > 0
  const formerPrice = data?.discountPercentage
    ? data.discountPercentage / 100 * data.price + data.price
    : 0

  const { addPurchase } = useCheckout()
  const addToCart = () => {
    (addPurchase as (product: ProductSchema) => void)(data as ProductSchema)
  }

  let pageClassName = styles.productPage
  if (isLoading) {
    pageClassName += ` ${styles.loading}`
  }

  return (
    <PageLayout>
      <div className={pageClassName}>
        {isLoading ? <Loader /> : (
          <>
            {data ? (
              <>
                {data.images.length > 0 && <Carousel images={data.images} />}
                <div className={styles.productInfo}>
                  <div>
                    <h3 className={styles.title}>{data.title}</h3>
                    <p className={styles.description}>{data.description}</p>
                  </div>
                  <ul className={styles.secondaryInfo}>
                    <li>
                      <span className={styles.category}>Brand:</span> {data.brand}
                    </li>
                    <li>
                      <span className={styles.category}>Category:</span> {data.category}
                    </li>
                    <li>
                      {inStock ? (
                        <p>
                          <span className={styles.category}>In stock:</span> {data.stock}
                        </p>
                      ) : (
                        <p className={styles.absent}>Currently not in stock</p>
                      )}
                    </li>
                  </ul>
                  <div className={styles.pricing}>
                    {formerPrice && (
                      <p className={styles.formerPrice}>
                        ${formerPrice.toFixed(2)}
                      </p>
                    )}
                    <p className={styles.price}>
                      ${data.price.toFixed(2)}
                    </p>
                    <button
                      className={styles.purchaseButton}
                      onClick={addToCart}
                      disabled={!inStock}
                    >
                      <p>Buy</p>
                      <CartIcon />
                    </button>
                  </div>
                </div>
              </>
            ) : <p className={styles.noData}>No data found</p>}
          </>
        )}
      </div>
    </PageLayout>
  )
}