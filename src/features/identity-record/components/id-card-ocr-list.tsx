"use client"

import { useState } from "react"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { ResponsiveTable } from "@/shared/components/ui/responsive-table"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { Pagination } from "@/shared/components/ui/pagination"
import { IdCardOcrSearch } from "./id-card-ocr-search"
import { IdCardOcrSkeleton } from "./id-card-ocr-skeleton"
import { IdCardOcrImageDialog } from "./id-card-ocr-image-dialog"
import { useIdCardOcrRecords } from "../hooks/use-id-card-ocr"
import { maskSensitiveData } from "@/lib/utils"
import type { IdCardOcrRecord, IdCardOcrListProps } from "../types/id-card-ocr"

export function IdCardOcrList({ sidebarCollapsed, onToggleSidebar }: IdCardOcrListProps) {
  const isMobile = useIsMobile()
  const [selectedRecord, setSelectedRecord] = useState<IdCardOcrRecord | null>(null)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)

  const {
    records,
    totalCount,
    currentPage,
    pageSize,
    isLoading,
    error,
    handleSearch,
    handleReset,
    setCurrentPage,
    searchMutation
  } = useIdCardOcrRecords()

  // 处理影像浏览
  const handleViewImages = (record: IdCardOcrRecord) => {
    setSelectedRecord(record)
    setImageDialogOpen(true)
  }

  // 关闭影像对话框
  const handleCloseImageDialog = () => {
    setImageDialogOpen(false)
    setSelectedRecord(null)
  }

  // 移动端卡片渲染函数
  const renderMobileCard = (record: IdCardOcrRecord) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">记录编号: {record.recordNumber}</div>
          <div className="text-sm text-gray-600">传入身份证号: {maskSensitiveData(record.inputIdCard, 'idCard')}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '影像浏览',
              onClick: () => handleViewImages(record)
            }
          ]}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">正面识别:</span>
          <span className={`ml-1 ${record.frontRecognitionResult === '成功' ? 'text-green-600' : 'text-red-600'}`}>
            {record.frontRecognitionResult}
          </span>
        </div>
        <div>
          <span className="text-gray-500">反面识别:</span>
          <span className={`ml-1 ${record.backRecognitionResult === '成功' ? 'text-green-600' : 'text-red-600'}`}>
            {record.backRecognitionResult}
          </span>
        </div>
        <div>
          <span className="text-gray-500">人脸识别:</span>
          <span className={`ml-1 ${record.faceRecognitionResult === '成功' ? 'text-green-600' : 'text-red-600'}`}>
            {record.faceRecognitionResult}
          </span>
        </div>
        <div>
          <span className="text-gray-500">记录时间:</span>
          <span className="ml-1">{record.recordTime}</span>
        </div>
      </div>
      
      <div className="text-sm">
        <div className="mb-1">
          <span className="text-gray-500">识别身份证号:</span>
          <span className="ml-1">{maskSensitiveData(record.recognizedIdCard, 'idCard')}</span>
        </div>
        <div className="mb-1">
          <span className="text-gray-500">传入姓名:</span>
          <span className="ml-1">{maskSensitiveData(record.inputName, 'name')}</span>
        </div>
        <div>
          <span className="text-gray-500">识别姓名:</span>
          <span className="ml-1">{maskSensitiveData(record.recognizedName, 'name')}</span>
        </div>
      </div>
    </div>
  )

  // 桌面端表格列配置
  const columns = [
    {
      key: 'recordNumber',
      label: '记录编号',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'frontRecognitionResult',
      label: '正面识别结果',
      className: 'text-gray-900',
      render: (value: string) => (
        <span className={value === '成功' ? 'text-green-600' : 'text-red-600'}>
          {value}
        </span>
      ),
      mobileHidden: true
    },
    {
      key: 'backRecognitionResult',
      label: '反面识别结果',
      className: 'text-gray-900',
      render: (value: string) => (
        <span className={value === '成功' ? 'text-green-600' : 'text-red-600'}>
          {value}
        </span>
      ),
      mobileHidden: true
    },
    {
      key: 'faceRecognitionResult',
      label: '人脸识别结果',
      className: 'text-gray-900',
      render: (value: string) => (
        <span className={value === '成功' ? 'text-green-600' : 'text-red-600'}>
          {value}
        </span>
      ),
      mobileHidden: true
    },
    {
      key: 'inputIdCard',
      label: '传入身份证号',
      className: 'text-gray-900',
      render: (value: string) => maskSensitiveData(value, 'idCard'),
      mobileHidden: true
    },
    {
      key: 'recognizedIdCard',
      label: '识别身份证号',
      className: 'text-gray-900',
      render: (value: string) => maskSensitiveData(value, 'idCard'),
      mobileHidden: true
    },
    {
      key: 'inputName',
      label: '传入姓名',
      className: 'text-gray-900',
      render: (value: string) => maskSensitiveData(value, 'name'),
      mobileHidden: true
    },
    {
      key: 'recognizedName',
      label: '识别姓名',
      className: 'text-gray-900',
      render: (value: string) => maskSensitiveData(value, 'name'),
      mobileHidden: true
    },
    {
      key: 'recordTime',
      label: '记录发生时间',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'actions',
      label: '影像浏览',
      className: 'text-gray-500',
      render: (_: any, record: IdCardOcrRecord) => (
        isMobile ? (
          <MobileActionMenu
            actions={[
              {
                label: '影像浏览',
                onClick: () => handleViewImages(record)
              }
            ]}
          />
        ) : (
          <button
            onClick={() => handleViewImages(record)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            影像浏览
          </button>
        )
      )
    }
  ]

  // 如果初始加载中，显示骨架屏
  if (isLoading && records.length === 0) {
    return <IdCardOcrSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "实名记录" },
          { label: "身份证OCR认证记录" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索表单 */}
      <IdCardOcrSearch
        onSearch={handleSearch}
        onReset={handleReset}
        loading={isLoading}
      />

      {/* 身份证OCR认证记录列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取身份证OCR认证记录失败</div>
        ) : records.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无身份证OCR认证记录数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {records.map((record) => (
              <div key={record.id} className="bg-white rounded-lg border border-gray-200 p-4">
                {renderMobileCard(record)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端表格布局
          <ResponsiveTable
            columns={columns}
            data={records}
            keyField="id"
          />
        )}
      </div>

      {/* 分页 */}
      {totalCount > 0 && (
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={() => {}} // 暂时不支持改变页面大小
        />
      )}

      {/* 影像详情对话框 */}
      <IdCardOcrImageDialog
        open={imageDialogOpen}
        onClose={handleCloseImageDialog}
        record={selectedRecord}
      />
    </div>
  )
}
