"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import type { AccountQuerySearchParams } from "../types"

interface AccountQuerySearchProps {
  onSearch: (params: AccountQuerySearchParams) => void
  onReset: () => void
  loading?: boolean
}

export function AccountQuerySearch({ onSearch, onReset, loading }: AccountQuerySearchProps) {
  const [searchForm, setSearchForm] = useState<AccountQuerySearchParams>({
    customerId: "204997" // 默认值
  })

  const handleInputChange = (field: keyof AccountQuerySearchParams, value: string) => {
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
          <Label htmlFor="primaryChannelNumber">一级渠道号</Label>
          <Select 
            value={searchForm.primaryChannelNumber || ""} 
            onValueChange={(value) => handleInputChange("primaryChannelNumber", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择一级渠道号" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FZ00002">FZ00002</SelectItem>
              <SelectItem value="FZ00001">FZ00001</SelectItem>
              <SelectItem value="FZ00003">FZ00003</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coreProduct">核心产品</Label>
          <Select 
            value={searchForm.coreProduct || ""} 
            onValueChange={(value) => handleInputChange("coreProduct", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择核心产品" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PROD0000004500022">PROD0000004500022</SelectItem>
              <SelectItem value="PROD0000004500021">PROD0000004500021</SelectItem>
              <SelectItem value="PROD0000004500023">PROD0000004500023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerId">客户号</Label>
          <Input
            id="customerId"
            value={searchForm.customerId || ""}
            onChange={(e) => handleInputChange("customerId", e.target.value)}
            placeholder="204997"
          />
        </div>
      </div>

      {/* 第2排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="loanAccountNumber">贷款账号</Label>
          <Input
            id="loanAccountNumber"
            value={searchForm.loanAccountNumber || ""}
            onChange={(e) => handleInputChange("loanAccountNumber", e.target.value)}
            placeholder="请输入贷款账号"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanReceiptNumber">借据号</Label>
          <Input
            id="loanReceiptNumber"
            value={searchForm.loanReceiptNumber || ""}
            onChange={(e) => handleInputChange("loanReceiptNumber", e.target.value)}
            placeholder="请输入借据号"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountName">账户名称</Label>
          <Input
            id="accountName"
            value={searchForm.accountName || ""}
            onChange={(e) => handleInputChange("accountName", e.target.value)}
            placeholder="请输入账户名称"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountStatus">账户状态</Label>
          <Select 
            value={searchForm.accountStatus || ""} 
            onValueChange={(value) => handleInputChange("accountStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择账户状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="正常">正常</SelectItem>
              <SelectItem value="逾期">逾期</SelectItem>
              <SelectItem value="结清">结清</SelectItem>
              <SelectItem value="冻结">冻结</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 第3排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="processingFlag">处理标志</Label>
          <Select 
            value={searchForm.processingFlag || ""} 
            onValueChange={(value) => handleInputChange("processingFlag", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择处理标志" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="已处理">已处理</SelectItem>
              <SelectItem value="未处理">未处理</SelectItem>
              <SelectItem value="处理中">处理中</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div></div> {/* 空占位 */}

        <div className="flex gap-2">
          <Button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            查询
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={loading}
          >
            重置
          </Button>
        </div>

        <div></div> {/* 空占位 */}
      </div>
    </div>
  )
}
