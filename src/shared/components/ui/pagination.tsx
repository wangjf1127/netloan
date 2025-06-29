"use client"

import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  total: number
  current: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  className?: string
}

export function Pagination({
  total,
  current,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className
}: PaginationProps) {
  const [jumpPage, setJumpPage] = useState("")
  
  const totalPages = Math.ceil(total / pageSize)
  
  const handleJump = () => {
    const page = parseInt(jumpPage)
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
      setJumpPage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJump()
    }
  }

  // 生成页码按钮
  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      // 如果总页数小于等于最大显示数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 复杂的页码显示逻辑
      if (current <= 3) {
        // 当前页在前面
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (current >= totalPages - 2) {
        // 当前页在后面
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 当前页在中间
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className={`flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-gray-600 ${className}`}>
      {/* 左侧：总条数 */}
      <div className="flex items-center space-x-4">
        <span>共计{total}条</span>
      </div>

      {/* 右侧：分页控件 */}
      <div className="flex items-center space-x-4">
        {/* 每页条数选择 */}
        <div className="flex items-center space-x-2">
          <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(parseInt(value))}>
            <SelectTrigger className="h-8 w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10条/页</SelectItem>
              <SelectItem value="20">20条/页</SelectItem>
              <SelectItem value="50">50条/页</SelectItem>
              <SelectItem value="100">100条/页</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 页码按钮 */}
        <div className="flex items-center space-x-1">
          {/* 上一页 */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(current - 1)}
            disabled={current <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* 页码 */}
          {renderPageNumbers().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-2">...</span>
              ) : (
                <Button
                  variant={current === page ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}

          {/* 下一页 */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(current + 1)}
            disabled={current >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 跳转 */}
        <div className="flex items-center space-x-2">
          <span>跳至</span>
          <Input
            type="number"
            min="1"
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-8 w-16 text-center"
            placeholder=""
          />
          <span>页</span>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={handleJump}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  )
}
