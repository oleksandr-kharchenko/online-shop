import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './ProductsPage.module.scss'
import PageLayout from 'components/PageLayout/PageLayout'
import Loader from 'components/Loader/Loader'
import ProductGrid from 'components/ProductGrid/ProductGrid'
import Pagination from 'components/Pagination/Pagination'
import { useAllProducts } from 'api/queries'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
  })
  const currentPage = Number(searchParams.get('page'))

  const changePage = (page: number) => {
    setSearchParams(params => {
      params.set('page', String(page))
      return params
    }, { replace: true })
  }

  const params = useMemo(() => {
    return {
      limit: 15,
      skip: (currentPage - 1) * 15
    }
  }, [currentPage])

  const { data, isLoading } = useAllProducts(params)
  const noData = !data || data.products.length === 0

  let pageClassName = styles.productsPage
  if (isLoading || noData) {
    pageClassName += ` ${styles.noContent}`
  }

  return (
    <PageLayout>
      <div className={pageClassName}>
        {isLoading ? <Loader /> : (
          <>
            {data && data.products.length > 0 ? (
              <>
                <ProductGrid products={data.products} />
                <Pagination
                  totalCount={data.total}
                  currentPage={currentPage}
                  pageSize={15}
                  onPageChange={changePage}
                />
              </>
            ) : <p className={styles.noData}>No data found</p>}
          </>
        )}
      </div>
    </PageLayout>
  )
}