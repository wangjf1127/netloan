"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TestRecordSearchParams } from "../types"

interface TestRecordSearchProps {
  onSearch: (params: TestRecordSearchParams) => void
  onReset: () => void
  loading?: boolean
}

export function TestRecordSearch({ onSearch, onReset, loading }: TestRecordSearchProps) {
  const [searchForm, setSearchForm] = useState<TestRecordSearchParams>({
    customerId: "204997" // 默认值
  })

  const handleInputChange = (field: keyof TestRecordSearchParams, value: string) => {
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
              <SelectItem value="上海**银行商业银行">上海**银行商业银行</SelectItem>
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

      {/* 第2排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="customerIdCard">客户身份证</Label>
          <Input
            id="customerIdCard"
            value={searchForm.customerIdCard || ""}
            onChange={(e) => handleInputChange("customerIdCard", e.target.value)}
            placeholder="请输入客户身份证"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="processingResult">处理结果</Label>
          <Select 
            value={searchForm.processingResult || ""} 
            onValueChange={(value) => handleInputChange("processingResult", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择处理结果" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="正常">正常</SelectItem>
              <SelectItem value="异常">异常</SelectItem>
              <SelectItem value="待处理">待处理</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanType">贷款类型</Label>
          <Select 
            value={searchForm.loanType || ""} 
            onValueChange={(value) => handleInputChange("loanType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择贷款类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="担保类">担保类</SelectItem>
              <SelectItem value="信用类">信用类</SelectItem>
              <SelectItem value="抵押类">抵押类</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanSubtype">贷款子类型</Label>
          <Select 
            value={searchForm.loanSubtype || ""} 
            onValueChange={(value) => handleInputChange("loanSubtype", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择贷款子类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="信用类-消费贷现金">信用类-消费贷现金</SelectItem>
              <SelectItem value="信用类-经营贷">信用类-经营贷</SelectItem>
              <SelectItem value="担保类-车贷">担保类-车贷</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 第3排 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="channel">渠道</Label>
          <Select 
            value={searchForm.channel || ""} 
            onValueChange={(value) => handleInputChange("channel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择渠道" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="奇瑞车贷-消费">奇瑞车贷-消费</SelectItem>
              <SelectItem value="线上渠道">线上渠道</SelectItem>
              <SelectItem value="线下渠道">线下渠道</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="withdrawalDate">提现日期</Label>
          <Input
            id="withdrawalDate"
            type="date"
            value={searchForm.withdrawalDate || ""}
            onChange={(e) => handleInputChange("withdrawalDate", e.target.value)}
          />
        </div>

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
