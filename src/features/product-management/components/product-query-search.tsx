"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import type { ProductSearchParams } from "../types"

interface ProductQuerySearchProps {
  onSearch: (params: ProductSearchParams) => void
  onReset: () => void
  loading?: boolean
}

export function ProductQuerySearch({ onSearch, onReset, loading }: ProductQuerySearchProps) {
  const [searchForm, setSearchForm] = useState<ProductSearchParams>({})

  const handleInputChange = (field: keyof ProductSearchParams, value: string) => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* 第1排 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
              <SelectItem value="上海**银行商业银行">上海**银行商业银行</SelectItem>
              <SelectItem value="中国工商银行">中国工商银行</SelectItem>
              <SelectItem value="中国建设银行">中国建设银行</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="productSubCode">产品细分代码</Label>
          <Input
            id="productSubCode"
            value={searchForm.productSubCode || ""}
            onChange={(e) => handleInputChange("productSubCode", e.target.value)}
            placeholder="请输入产品细分代码"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCode">产品代码</Label>
          <Input
            id="productCode"
            value={searchForm.productCode || ""}
            onChange={(e) => handleInputChange("productCode", e.target.value)}
            placeholder="请输入产品代码"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            查询
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            重置
          </Button>
        </div>
      </div>
    </div>
  )
}
