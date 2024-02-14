import styles from './ProductGrid.module.scss'
import ProductCard from 'components/ProductCard/ProductCard'
import { ProductSchema } from 'entities/types'

type ProductGridProps = {
  products: ProductSchema[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className={styles.productGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}