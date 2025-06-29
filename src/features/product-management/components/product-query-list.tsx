"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"

import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { ProductQuerySearch } from "./product-query-search"
import { ProductPagination } from "./product-pagination"
import { ProductQuerySkeleton } from "./product-query-skeleton"
import { useProducts } from "../hooks/use-products"
import type { Product } from "../types"

interface ProductQueryListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function ProductQueryList({ sidebarCollapsed, onToggleSidebar }: ProductQueryListProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    products,
    isLoading,
    error,
    searchMutation,
    handleSearch,
    handleReset
  } = useProducts()

  // 模拟初始加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleViewDetail = (product: Product) => {
    // 跳转到产品详情页面
    router.push(`/product-management/product-query/${product.id}`)
  }

  // 计算分页数据
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedProducts = products.slice(startIndex, endIndex)

  // 移动端卡片渲染函数
  const renderMobileCard = (product: Product) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1 flex-1">
          <div className="font-medium text-gray-900 text-sm">{product.productSubName}</div>
          <div className="text-xs text-gray-600">{product.productSubCode}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '查看',
              onClick: () => handleViewDetail(product)
            }
          ]}
        />
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">机构:</span>
          <span className="text-gray-900 text-right flex-1 ml-2">{product.institution}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">产品代码:</span>
          <span className="text-gray-900 text-right flex-1 ml-2">{product.productCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">产品名称:</span>
          <span className="text-gray-900 text-right flex-1 ml-2">{product.productName || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">放款部件代码:</span>
          <span className="text-gray-900 text-right flex-1 ml-2">{product.loanComponentCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">还款部件代码:</span>
          <span className="text-gray-900 text-right flex-1 ml-2">{product.repaymentComponentCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">计息部件代码:</span>
          <span className="text-gray-900 text-right flex-1 ml-2">{product.interestComponentCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">还款方式:</span>
          <span className="text-gray-900 text-right flex-1 ml-2">{product.repaymentMethod}</span>
        </div>
      </div>
    </div>
  )



  // 显示骨架屏
  if (isInitialLoading) {
    return <ProductQuerySkeleton />
  }

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "产品管理" },
          { label: "产品查询" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索表单 */}
      <ProductQuerySearch
        onSearch={handleSearch}
        onReset={handleReset}
        loading={isLoading || searchMutation.isPending}
      />

      {/* 产品列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取产品列表失败</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无产品数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4">
                {renderMobileCard(product)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端表格布局（带遮罩效果）
          <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '2000px', tableLayout: 'fixed' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>
                    机构
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '180px', minWidth: '180px' }}>
                    产品细分代码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '200px', minWidth: '200px' }}>
                    产品细分名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '150px', minWidth: '150px' }}>
                    产品代码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>
                    产品名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '180px', minWidth: '180px' }}>
                    放款部件代码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ width: '120px', minWidth: '120px' }}>
                    放款部件名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '180px', minWidth: '180px' }}>
                    还款部件代码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ width: '120px', minWidth: '120px' }}>
                    还款部件名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '180px', minWidth: '180px' }}>
                    计息部件代码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ width: '120px', minWidth: '120px' }}>
                    计息部件名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ width: '150px', minWidth: '150px' }}>
                    还款方式
                  </th>
                  {/* 操作列固定在右侧，带层叠效果 */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10 relative" style={{ width: '100px', minWidth: '100px' }}>
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-gray-300/20 to-gray-50 pointer-events-none -ml-4"></div>
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '120px', minWidth: '120px' }}>
                      {product.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '180px', minWidth: '180px' }}>
                      {product.productSubCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '200px', minWidth: '200px' }}>
                      {product.productSubName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '150px', minWidth: '150px' }}>
                      {product.productCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '120px', minWidth: '120px' }}>
                      {product.productName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '180px', minWidth: '180px' }}>
                      {product.loanComponentCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '120px', minWidth: '120px' }}>
                      {product.loanComponentName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '180px', minWidth: '180px' }}>
                      {product.repaymentComponentCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '120px', minWidth: '120px' }}>
                      {product.repaymentComponentName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '180px', minWidth: '180px' }}>
                      {product.interestComponentCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '120px', minWidth: '120px' }}>
                      {product.interestComponentName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ width: '150px', minWidth: '150px' }}>
                      {product.repaymentMethod}
                    </td>
                    {/* 操作列固定在右侧，带层叠效果 */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 sticky right-0 bg-white z-10 relative" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-gray-300/25 to-white pointer-events-none -ml-4"></div>
                      <button
                        onClick={() => handleViewDetail(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页组件 */}
        {products.length > 0 && (
          <ProductPagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={products.length}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
