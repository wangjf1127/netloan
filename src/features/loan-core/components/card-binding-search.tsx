"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw } from "lucide-react"
import type { CardBindingSearchParams } from "../types/card-binding"

interface CardBindingSearchProps {
  onSearch: (params: CardBindingSearchParams) => void
  onReset: () => void
  loading?: boolean
}

export function CardBindingSearch({ onSearch, onReset, loading }: CardBindingSearchProps) {
  const [searchForm, setSearchForm] = useState<CardBindingSearchParams>({
    customerId: "204997" // 默认值
  })

  const handleInputChange = (field: keyof CardBindingSearchParams, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value || undefined
    }))
  }

  const handleSearch = () => {
    onSearch(searchForm)
  }

  const handleReset = () => {
    setSearchForm({ customerId: "204997" })
    onReset()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* 第1排 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="institution">机构</Label>
          <Select 
            value={searchForm.institution || ""} 
            onValueChange={(value) => handleInputChange("institution", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择机构" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="上海**商业银行">上海**商业银行</SelectItem>
              <SelectItem value="中国工商银行">中国工商银行</SelectItem>
              <SelectItem value="中国建设银行">中国建设银行</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerId">客户ID</Label>
          <Input
            id="customerId"
            value={searchForm.customerId || ""}
            onChange={(e) => handleInputChange("customerId", e.target.value)}
            placeholder="请输入客户ID"
          />
        </div>
      </div>

      {/* 第2排 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">客户姓名</Label>
          <Input
            id="customerName"
            value={searchForm.customerName || ""}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            placeholder="请输入客户姓名"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerPhone">客户手机号</Label>
          <Input
            id="customerPhone"
            value={searchForm.customerPhone || ""}
            onChange={(e) => handleInputChange("customerPhone", e.target.value)}
            placeholder="请输入客户手机号"
          />
        </div>
      </div>

      {/* 第3排 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="certificateNumber">证件号码</Label>
          <Input
            id="certificateNumber"
            value={searchForm.certificateNumber || ""}
            onChange={(e) => handleInputChange("certificateNumber", e.target.value)}
            placeholder="请输入证件号码"
          />
        </div>

        <div className="md:col-span-2 flex items-end space-x-4">
          <Button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Search className="h-4 w-4 mr-2" />
            查询
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={loading}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
        </div>
      </div>
    </div>
  )
}
