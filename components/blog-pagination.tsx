"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  searchParams: {
    search?: string
    category?: string
    tag?: string
  }
}

export default function BlogPagination({ currentPage, totalPages, searchParams }: BlogPaginationProps) {
  // Create the query string for pagination links
  const createQueryString = (page: number) => {
    const params = new URLSearchParams()

    if (page > 1) {
      params.set("page", page.toString())
    }

    if (searchParams.search) {
      params.set("search", searchParams.search)
    }

    if (searchParams.category) {
      params.set("category", searchParams.category)
    }

    if (searchParams.tag) {
      params.set("tag", searchParams.tag)
    }

    const queryString = params.toString()
    return queryString ? `?${queryString}` : ""
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = 4
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pageNumbers.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pageNumbers.push("ellipsis-end")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex justify-center" aria-label="Pagination">
      <ul className="flex items-center space-x-1">
        {/* Previous Page */}
        <li>
          {currentPage > 1 ? (
            <Link
              href={`/blog${createQueryString(currentPage - 1)}`}
              className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          ) : (
            <span className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed">
              <ChevronLeft className="h-5 w-5" />
            </span>
          )}
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="flex items-center justify-center h-10 w-10 text-gray-700 dark:text-gray-300">...</span>
              </li>
            )
          }

          return (
            <li key={index}>
              {page === currentPage ? (
                <span className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white font-medium">
                  {page}
                </span>
              ) : (
                <Link
                  href={`/blog${createQueryString(page as number)}`}
                  className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {page}
                </Link>
              )}
            </li>
          )
        })}

        {/* Next Page */}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={`/blog${createQueryString(currentPage + 1)}`}
              className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <span className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed">
              <ChevronRight className="h-5 w-5" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
