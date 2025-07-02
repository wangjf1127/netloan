"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { Pagination } from "@/shared/components/ui/pagination"
import { ImageMonitoringSearch } from "./image-monitoring-search"
import { ImageMonitoringSkeleton } from "./image-monitoring-skeleton"
import { ImageViewerDialog } from "./image-viewer-dialog"
import { useImageMonitoringList } from "../hooks/use-image-monitoring"
import { maskSensitiveData } from "@/lib/utils"
import type { ImageMonitoring } from "../types"

export function ImageMonitoringList() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageMonitoring | null>(null)
  const isMobile = useIsMobile()
  
  const {
    data: imageMonitoringList,
    totalCount,
    currentPage,
    pageSize,
    isLoading,
    handleSearch,
    handleReset,
    handlePageChange,
    handlePageSizeChange
  } = useImageMonitoringList()

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleView = (record: ImageMonitoring) => {
    setSelectedImage(record)
    setViewerOpen(true)
  }

  const handleDownload = (record: ImageMonitoring) => {
    console.log("下载影像:", record)
    // TODO: 实现下载功能
  }

  // 显示骨架屏
  if (isInitialLoading) {
    return <ImageMonitoringSkeleton />
  }

  // 移动端卡片渲染
  const renderMobileCard = (record: ImageMonitoring) => (
    <div key={record.id} className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">产品名称:</span>
          <span className="text-sm text-gray-900 text-right">{record.productName}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">业务单号:</span>
          <span className="text-sm text-gray-900 text-right">{record.businessNumber}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">客户姓名:</span>
          <span className="text-sm text-gray-900 text-right">{maskSensitiveData(record.customerName, 'name')}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">证件编号:</span>
          <span className="text-sm text-gray-900 text-right">{maskSensitiveData(record.certificateNumber, 'idCard')}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">影像类型:</span>
          <span className="text-sm text-gray-900 text-right">{record.imageType}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">影像状态:</span>
          <span className="text-sm text-gray-900 text-right">{record.imageStatus}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-600">操作:</span>
          <MobileActionMenu
            actions={[
              {
                label: '查看',
                onClick: () => handleView(record)
              },
              {
                label: '下载',
                onClick: () => handleDownload(record)
              }
            ]}
          />
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
          { label: "影像件管理" },
          { label: "影像检测查询" }
        ]}
        backLink="/"
      />

      {/* 搜索表单 */}
      <ImageMonitoringSearch
        onSearch={handleSearch}
        onReset={handleReset}
        loading={isLoading}
      />

      {/* 影像检测列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">加载中...</div>
        ) : imageMonitoringList.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无影像检测数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {imageMonitoringList.map((record) => renderMobileCard(record))}
          </div>
        ) : (
          // 桌面端表格布局（保持原样）
          <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1400px' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    产品名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    业务单号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户姓名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    证件编号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    影像类型
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    业务发生日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    影像补录日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    影像状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {imageMonitoringList.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.businessNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maskSensitiveData(record.customerName, 'name')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maskSensitiveData(record.certificateNumber, 'idCard')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.imageType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.businessDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.imageSupplementDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.createTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.imageStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(record)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          查看
                        </button>
                        <button
                          onClick={() => handleDownload(record)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          下载
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页 */}
        {totalCount > 0 && (
          <Pagination
            total={totalCount}
            current={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>

      {/* 影像查看器弹窗 */}
      <ImageViewerDialog
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        imageData={selectedImage}
      />
    </div>
  )
}
