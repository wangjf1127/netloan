"use client"

import { Button } from "@/shared/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TestRecordPaginationProps {
  currentPage: number
  pageSize: number
  totalCount: number
  onPageChange: (page: number) => void
}

export function TestRecordPagination({ 
  currentPage, 
  pageSize, 
  totalCount, 
  onPageChange 
}: TestRecordPaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize)
  const startIndex = (currentPage - 1) * pageSize + 1
  const endIndex = Math.min(currentPage * pageSize, totalCount)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  if (totalCount === 0) {
    return null
  }

  return (
    <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      {/* 左侧信息 */}
      <div className="text-sm text-gray-700">
        总共{totalCount}条，当前第{currentPage}页，每页显示{pageSize}条/页
      </div>

      {/* 右侧分页控件 */}
      <div className="flex items-center space-x-2">
        {/* 上一页 */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center space-x-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>上一页</span>
        </Button>

        {/* 页码 */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageClick(page)}
              className={`min-w-[32px] ${
                currentPage === page 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "hover:bg-gray-50"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        {/* 下一页 */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1"
        >
          <span>下一页</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
