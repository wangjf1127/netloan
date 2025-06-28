"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw, Menu, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { CreditAgreementListProps, CreditAgreement } from "../types"
import { useCreditAgreements, useSearchCreditAgreements } from "../hooks/use-credit-applications"
import { CreditAgreementSkeleton } from "./credit-agreement-skeleton"
import { LOAN_SUB_TYPE_OPTIONS } from "@/features/credit-management/types"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { ResponsiveTable } from "@/shared/components/ui/responsive-table"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { useIsMobile } from "../../../../components/ui/use-mobile"

export function CreditAgreementList({ sidebarCollapsed, onToggleSidebar }: CreditAgreementListProps) {
  const [institution, setInstitution] = useState("all")
  const [customerId, setCustomerId] = useState("204997")
  const [customerName, setCustomerName] = useState("时欢-客户名称")
  const [customerIdCard, setCustomerIdCard] = useState("身份证号码-身份证号")
  const [loanType, setLoanType] = useState("担保类-贷款类型")
  const [loanSubType, setLoanSubType] = useState("all")
  const [effectiveDate, setEffectiveDate] = useState("")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedAgreement, setSelectedAgreement] = useState<CreditAgreement | null>(null)

  const isMobile = useIsMobile()
  
  const { data: creditAgreements = [], isLoading, error, refetch } = useCreditAgreements()
  const searchMutation = useSearchCreditAgreements()

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
      customerIdCard,
      loanType: loanType === "all" ? "" : loanType,
      loanSubType: loanSubType === "all" ? "" : loanSubType,
      effectiveDate
    })
  }

  const handleReset = () => {
    setInstitution("all")
    setCustomerId("")
    setCustomerName("")
    setCustomerIdCard("")
    setLoanType("all")
    setLoanSubType("all")
    setEffectiveDate("")
    refetch()
  }

  const handleViewDetail = (agreement: CreditAgreement) => {
    setSelectedAgreement(agreement)
    setIsDetailDialogOpen(true)
  }

  // 表格列配置
  const columns = [
    {
      key: 'institution',
      label: '机构',
      className: 'text-gray-900'
    },
    {
      key: 'productNumber',
      label: '产品号',
      className: 'text-gray-900'
    },
    {
      key: 'loanType',
      label: '贷款类型',
      className: 'text-gray-900'
    },
    {
      key: 'loanSubType',
      label: '贷款子类型',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'customerId',
      label: '客户号',
      className: 'text-gray-900'
    },
    {
      key: 'customerName',
      label: '客户名称',
      className: 'text-gray-900'
    },
    {
      key: 'totalAmount',
      label: '总额度',
      className: 'text-gray-900',
      render: (value: number) => value.toLocaleString()
    },
    {
      key: 'effectiveDate',
      label: '额度生效日期',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'expiryDate',
      label: '额度失效日期',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'actions',
      label: '操作',
      className: 'text-gray-500',
      render: (_: any, agreement: CreditAgreement) => (
        isMobile ? (
          <MobileActionMenu
            actions={[
              {
                label: '查看详情',
                onClick: () => handleViewDetail(agreement)
              }
            ]}
          />
        ) : (
          <button
            onClick={() => handleViewDetail(agreement)}
            className="text-blue-600 hover:text-blue-800"
          >
            查看
          </button>
        )
      )
    }
  ]

  // 移动端卡片渲染函数
  const renderMobileCard = (agreement: CreditAgreement) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{agreement.customerName}</div>
          <div className="text-sm text-gray-600">客户号: {agreement.customerId}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '查看详情',
              onClick: () => handleViewDetail(agreement)
            }
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600">机构:</span>
          <span className="ml-1 text-gray-900">{agreement.institution}</span>
        </div>
        <div>
          <span className="text-gray-600">产品号:</span>
          <span className="ml-1 text-gray-900">{agreement.productNumber}</span>
        </div>
        <div>
          <span className="text-gray-600">贷款类型:</span>
          <span className="ml-1 text-gray-900">{agreement.loanType}</span>
        </div>
        <div>
          <span className="text-gray-600">总额度:</span>
          <span className="ml-1 text-gray-900">{agreement.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )

  // 脱敏处理函数
  const maskSensitiveData = (data: string, type: 'phone' | 'idCard' | 'email' = 'idCard') => {
    if (!data) return data

    switch (type) {
      case 'phone':
        return data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      case 'idCard':
        return data.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
      case 'email':
        const [username, domain] = data.split('@')
        if (username && domain) {
          const maskedUsername = username.length > 2
            ? username.substring(0, 2) + '*'.repeat(username.length - 2)
            : username
          return `${maskedUsername}@${domain}`
        }
        return data
      default:
        return data
    }
  }

  // 显示骨架屏
  if (isInitialLoading) {
    return <CreditAgreementSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "业务查询" },
          { label: "授信协议" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索表单 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第一行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">机构：</label>
            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="授信协议机构" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="上海农村商业银行">上海农村商业银行</SelectItem>
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
            <label className="block text-xs text-gray-700 mb-1">客户名称：</label>
            <Input
              placeholder="请输入客户名称"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第二行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户身份证：</label>
            <Input
              placeholder="请输入客户身份证"
              value={customerIdCard}
              onChange={(e) => setCustomerIdCard(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">贷款类型：</label>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择贷款类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="担保类">担保类</SelectItem>
                <SelectItem value="信用类">信用类</SelectItem>
                <SelectItem value="抵押类">抵押类</SelectItem>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第三行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">额度生效日期：</label>
            <Input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="h-8"
            />
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

      {/* 授信协议列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取授信协议列表失败</div>
        ) : creditAgreements.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无授信协议数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {creditAgreements.map((agreement) => renderMobileCard(agreement))}
          </div>
        ) : (
          // 桌面端表格布局（保持原样）
          <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1400px' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    机构
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    产品号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    贷款类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    贷款子类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    总额度
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    额度生效日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    额度失效日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {creditAgreements.map((agreement) => (
                  <tr key={agreement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.productNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.loanType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.loanSubType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.effectiveDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agreement.expiryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetail(agreement)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页信息 */}
        {creditAgreements.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              共计 <span className="font-medium">{creditAgreements.length}</span> 条
            </div>
            <div className="text-sm text-gray-700">
              当前第 <span className="font-medium">1</span> 页，<span className="font-medium">10</span> 条/页
            </div>
          </div>
        )}
      </div>

      {/* 授信协议信息弹窗 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>授信协议信息</DialogTitle>
          </DialogHeader>
          {selectedAgreement && (
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="text-left">
                <span className="text-sm text-gray-600">客户号:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.customerId}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">客户名称:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.customerName}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">机构:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.institution}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">贷款类型:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.loanType}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">贷款子类型:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.loanSubType}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">产品号:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.productNumber}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">年/月利率标记:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.rateType}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">正常利率(%):</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.normalRate}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">逾期利率(%):</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.overdueRate}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">复利利率(%):</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.compoundRate}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">还款方式:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.repaymentMethod}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">还本周期:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.principalCycle}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">还息周期:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.interestCycle}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">总额度:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.totalAmount.toLocaleString()}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">额度生效日期:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.effectiveDate}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">额度失效日期:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.expiryDate}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">接入渠道:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.accessChannel}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">子渠道:</span>
                <span className="ml-2 text-sm text-gray-900">{selectedAgreement.subChannel || '[空]'}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
