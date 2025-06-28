"use client"

import { useIsMobile } from "../../../../components/ui/use-mobile"
import { Button } from "../../../../components/ui/button"
import { Menu, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface ResponsiveBreadcrumbProps {
  items: BreadcrumbItem[]
  onToggleSidebar?: () => void
  backLink?: string
  className?: string
}

export function ResponsiveBreadcrumb({
  items,
  onToggleSidebar,
  backLink,
  className
}: ResponsiveBreadcrumbProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    // 移动端简化显示：只显示当前页面标题
    const currentPage = items[items.length - 1]
    
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="flex items-center space-x-3">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onToggleSidebar}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            {currentPage.label}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {backLink && (
            <Link href={backLink} className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">返回</span>
            </Link>
          )}
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">管</span>
          </div>
        </div>
      </div>
    )
  }

  // 桌面端完整面包屑
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-3">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <span>/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-gray-900">
                  {item.label}
                </Link>
              ) : (
                <span className={index === items.length - 1 ? "text-gray-900" : ""}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {backLink && (
          <Link href={backLink} className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Link>
        )}
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">管</span>
        </div>
      </div>
    </div>
  )
}
