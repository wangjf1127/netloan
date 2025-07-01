"use client"

import { useState, useEffect } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw, Eye, Menu } from "lucide-react"
import Link from "next/link"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { maskSensitiveData } from "@/lib/utils"

import { useCreditApprovals, useSearchCreditApprovals } from "../hooks/use-credit-approval"
import { CreditApprovalSkeleton } from "./credit-approval-skeleton"
import type { CreditApprovalListProps, CreditApproval } from "../types"
import { PRODUCT_OPTIONS, STATUS_OPTIONS } from "../types"

export function CreditApprovalList({ sidebarCollapsed, onToggleSidebar }: CreditApprovalListProps) {
  const [product, setProduct] = useState("all")
  const [creditSerialNumber, setCreditSerialNumber] = useState("")
  const [status, setStatus] = useState("all")
  const [customerId, setCustomerId] = useState("204997")
  const [customerName, setCustomerName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [idCard, setIdCard] = useState("")
  const [applicationTimeStart, setApplicationTimeStart] = useState("")
  const [applicationTimeEnd, setApplicationTimeEnd] = useState("")
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const isMobile = useIsMobile()
  const { data: creditApprovals = [], isLoading, error, refetch } = useCreditApprovals()
  const searchMutation = useSearchCreditApprovals()

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000) // 显示骨架屏1秒钟，模拟加载过程
    
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    searchMutation.mutate({
      product: product === "all" ? "" : product,
      creditSerialNumber,
      status: status === "all" ? "" : status,
      customerId,
      customerName,
      phoneNumber,
      idCard,
      applicationTimeStart,
      applicationTimeEnd
    })
  }

  const handleReset = () => {
    setProduct("all")
    setCreditSerialNumber("")
    setStatus("all")
    setCustomerId("")
    setCustomerName("")
    setPhoneNumber("")
    setIdCard("")
    setApplicationTimeStart("")
    setApplicationTimeEnd("")
    // 重新获取所有数据
    refetch()
  }

  const handleViewDetail = (approval: CreditApproval) => {
    window.location.href = `/risk-control/pre-loan/credit-approval/${approval.id}`
  }

  // 移动端卡片渲染函数
  const renderMobileCard = (approval: CreditApproval) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1 flex-1">
          <div className="font-medium text-blue-600 text-sm">
            {approval.creditSerialNumber}
          </div>
          <div className="text-sm text-gray-900">{approval.product}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '详情',
              icon: <Eye className="h-3 w-3" />,
              onClick: () => handleViewDetail(approval)
            }
          ]}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">客户ID</div>
          <div className="font-medium">{approval.customerId}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">客户姓名</div>
          <div className="font-medium">{maskSensitiveData(approval.customerName, 'name')}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">手机号</div>
          <div className="font-medium">{maskSensitiveData(approval.phoneNumber, 'phone')}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">身份证</div>
          <div className="font-medium">{maskSensitiveData(approval.idCard, 'idCard')}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">申请时间</div>
          <div className="font-medium">{approval.applicationTime}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">授信额度</div>
          <div className="font-medium">{approval.creditAmount.toLocaleString()}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">审核结果</div>
          <div className="font-medium">{approval.reviewResult}</div>
        </div>
      </div>
    </div>
  )

  // 显示骨架屏
  if (isInitialLoading) {
    return <CreditApprovalSkeleton />
  }

  return (
    <div className="flex flex-col h-full">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between mb-4">
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
            <span className="text-gray-900">全流程风险掌控</span>
            <span>/</span>
            <span className="text-gray-900">贷前管理</span>
            <span>/</span>
            <span className="text-gray-900">授信审批</span>
          </div>
        </div>
      </div>

      {/* 搜索表单 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第一行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">产品：</label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="循环贷" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">循环贷</SelectItem>
                {PRODUCT_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">授信流水号：</label>
            <Input
              placeholder=""
              value={creditSerialNumber}
              onChange={(e) => setCreditSerialNumber(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">状态：</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">状态</SelectItem>
                {STATUS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第二行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户ID：</label>
            <Input
              placeholder="204997"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户姓名：</label>
            <Input
              placeholder=""
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户手机号：</label>
            <Input
              placeholder=""
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第三行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">身份证：</label>
            <Input
              placeholder=""
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">申请时间：</label>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="开始日期"
                type="date"
                value={applicationTimeStart}
                onChange={(e) => setApplicationTimeStart(e.target.value)}
                className="h-8"
              />
              <span className="text-gray-500">-</span>
              <Input
                placeholder="结束日期"
                type="date"
                value={applicationTimeEnd}
                onChange={(e) => setApplicationTimeEnd(e.target.value)}
                className="h-8"
              />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <Button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-8"
              disabled={isLoading || searchMutation.isPending}
            >
              <Search className="mr-2 h-3 w-3" />
              查询
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="px-4 h-8"
              disabled={isLoading || searchMutation.isPending}
            >
              <RotateCcw className="mr-2 h-3 w-3" />
              重置
            </Button>
          </div>
        </div>
      </div>

      {/* 授信审批列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取授信审批列表失败</div>
        ) : creditApprovals.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无授信审批数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {creditApprovals.map((approval) => (
              <div key={approval.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                {renderMobileCard(approval)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端表格布局（保持原样）
          <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1400px' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    授信流水号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    产品
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户姓名
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    手机号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    身份证
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申请时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    授信额度
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    审核结果
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {creditApprovals.map((approval) => (
                  <tr key={approval.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {approval.creditSerialNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {approval.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {approval.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maskSensitiveData(approval.customerName, 'name')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {maskSensitiveData(approval.phoneNumber, 'phone')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {maskSensitiveData(approval.idCard, 'idCard')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {approval.applicationTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {approval.creditAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {approval.reviewResult}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleViewDetail(approval)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        详情
                      </button>
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
