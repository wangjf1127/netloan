"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Badge } from "@/shared/components/ui/badge"
import { Search, RotateCcw, Menu, Eye, FileText, Download } from "lucide-react"
import type { CreditLedgerListProps } from "../types"
import {
  LEDGER_STATUS_OPTIONS,
  LOAN_TYPE_OPTIONS,
  LOAN_SUB_TYPE_OPTIONS,
  CREDIT_TYPE_OPTIONS,
  INSTITUTION_OPTIONS
} from "../types"
import { useCreditLedger, useSearchCreditLedger } from "../hooks/use-credit-ledger"
import { CreditLedgerSkeleton } from "./credit-ledger-skeleton"

export function CreditLedgerList({ sidebarCollapsed, onToggleSidebar }: CreditLedgerListProps) {
  const [institution, setInstitution] = useState("all")
  const [customerId, setCustomerId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerIdCard, setCustomerIdCard] = useState("")
  const [ledgerStatus, setLedgerStatus] = useState("all")
  const [loanType, setLoanType] = useState("all")
  const [loanSubType, setLoanSubType] = useState("all")
  const [creditType, setCreditType] = useState("all")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  
  const { data: creditLedger = [], isLoading, error, refetch } = useCreditLedger()
  const searchMutation = useSearchCreditLedger()

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000) // 显示骨架屏1秒钟，模拟加载过程
    
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    searchMutation.mutate({
      institution: institution === "all" ? "" : institution,
      customerId,
      customerName,
      customerPhone,
      customerIdCard,
      ledgerStatus: ledgerStatus === "all" ? "" : ledgerStatus,
      loanType: loanType === "all" ? "" : loanType,
      loanSubType: loanSubType === "all" ? "" : loanSubType,
      creditType: creditType === "all" ? "" : creditType
    })
  }

  const handleReset = () => {
    setInstitution("all")
    setCustomerId("")
    setCustomerName("")
    setCustomerPhone("")
    setCustomerIdCard("")
    setLedgerStatus("all")
    setLoanType("all")
    setLoanSubType("all")
    setCreditType("all")
    // 重新获取所有数据
    refetch()
  }



  // 显示骨架屏
  if (isInitialLoading) {
    return <CreditLedgerSkeleton />
  }

  // 格式化金额
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2
    }).format(amount)
  }

  // 格式化利率
  const formatRate = (rate: number) => {
    return `${rate.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>首页</span>
            <span>/</span>
            <span>额度管理</span>
            <span>/</span>
            <span className="text-gray-900">额度台账</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">管</span>
          </div>
        </div>
      </div>

      {/* 搜索区域 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-700 mb-1">机构：</label>
            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择机构" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {INSTITUTION_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户ID：</label>
            <Input
              placeholder="请输入客户ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户姓名：</label>
            <Input
              placeholder="请输入客户姓名"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户手机号：</label>
            <Input
              placeholder="请输入客户手机号"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户身份证号：</label>
            <Input
              placeholder="请输入客户身份证号"
              value={customerIdCard}
              onChange={(e) => setCustomerIdCard(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">台账状态：</label>
            <Select value={ledgerStatus} onValueChange={setLedgerStatus}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择台账状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {LEDGER_STATUS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">贷款类型：</label>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择贷款类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {LOAN_TYPE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">贷款子类型：</label>
            <Select value={loanSubType} onValueChange={setLoanSubType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择贷款子类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {LOAN_SUB_TYPE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">授信类型：</label>
            <Select value={creditType} onValueChange={setCreditType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择授信类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {CREDIT_TYPE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            重置
          </Button>
          <Button
            size="sm"
            onClick={handleSearch}
            className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={searchMutation.isPending}
          >
            <Search className="h-3 w-3 mr-1" />
            查询
          </Button>
        </div>
      </div>

      {/* 额度台账列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取额度台账失败</div>
        ) : creditLedger.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无额度台账数据</div>
        ) : (
          <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1800px' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    机构
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户姓名
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    产品编号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    贷款类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    授信类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    额度总额
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    可用额度
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用信金额
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    年/月利率标识
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    正常利率(%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    逾期利率(%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    复利利率(%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    还款方式
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    额度状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    台账状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    额度起始日
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    额度到期日
                  </th>
                  {/* 操作列固定在右侧，带层叠效果 */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-gray-300/20 to-gray-50 pointer-events-none -ml-4"></div>
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {creditLedger.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.productNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.loanType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.creditType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500 font-medium">
                      {formatAmount(item.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500 font-medium">
                      {formatAmount(item.availableAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500 font-medium">
                      {formatAmount(item.usedAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.rateType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRate(item.normalRate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRate(item.overdueRate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRate(item.compoundRate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.repaymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={item.creditStatus === '有效' ? 'success' : 'secondary'}
                      >
                        {item.creditStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          item.ledgerStatus === '有效'
                            ? 'success'
                            : item.ledgerStatus === '冻结'
                            ? 'warning'
                            : item.ledgerStatus === '过期'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {item.ledgerStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.effectiveDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.expiryDate}
                    </td>
                    {/* 操作列固定在右侧，带层叠效果 */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 sticky right-0 bg-white z-10 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-gray-300/25 to-white pointer-events-none -ml-4"></div>
                      <div className="flex space-x-2">
                        <Link href={`/credit-management/ledger/${item.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            查看
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          开具结清证明
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          下载结清证明
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
