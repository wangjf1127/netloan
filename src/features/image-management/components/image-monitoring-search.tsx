"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw, Download } from "lucide-react"
import type { ImageMonitoringSearchParams } from "../types"
import { IMAGE_TYPES, IMAGE_STATUS, PRODUCT_NAMES } from "../types"

interface ImageMonitoringSearchProps {
  onSearch: (params: ImageMonitoringSearchParams) => void
  onReset: () => void
  loading?: boolean
}

export function ImageMonitoringSearch({ onSearch, onReset, loading }: ImageMonitoringSearchProps) {
  const [searchForm, setSearchForm] = useState<ImageMonitoringSearchParams>({})

  const handleInputChange = (field: keyof ImageMonitoringSearchParams, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value || undefined
    }))
  }

  const handleSearch = () => {
    onSearch(searchForm)
  }

  const handleReset = () => {
    setSearchForm({})
    onReset()
  }

  const handleExport = () => {
    // 模拟导出功能
    console.log("导出影像检测数据")
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      {/* 第一排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-700 mb-1">业务日期：</label>
          <div className="flex items-center space-x-2">
            <Input
              type="date"
              value={searchForm.startDate || ""}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="h-8"
            />
            <span className="text-gray-500">-</span>
            <Input
              type="date"
              value={searchForm.endDate || ""}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              className="h-8"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-700 mb-1">产品名称：</label>
          <Select
            value={searchForm.productName || "all"}
            onValueChange={(value) => handleInputChange("productName", value === "all" ? "" : value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="阳光财险消费" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {PRODUCT_NAMES.map(name => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-xs text-gray-700 mb-1">影像类型：</label>
          <Select
            value={searchForm.imageType || "all"}
            onValueChange={(value) => handleInputChange("imageType", value === "all" ? "" : value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="请选择影像类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {IMAGE_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-xs text-gray-700 mb-1">影像状态：</label>
          <Select
            value={searchForm.imageStatus || "all"}
            onValueChange={(value) => handleInputChange("imageStatus", value === "all" ? "" : value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="已推送行内" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {IMAGE_STATUS.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 第二排 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-700 mb-1">业务单号：</label>
          <Input
            placeholder="请输入业务单号"
            value={searchForm.businessNumber || ""}
            onChange={(e) => handleInputChange("businessNumber", e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-700 mb-1">客户手机号：</label>
          <Input
            placeholder="请输入客户手机号"
            value={searchForm.customerPhone || ""}
            onChange={(e) => handleInputChange("customerPhone", e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-700 mb-1">客户姓名：</label>
          <Input
            placeholder="请输入客户姓名"
            value={searchForm.customerName || ""}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-700 mb-1">证件编号：</label>
          <Input
            placeholder="请输入证件编号"
            value={searchForm.certificateNumber || ""}
            onChange={(e) => handleInputChange("certificateNumber", e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-700 mb-1">uin：</label>
          <Input
            placeholder="请输入uin"
            value={searchForm.uin || ""}
            onChange={(e) => handleInputChange("uin", e.target.value)}
            className="h-8"
          />
        </div>
      </div>

      {/* 第三排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-gray-700 mb-1">trx：</label>
          <Input
            placeholder="请输入trx"
            value={searchForm.trx || ""}
            onChange={(e) => handleInputChange("trx", e.target.value)}
            className="h-8"
          />
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
          <Button
            size="sm"
            onClick={handleExport}
            className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="h-3 w-3 mr-1" />
            导出
          </Button>
        </div>
      </div>
    </div>
  )
}
