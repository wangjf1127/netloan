"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { maskSensitiveData } from "@/lib/utils"
import type { IdCardOcrRecord } from "../types/id-card-ocr"

interface IdCardOcrImageDialogProps {
  open: boolean
  onClose: () => void
  record: IdCardOcrRecord | null
}

export function IdCardOcrImageDialog({ open, onClose, record }: IdCardOcrImageDialogProps) {
  const isMobile = useIsMobile()

  if (!record) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isMobile ? 'w-[95vw] h-[95vh]' : 'w-full'}`}>
        {/* 固定的关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">关闭</span>
        </button>

        <div className="space-y-6 pt-6">
          {/* 第1排：标题 */}
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">OCR影像</DialogTitle>
          </DialogHeader>

          {/* 第2排：三张卡片区域 */}
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {/* 身份证正面 */}
            <div className="space-y-2">
              <div className="aspect-[1.6/1] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-sm">身份证正面</div>
                  <div className="text-xs mt-1">暂无图片</div>
                </div>
              </div>
              <div className="text-center text-sm font-medium text-gray-700">身份证正面</div>
            </div>

            {/* 身份证反面 */}
            <div className="space-y-2">
              <div className="aspect-[1.6/1] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-sm">身份证反面</div>
                  <div className="text-xs mt-1">暂无图片</div>
                </div>
              </div>
              <div className="text-center text-sm font-medium text-gray-700">身份证反面</div>
            </div>

            {/* 人脸照片 */}
            <div className="space-y-2">
              <div className="aspect-[1.6/1] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-sm">人脸照片</div>
                  <div className="text-xs mt-1">暂无图片</div>
                </div>
              </div>
              <div className="text-center text-sm font-medium text-gray-700">人脸照片</div>
            </div>
          </div>

          {/* 第4排：相关信息和OCR结果标题 */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">相关信息和OCR结果</h3>
          </div>

          {/* OCR结果信息 */}
          <div className="space-y-3">
            {/* 第5排：识别结果 */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700 mb-2">识别结果：</div>
              <div className="flex flex-wrap gap-4 text-sm">
                <span>正面：<span className={record.frontRecognitionResult === '成功' ? 'text-green-600' : 'text-red-600'}>{record.frontRecognitionResult === '成功' ? '通过' : '失败'}</span></span>
                <span>反面：<span className={record.backRecognitionResult === '成功' ? 'text-green-600' : 'text-red-600'}>{record.backRecognitionResult === '成功' ? '通过' : '失败'}</span></span>
                <span>人脸：<span className={record.faceRecognitionResult === '成功' ? 'text-green-600' : 'text-red-600'}>{record.faceRecognitionResult === '成功' ? '通过' : '失败'}</span></span>
              </div>
            </div>

            {/* 第6排：传入身份证号 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">传入身份证号：</span>
              <span className="text-gray-900">{maskSensitiveData(record.inputIdCard, 'idCard')}</span>
            </div>

            {/* 第7排：识别身份证号 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">识别身份证号：</span>
              <span className="text-gray-900">{maskSensitiveData(record.recognizedIdCard, 'idCard')} 质量值：1</span>
            </div>

            {/* 第8排：传入姓名 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">传入姓名：</span>
              <span className="text-gray-900">{maskSensitiveData(record.inputName, 'name')}</span>
            </div>

            {/* 第9排：识别姓名 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">识别姓名：</span>
              <span className="text-gray-900">{maskSensitiveData(record.recognizedName, 'name')} 质量值：0.999</span>
            </div>

            {/* 第10排：识别其他内容 - 民族 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">识别其他内容：</span>
              <span className="text-gray-900">民族：汉 质量值：0.999</span>
            </div>

            {/* 第11排：性别 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">性别：</span>
              <span className="text-gray-900">女 质量值：1</span>
            </div>

            {/* 第12排：生日 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">生日：</span>
              <span className="text-gray-900">1995年10月1日</span>
            </div>

            {/* 第13排：有效期 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">有效期：</span>
              <span className="text-gray-900">2023.09.23-2043.09.23 质量值：1</span>
            </div>

            {/* 第14排：签发机关 */}
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 w-32">签发机关：</span>
              <span className="text-gray-900">上海市公安局浦东分局 质量值：1</span>
            </div>

            {/* 第15排：地址 */}
            <div className="flex items-start text-sm">
              <span className="font-medium text-gray-700 w-32 flex-shrink-0">地址：</span>
              <span className="text-gray-900">{maskSensitiveData("上海市浦东新区新行路340号", 'address')} 质量值：0.987</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
