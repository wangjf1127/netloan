"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, RotateCcw, ZoomIn } from "lucide-react"
import type { IdCardOcrSearchParams } from "../types/id-card-ocr"

interface IdCardOcrSearchProps {
  onSearch: (params: IdCardOcrSearchParams) => void
  onReset: () => void
  loading?: boolean
}

export function IdCardOcrSearch({ onSearch, onReset, loading }: IdCardOcrSearchProps) {
  const [searchForm, setSearchForm] = useState<IdCardOcrSearchParams>({
    inputIdCard: "421088199602066174" // 默认值
  })

  const handleInputChange = (field: keyof IdCardOcrSearchParams, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value || undefined
    }))
  }

  const handleSearch = () => {
    onSearch(searchForm)
  }

  const handleReset = () => {
    setSearchForm({ inputIdCard: "421088199602066174" })
    onReset()
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      {/* 第1排 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-700 mb-1">记录编号：</label>
          <Input
            placeholder="请输入记录编号"
            value={searchForm.recordNumber || ""}
            onChange={(e) => handleInputChange("recordNumber", e.target.value)}
            className="h-8"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-700 mb-1">传入身份证号：</label>
          <div className="relative">
            <Input
              placeholder="请输入身份证号"
              value={searchForm.inputIdCard || ""}
              onChange={(e) => handleInputChange("inputIdCard", e.target.value)}
              className="h-8 pr-8"
            />
            <ZoomIn className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs text-gray-700 mb-1">记录发生时间：</label>
          <Input
            type="date"
            value={searchForm.recordTime || ""}
            onChange={(e) => handleInputChange("recordTime", e.target.value)}
            className="h-8"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-700 mb-1">一级渠道：</label>
          <Select
            value={searchForm.primaryChannel || ""}
            onValueChange={(value) => handleInputChange("primaryChannel", value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="请选择一级渠道" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="移动端">移动端</SelectItem>
              <SelectItem value="PC端">PC端</SelectItem>
              <SelectItem value="APP">APP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-700 mb-1">正面识别结果：</label>
          <Select
            value={searchForm.frontRecognitionResult || ""}
            onValueChange={(value) => handleInputChange("frontRecognitionResult", value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="请选择正面识别结果" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="成功">成功</SelectItem>
              <SelectItem value="失败">失败</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 第2排 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs text-gray-700 mb-1">反面识别结果：</label>
          <Select
            value={searchForm.backRecognitionResult || ""}
            onValueChange={(value) => handleInputChange("backRecognitionResult", value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="请选择反面识别结果" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="成功">成功</SelectItem>
              <SelectItem value="失败">失败</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-700 mb-1">人脸识别结果：</label>
          <Select
            value={searchForm.faceRecognitionResult || ""}
            onValueChange={(value) => handleInputChange("faceRecognitionResult", value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="请选择人脸识别结果" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="成功">成功</SelectItem>
              <SelectItem value="失败">失败</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div></div>
        <div></div>
        
        <div className="flex items-end space-x-2">
          <Button
            size="sm"
            onClick={handleSearch}
            className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            <Search className="h-3 w-3 mr-1" />
            查询
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8"
            disabled={loading}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            重置
          </Button>
        </div>
      </div>
    </div>
  )
}
