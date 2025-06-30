"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw } from "lucide-react"
import type { LoanTransactionSearchParams } from "../types/loan-transaction"

interface LoanTransactionSearchProps {
  onSearch: (params: LoanTransactionSearchParams) => void
  onReset: () => void
  loading?: boolean
}

export function LoanTransactionSearch({ onSearch, onReset, loading }: LoanTransactionSearchProps) {
  const [searchForm, setSearchForm] = useState<LoanTransactionSearchParams>({
    customerNumber: "204997" // 默认值
  })

  const handleInputChange = (field: keyof LoanTransactionSearchParams, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value || undefined
    }))
  }

  const handleSearch = () => {
    onSearch(searchForm)
  }

  const handleReset = () => {
    setSearchForm({ customerNumber: "204997" })
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
          <Label htmlFor="customerNumber">客户号</Label>
          <Input
            id="customerNumber"
            value={searchForm.customerNumber || ""}
            onChange={(e) => handleInputChange("customerNumber", e.target.value)}
            placeholder="请输入客户号"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanAccountNumber">贷款账号</Label>
          <Input
            id="loanAccountNumber"
            value={searchForm.loanAccountNumber || ""}
            onChange={(e) => handleInputChange("loanAccountNumber", e.target.value)}
            placeholder="请输入贷款号"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="receiptNumber">借据号</Label>
          <Input
            id="receiptNumber"
            value={searchForm.receiptNumber || ""}
            onChange={(e) => handleInputChange("receiptNumber", e.target.value)}
            placeholder="请输入借据号"
          />
        </div>
      </div>

      {/* 第2排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="transactionDate">交易日期</Label>
          <Input
            id="transactionDate"
            type="date"
            value={searchForm.transactionDate || ""}
            onChange={(e) => handleInputChange("transactionDate", e.target.value)}
            placeholder="请选择交易日期"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transactionSerialNumber">交易流水号</Label>
          <Input
            id="transactionSerialNumber"
            value={searchForm.transactionSerialNumber || ""}
            onChange={(e) => handleInputChange("transactionSerialNumber", e.target.value)}
            placeholder="请输入交易流水号"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="counterpartDate">对方日期</Label>
          <Input
            id="counterpartDate"
            type="date"
            value={searchForm.counterpartDate || ""}
            onChange={(e) => handleInputChange("counterpartDate", e.target.value)}
            placeholder="请选择对方日期"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="counterpartSerialNumber">对方流水号</Label>
          <Input
            id="counterpartSerialNumber"
            value={searchForm.counterpartSerialNumber || ""}
            onChange={(e) => handleInputChange("counterpartSerialNumber", e.target.value)}
            placeholder="请输入对方流水号"
          />
        </div>
      </div>

      {/* 第3排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="serviceCode">服务码</Label>
          <Select 
            value={searchForm.serviceCode || ""} 
            onValueChange={(value) => handleInputChange("serviceCode", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择服务码" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="网贷放款">网贷放款</SelectItem>
              <SelectItem value="网贷还款">网贷还款</SelectItem>
              <SelectItem value="网贷扣款">网贷扣款</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transactionStatus">交易状态</Label>
          <Select 
            value={searchForm.transactionStatus || ""} 
            onValueChange={(value) => handleInputChange("transactionStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择交易状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="记账成功">记账成功</SelectItem>
              <SelectItem value="记账失败">记账失败</SelectItem>
              <SelectItem value="处理中">处理中</SelectItem>
            </SelectContent>
          </Select>
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
