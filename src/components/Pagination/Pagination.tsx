import { Fragment } from 'react'
import { v4 } from 'uuid'
import styles from './Pagination.module.scss'
import ChervronLeftIcon from 'assets/icons/chevron-left.svg?react'
import ChevronRightIcon from 'assets/icons/chevron-right.svg?react'
import { dots, usePagination } from 'hooks/usePagination'

type PaginationProps = {
  totalCount: number,
  siblingCount?: number,
  currentPage: number,
  pageSize: number,
  onPageChange: (page: number) => void
}

export default function Pagination({
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  onPageChange
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  }) as Array<string | number>

  const goToNextPage = () => {
    onPageChange(currentPage + 1)
  }

  const goToPrevPage = () => {
    onPageChange(currentPage - 1)
  }

  const getButtonClassName = (pageNumber: number) => {
    let className = styles.paginationButton
    if (pageNumber === currentPage) {
      className += ` ${styles.selected}`
    }
    return className
  }

  const changePage = (pageNumber: number) => {
    return () => {
      onPageChange(pageNumber)
    }
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={goToPrevPage}
      >
        <ChervronLeftIcon />
      </button>
      {paginationRange.map(pageNumber => (
        <Fragment key={v4()}>
          {pageNumber === dots ? (
            <div className={styles.dots}>{pageNumber}</div>
          ) : (
            <button
              className={getButtonClassName(pageNumber as number)}
              onClick={changePage(pageNumber as number)}
            >
              {pageNumber}
            </button>
          )}
        </Fragment>
      ))}
      <button
        className={styles.paginationButton}
        disabled={currentPage === lastPage}
        onClick={goToNextPage}
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}