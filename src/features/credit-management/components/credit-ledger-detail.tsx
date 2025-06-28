"use client"

import { useState, useEffect } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Menu, Search, RotateCcw, Eye, X } from "lucide-react"
import Link from "next/link"
import type { CreditLedgerDetailProps } from "../types"
import { useCreditLedgerDetail } from "../hooks/use-credit-ledger"

// 提现信息类型定义
interface WithdrawalInfo {
  businessNumber: string
  transactionAmount: string
  customerId: string
  transactionType: string
  processingResult: string
  institution: string
  transactionDate: string
  productNumber: string
  receiptNumber: string
}

export function CreditLedgerDetail({ creditId }: CreditLedgerDetailProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("basic")
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalInfo | null>(null)

  const { data: creditDetail, isLoading, error } = useCreditLedgerDetail(creditId)

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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

  // 处理查看提现信息
  const handleViewWithdrawal = (transactionData: any) => {
    // 根据图片内容创建提现信息数据
    const withdrawalInfo: WithdrawalInfo = {
      businessNumber: "202904293671779408114476640",
      transactionAmount: "10.00",
      customerId: "264997",
      transactionType: "提现",
      processingResult: "正常",
      institution: "上海农村商业银行",
      transactionDate: "2029-04-29",
      productNumber: "PROD0000004500022",
      receiptNumber: "9990000033671779408280092672000"
    }

    setSelectedWithdrawal(withdrawalInfo)
    setIsWithdrawalDialogOpen(true)
  }

  if (isInitialLoading || isLoading) {
    return (
      <div className="space-y-6">
        {/* 骨架屏 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 p-4">
            <div className="flex space-x-4">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !creditDetail) {
    return (
      <div className="space-y-6">
        {/* 面包屑导航 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>额度管理</span>
              <span>/</span>
              <span>额度台账</span>
              <span>/</span>
              <span className="text-gray-900">详情</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/credit-management/ledger" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-center text-red-500">
            {error ? '获取额度台账详情失败' : '额度台账不存在'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm lg:text-base text-gray-600">
            <span>额度管理</span>
            <span>/</span>
            <span>额度台账</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">详情</span>
          </div>
        </div>
        <div className="flex items-center">
          <Link
            href="/credit-management/ledger"
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm lg:text-base"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            返回
          </Link>
        </div>
      </div>

      {/* 详情内容 */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* 标签页导航 */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "basic"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              基本信息
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "records"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              交易记录
            </button>
          </div>
        </div>

        {/* 标签页内容 */}
        <div className="p-3 sm:p-4 lg:p-6">
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">合同编号:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">{creditDetail.id}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">客户名称:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">{creditDetail.customerName}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">证件类型:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">身份证</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">证件号码:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">320***************</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">额度总额:</span>
                  <span className="text-sm sm:text-base text-gray-900 font-semibold mt-1 sm:mt-0">{formatAmount(creditDetail.totalAmount)}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">用信金额:</span>
                  <span className="text-sm sm:text-base text-red-600 font-semibold mt-1 sm:mt-0">{formatAmount(creditDetail.usedAmount)}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">年利率标识:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">年</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">正常利率:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">{formatRate(creditDetail.normalRate)}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">工作单位:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">某某公司</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-700 sm:w-24 lg:w-28">存款类型:</span>
                  <span className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">IMAC</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">客户ID:</span>
                  <span className="text-sm text-gray-900">{creditDetail.customerId}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">产品编号:</span>
                  <span className="text-sm text-gray-900">{creditDetail.productNumber}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">授信产品:</span>
                  <span className="text-sm text-gray-900">{creditDetail.creditType}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">额度状态:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    creditDetail.creditStatus === '有效'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {creditDetail.creditStatus}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">台账状态:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    creditDetail.ledgerStatus === '有效'
                      ? 'bg-green-100 text-green-800'
                      : creditDetail.ledgerStatus === '冻结'
                      ? 'bg-yellow-100 text-yellow-800'
                      : creditDetail.ledgerStatus === '过期'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {creditDetail.ledgerStatus}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">月利率标识:</span>
                  <span className="text-sm text-gray-900">月</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">授信日期:</span>
                  <span className="text-sm text-gray-900">{creditDetail.effectiveDate}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">到期日期:</span>
                  <span className="text-sm text-gray-900">{creditDetail.expiryDate}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">市/县/区域:</span>
                  <span className="text-sm text-gray-900">上海市-浦东新区</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-24">记录类型:</span>
                  <span className="text-sm text-gray-900">IMAC</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div className="space-y-4">
              {/* 查询条件 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">机构</label>
                  <Select defaultValue="00004">
                    <SelectTrigger className="h-8 sm:h-10">
                      <SelectValue placeholder="请选择机构" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="00004">00004-上海农村商业银行</SelectItem>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">处理结果</label>
                  <Select>
                    <SelectTrigger className="h-8 sm:h-10">
                      <SelectValue placeholder="请选择处理结果" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">正常</SelectItem>
                      <SelectItem value="abnormal">异常</SelectItem>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1 h-8 sm:h-10 text-xs sm:text-sm">
                    <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    查询
                  </Button>
                  <Button variant="outline" className="flex-1 h-8 sm:h-10 text-xs sm:text-sm">
                    <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    重置
                  </Button>
                </div>
              </div>

              {/* 交易记录表格 - 桌面端和平板端 */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客户ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品号</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">贷款类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">贷款子类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易金额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">处理结果</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">机构</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易日期</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">提取</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">204567</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PRD000000450002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">担保类</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">信用类-消费贷款</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          正常
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">上海农村商业银行</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-04-20</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          onClick={() => handleViewWithdrawal({})}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          查看
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">提取</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">204567</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PRD000000450002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">担保类</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">信用类-消费贷款</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          正常
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">上海农村商业银行</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-05-28</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          onClick={() => handleViewWithdrawal({})}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          查看
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">提取</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">204567</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PRD000000450002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">担保类</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">信用类-消费贷款</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          正常
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">上海农村商业银行</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-08-08</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          onClick={() => handleViewWithdrawal({})}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          查看
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 交易记录卡片 - 移动端 */}
              <div className="md:hidden space-y-3 sm:space-y-4">
                {/* 交易记录1 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm sm:text-base font-medium text-gray-900">提取</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        正常
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 h-auto text-xs sm:text-sm"
                      onClick={() => handleViewWithdrawal({})}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      查看
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">客户ID:</span>
                      <span className="text-gray-900 sm:ml-1">204567</span>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">交易金额:</span>
                      <span className="text-gray-900 sm:ml-1 font-medium">10000</span>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">贷款类型:</span>
                      <span className="text-gray-900 sm:ml-1">担保类</span>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-500">交易日期:</span>
                      <span className="text-gray-900 sm:ml-1">2025-04-20</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm flex justify-between sm:block">
                    <span className="text-gray-500">产品号:</span>
                    <span className="text-gray-900 sm:ml-1 text-right sm:text-left">PRD000000450002</span>
                  </div>
                </div>

                {/* 交易记录2 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">提取</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        正常
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                      onClick={() => handleViewWithdrawal({})}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      查看
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">客户ID:</span>
                      <span className="text-gray-900 ml-1">204567</span>
                    </div>
                    <div>
                      <span className="text-gray-500">交易金额:</span>
                      <span className="text-gray-900 ml-1">10000</span>
                    </div>
                    <div>
                      <span className="text-gray-500">贷款类型:</span>
                      <span className="text-gray-900 ml-1">担保类</span>
                    </div>
                    <div>
                      <span className="text-gray-500">交易日期:</span>
                      <span className="text-gray-900 ml-1">2025-05-28</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">产品号:</span>
                    <span className="text-gray-900 ml-1">PRD000000450002</span>
                  </div>
                </div>

                {/* 交易记录3 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">提取</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        正常
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                      onClick={() => handleViewWithdrawal({})}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      查看
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">客户ID:</span>
                      <span className="text-gray-900 ml-1">204567</span>
                    </div>
                    <div>
                      <span className="text-gray-500">交易金额:</span>
                      <span className="text-gray-900 ml-1">10000</span>
                    </div>
                    <div>
                      <span className="text-gray-500">贷款类型:</span>
                      <span className="text-gray-900 ml-1">担保类</span>
                    </div>
                    <div>
                      <span className="text-gray-500">交易日期:</span>
                      <span className="text-gray-900 ml-1">2025-08-08</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">产品号:</span>
                    <span className="text-gray-900 ml-1">PRD000000450002</span>
                  </div>
                </div>
              </div>

              {/* 分页信息 */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="text-xs sm:text-sm text-gray-700">
                  共计 <span className="font-medium">3</span> 条记录
                </div>
                <div className="text-xs sm:text-sm text-gray-700">
                  每页显示 <span className="font-medium">10</span> 条
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 提现信息弹窗 */}
      <Dialog open={isWithdrawalDialogOpen} onOpenChange={setIsWithdrawalDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium mb-4">提现信息</DialogTitle>
          </DialogHeader>

          {selectedWithdrawal && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">业务编号:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.businessNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">借据号:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.receiptNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">交易金额:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.transactionAmount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">客户ID:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.customerId}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">交易类型:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.transactionType}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">处理结果:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.processingResult}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">机构:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.institution}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">交易日期:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.transactionDate}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">产品编号:</span>
                  <span className="text-gray-900 font-medium">{selectedWithdrawal.productNumber}</span>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsWithdrawalDialogOpen(false)}
                  className="px-8"
                >
                  确定
                </Button>
              </div>
            </div>
          )}

          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setIsWithdrawalDialogOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
