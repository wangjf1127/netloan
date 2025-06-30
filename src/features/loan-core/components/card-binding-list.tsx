"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { Pagination } from "@/shared/components/ui/pagination"
import { CardBindingSearch } from "./card-binding-search"
import { useCardBinding, useSearchCardBinding } from "../hooks/use-card-binding"
import { maskSensitiveData } from "@/lib/utils"
import { NotImplementedButton } from "@/shared/components/ui/feature-not-implemented"
import type { CardBinding, CardBindingListProps, CardBindingSearchParams } from "../types/card-binding"

export function CardBindingList({ sidebarCollapsed, onToggleSidebar }: CardBindingListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  const isMobile = useIsMobile()
  const { data: cardBindings = [], isLoading, error, refetch } = useCardBinding()
  const searchMutation = useSearchCardBinding()

  const handleSearch = (params: CardBindingSearchParams) => {
    searchMutation.mutate(params)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setCurrentPage(1)
    refetch()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }

  // 计算分页数据
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedCardBindings = cardBindings.slice(startIndex, endIndex)

  // 移动端卡片渲染函数
  const renderMobileCard = (cardBinding: CardBinding) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{cardBinding.institution}</div>
          <div className="text-sm text-blue-600">客户编号: {cardBinding.customerNumber}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '选择',
              onClick: () => console.log('选择', cardBinding.id)
            },
            {
              label: '绑卡流水',
              onClick: () => console.log('绑卡流水', cardBinding.id)
            }
          ]}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">姓名</div>
          <div className="font-medium">{maskSensitiveData(cardBinding.customerName, 'name')}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">证件号码</div>
          <div className="font-medium">{maskSensitiveData(cardBinding.certificateNumber, 'idCard')}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "贷款核心" },
          { label: "绑卡查询" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索区域 */}
      <CardBindingSearch
        onSearch={handleSearch}
        onReset={handleReset}
        loading={isLoading || searchMutation.isPending}
      />

      {/* 绑卡查询列表 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取绑卡查询列表失败</div>
        ) : cardBindings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无绑卡查询数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {paginatedCardBindings.map((cardBinding) => (
              <div key={cardBinding.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                {renderMobileCard(cardBinding)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端表格布局
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    机构
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户编号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    姓名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    证件号码
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedCardBindings.map((cardBinding) => (
                  <tr key={cardBinding.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cardBinding.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {cardBinding.customerNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maskSensitiveData(cardBinding.customerName, 'name')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maskSensitiveData(cardBinding.certificateNumber, 'idCard')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <NotImplementedButton
                          featureName="选择"
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                        >
                          选择
                        </NotImplementedButton>
                        <NotImplementedButton
                          featureName="绑卡流水"
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                        >
                          绑卡流水
                        </NotImplementedButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页组件 */}
        {cardBindings.length > 0 && (
          <Pagination
            total={cardBindings.length}
            current={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  )
}
