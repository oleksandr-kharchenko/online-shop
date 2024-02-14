import { useMemo } from 'react'

export const dots = '...'

type UsePaginationProps = {
  totalCount: number,
  pageSize: number,
  siblingCount?: number,
  currentPage: number
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: UsePaginationProps) => {
  const getRange = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, index) => index + start)
  }

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return getRange(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = getRange(1, leftItemCount)
      return [...leftRange, dots, totalPageCount]
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = getRange(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, dots, ...rightRange]
    }

    if (showLeftDots && showRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}