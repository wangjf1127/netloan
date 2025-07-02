"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  MoreHorizontal,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { ImageMonitoring } from "../types"

interface ImageViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageData: ImageMonitoring | null
}

export function ImageViewerDialog({ open, onOpenChange, imageData }: ImageViewerDialogProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoomLevel, setZoomLevel] = useState(75)
  const [rotation, setRotation] = useState(0)
  const isMobile = useIsMobile()

  const totalPages = 2 // 模拟2页文档

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleDownload = () => {
    console.log("下载文档")
    // TODO: 实现下载功能
  }

  const handlePrint = () => {
    console.log("打印文档")
    // TODO: 实现打印功能
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (!imageData) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-7xl h-[90vh] p-0 ${isMobile ? 'w-[95vw]' : 'w-[90vw]'}`}>
        <DialogHeader className="px-4 py-3 border-b border-gray-200">
          <DialogTitle className="text-lg font-semibold">查看影像</DialogTitle>
        </DialogHeader>

        {/* PDF查看器工具栏 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
          {/* 左侧 */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Menu className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 truncate max-w-32">
              {imageData.imageType}
            </span>
          </div>

          {/* 中间 - 桌面端显示完整工具栏 */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              {/* 页码控制 */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-16 text-center">
                  {currentPage} / {totalPages}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* 缩放控制 */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleZoomOut}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-12 text-center">
                  {zoomLevel}%
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleZoomIn}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              {/* 旋转 */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRotate}
                className="h-8 w-8 p-0"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* 右侧 */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDownload}
              className="h-8 w-8 p-0"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrint}
              className="h-8 w-8 p-0"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 移动端页码控制 */}
        {isMobile && (
          <div className="flex items-center justify-center space-x-4 px-4 py-2 border-b border-gray-200 bg-gray-50">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* 缩放控制 */}
            <div className="flex items-center space-x-2 ml-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleZoomOut}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600 min-w-12 text-center">
                {zoomLevel}%
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleZoomIn}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* 主要内容区域 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧缩略图栏 - 桌面端显示 */}
          {!isMobile && (
            <div className="w-48 border-r border-gray-200 bg-gray-50 p-3 overflow-y-auto">
              <div className="space-y-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <div
                    key={index + 1}
                    className={`cursor-pointer border-2 rounded ${
                      currentPage === index + 1
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    <div className="aspect-[3/4] bg-white rounded overflow-hidden">
                      {/* 缩略图内容 */}
                      <div className="w-full h-full bg-white p-2 text-xs leading-tight">
                        <div className="text-center mb-2">
                          <div className="text-xs font-bold">
                            附件5-代偿债务与权益转让确认书
                          </div>
                          <div className="text-xs mt-1">
                            （一式两联）
                          </div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div>保险单号码：YGCX...</div>
                          <div>贷款合同号：2025...</div>
                          <div>投保人姓名：吴***</div>
                          {index === 1 && (
                            <div className="mt-2 text-center text-xs text-gray-500">
                              第二联：存档联
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-xs text-gray-600 py-1">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 主文档显示区域 */}
          <div className="flex-1 overflow-auto bg-gray-100 p-2 md:p-4">
            <div
              className="bg-white shadow-lg mx-auto"
              style={{
                transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center top',
                width: isMobile ? '100%' : '210mm',
                minHeight: isMobile ? 'auto' : '297mm',
                maxWidth: isMobile ? '100%' : 'none'
              }}
            >
              {/* 文档内容 */}
              <div className={`${isMobile ? 'p-4 text-xs' : 'p-8 text-sm'} leading-relaxed`}>
                <div className={`text-center ${isMobile ? 'mb-4' : 'mb-6'}`}>
                  <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold mb-2`}>
                    附件5-代偿债务与权益转让确认书（一式两联）
                  </h2>
                  <h3 className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold`}>
                    代偿债务与权益转让确认书（第一联：业务联）
                  </h3>
                </div>

                <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                  <div className="grid grid-cols-1 gap-2">
                    <div className={isMobile ? 'break-all' : ''}>
                      保险单号码：<span className="font-medium">YGCX202506262022000</span>
                    </div>
                    <div className={isMobile ? 'break-all' : ''}>
                      贷款合同号：<span className="font-medium">202506262024101ec6dd5707937e4</span>
                    </div>
                    <div>投保人姓名：<span className="font-medium">吴次回测四</span></div>
                  </div>

                  <div className="mt-6">
                    <p>贷：阳光财产保险股份有限公司</p>
                  </div>

                  <div className="mt-4">
                    <p>贵公司个人贷款保证保险NO.：<span className="font-medium">YGCX202506262022000</span></p>
                  </div>

                  <div className="mt-6 p-4 border border-gray-300">
                    <p className="mb-2">单项下的代偿款（人民币）：</p>
                    <p className="font-medium">
                      伍万壹仟壹佰叁拾柒圆玖角捌分（大写）
                    </p>
                    <p className="font-medium text-lg">
                      51137.98（小写）
                    </p>
                  </div>

                  <div className="mt-6">
                    <p>已于<span className="font-medium">2030年03月02日</span>收到</p>
                  </div>

                  {currentPage === 2 && (
                    <div className="mt-8 pt-8 border-t border-gray-300">
                      <div className="text-center">
                        <p className="text-base font-semibold mb-4">
                          代偿债务与权益转让确认书（第二联：存档联）
                        </p>
                        <p className="text-sm text-gray-600">
                          此联为存档联，内容与第一联相同
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex items-center justify-end space-x-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="px-6"
          >
            取消
          </Button>
          <Button 
            onClick={() => onOpenChange(false)}
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            确定
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
