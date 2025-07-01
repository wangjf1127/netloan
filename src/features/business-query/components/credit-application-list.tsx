"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw, Menu, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { CreditApplicationListProps, CreditApplication } from "../types"
import { useCreditApplications, useSearchCreditApplications } from "../hooks/use-credit-applications"
import { CreditApplicationSkeleton } from "./credit-application-skeleton"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { ResponsiveTable } from "@/shared/components/ui/responsive-table"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { maskSensitiveData } from "@/lib/utils"

export function CreditApplicationList({ sidebarCollapsed, onToggleSidebar }: CreditApplicationListProps) {
  const [institution, setInstitution] = useState("all")
  const [customerId, setCustomerId] = useState("204997")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerIdCard, setCustomerIdCard] = useState("")
  const [loanType, setLoanType] = useState("all")
  const [loanSubType, setLoanSubType] = useState("all")
  const [channel, setChannel] = useState("all")
  const [applicationDate, setApplicationDate] = useState("")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<CreditApplication | null>(null)

  const isMobile = useIsMobile()
  const { data: creditApplications = [], isLoading, error, refetch } = useCreditApplications()
  const searchMutation = useSearchCreditApplications()

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
      customerPhone,
      customerName,
      customerIdCard,
      loanType: loanType === "all" ? "" : loanType,
      loanSubType: loanSubType === "all" ? "" : loanSubType,
      channel: channel === "all" ? "" : channel,
      applicationDate
    })
  }

  const handleReset = () => {
    setInstitution("all")
    setCustomerId("")
    setCustomerPhone("")
    setCustomerName("")
    setCustomerIdCard("")
    setLoanType("all")
    setLoanSubType("all")
    setChannel("all")
    setApplicationDate("")
    // 重新获取所有数据
    refetch()
  }

  // 处理查看详情
  const handleViewDetail = (application: CreditApplication) => {
    setSelectedApplication(application)
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
      key: 'businessChannel',
      label: '业务渠道',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'subBusinessChannel',
      label: '子业务渠道',
      className: 'text-gray-900',
      mobileHidden: true
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
      label: '客户ID',
      className: 'text-gray-900'
    },
    {
      key: 'customerName',
      label: '客户名称',
      className: 'text-gray-900'
    },
    {
      key: 'certificateType',
      label: '证件类型',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'certificateNumber',
      label: '证件号码',
      className: 'text-gray-900',
      render: (value: string) => maskSensitiveData(value, 'idCard'),
      mobileHidden: true
    },
    {
      key: 'currency',
      label: '币种',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'applicationDate',
      label: '申请日期',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'actions',
      label: '操作',
      className: 'text-gray-500',
      render: (_: any, application: CreditApplication) => (
        isMobile ? (
          <MobileActionMenu
            actions={[
              {
                label: '查看详情',
                onClick: () => handleViewDetail(application)
              }
            ]}
          />
        ) : (
          <button
            onClick={() => handleViewDetail(application)}
            className="text-blue-600 hover:text-blue-800"
          >
            查看
          </button>
        )
      )
    }
  ]

  // 移动端卡片渲染函数
  const renderMobileCard = (application: CreditApplication) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{maskSensitiveData(application.customerName, 'name')}</div>
          <div className="text-sm text-gray-600">客户ID: {application.customerId}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '查看详情',
              onClick: () => handleViewDetail(application)
            }
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600">机构:</span>
          <span className="ml-1 text-gray-900">{application.institution}</span>
        </div>
        <div>
          <span className="text-gray-600">产品号:</span>
          <span className="ml-1 text-gray-900">{application.productNumber}</span>
        </div>
        <div>
          <span className="text-gray-600">贷款类型:</span>
          <span className="ml-1 text-gray-900">{application.loanType}</span>
        </div>
        <div>
          <span className="text-gray-600">币种:</span>
          <span className="ml-1 text-gray-900">{application.currency}</span>
        </div>
      </div>
    </div>
  )



  // 显示骨架屏
  if (isInitialLoading) {
    return <CreditApplicationSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "业务查询" },
          { label: "授信申请" }
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
                <SelectValue placeholder="请选择机构" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="上海**银行商业银行">上海**银行商业银行</SelectItem>
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
            <label className="block text-xs text-gray-700 mb-1">客户手机号：</label>
            <Input
              placeholder="请输入客户手机号"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="h-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第二行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户名称：</label>
            <Input
              placeholder="请输入客户名称"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-8"
            />
          </div>
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
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第三行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">贷款子类型：</label>
            <Select value={loanSubType} onValueChange={setLoanSubType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择贷款子类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="信用类-消费贷现金">信用类-消费贷现金</SelectItem>
                <SelectItem value="担保类-车贷">担保类-车贷</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">渠道：</label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择渠道" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="奇瑞车贷">奇瑞车贷</SelectItem>
                <SelectItem value="线上渠道">线上渠道</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">申请日期：</label>
            <Input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
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

      {/* 授信申请列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取授信申请列表失败</div>
        ) : creditApplications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无授信申请数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {creditApplications.map((application) => renderMobileCard(application))}
          </div>
        ) : (
          // 桌面端表格布局（保持原样）
          <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1600px' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    机构
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    产品编号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    业务渠道
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    子业务渠道
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    贷款类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    贷款子类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    证件类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    证件号码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    币种
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申请日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {creditApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.productNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.businessChannel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.subBusinessChannel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.loanType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.loanSubType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.certificateType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.certificateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.applicationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetail(application)}
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
      </div>

      {/* 授信申请信息弹窗 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className={`max-h-[90vh] overflow-y-auto ${isMobile ? 'max-w-[95vw] w-[95vw]' : 'max-w-4xl'}`}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium mb-4">授信申请信息</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4">
              {isMobile ? (
                // 移动端优化布局
                <div className="space-y-4">
                  {/* 长字段 - 单行显示 */}
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">申请流水号:</span>
                      <span className="text-gray-900 font-medium text-sm break-all">202506253671779267034808320</span>
                    </div>
                  </div>

                  {/* 短字段 - 双列布局 */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">机构:</span>
                      <span className="text-gray-900 font-medium">00000045</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">客户号:</span>
                      <span className="text-gray-900 font-medium">{selectedApplication.customerId}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">客户名称:</span>
                      <span className="text-gray-900 font-medium">{maskSensitiveData(selectedApplication.customerName, 'name')}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">产品号:</span>
                      <span className="text-gray-900 font-medium">{selectedApplication.productNumber}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">贷款类型:</span>
                      <span className="text-gray-900 font-medium">{selectedApplication.loanType}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">贷款子类型:</span>
                      <span className="text-gray-900 font-medium">{selectedApplication.loanSubType}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">证件类型:</span>
                      <span className="text-gray-900 font-medium">{selectedApplication.certificateType}</span>
                    </div>
                  </div>

                  {/* 中等长度字段 - 单行显示 */}
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">证件号码:</span>
                      <span className="text-gray-900 font-medium text-sm">{maskSensitiveData(selectedApplication.certificateNumber, 'idCard')}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">业务渠道:</span>
                      <span className="text-gray-900 font-medium text-sm">{selectedApplication.businessChannel}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">子业务渠道:</span>
                      <span className="text-gray-900 font-medium text-sm">{selectedApplication.subBusinessChannel || '-'}</span>
                    </div>
                  </div>

                  {/* 其他短字段 - 双列布局 */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">币种:</span>
                      <span className="text-gray-900 font-medium">{selectedApplication.currency}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">申请人学历:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">销售员姓名:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">销售员手机:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">申请人所在省:</span>
                      <span className="text-gray-900 font-medium">310000</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">申请人所在市:</span>
                      <span className="text-gray-900 font-medium">310000</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">申请人所在区县:</span>
                      <span className="text-gray-900 font-medium">310115</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">公司所在市:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">公司所在区县:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">申请人行职业:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>
                  </div>

                  {/* 长字段 - 单行显示 */}
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">申请人邮箱地址:</span>
                      <span className="text-gray-900 font-medium text-sm break-all">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">申请人所在详细地址:</span>
                      <span className="text-gray-900 font-medium text-sm">上海市普陀区江桥路***弄*号</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">申请人公司名称:</span>
                      <span className="text-gray-900 font-medium text-sm">新希望金融科技有限公司</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500 text-sm">公司详细地址:</span>
                      <span className="text-gray-900 font-medium text-sm">-</span>
                    </div>
                  </div>

                  {/* 联系人信息 - 双列布局 */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">申请人公司所在省:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">联系人1关系:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">联系人1姓名:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">联系人1手机号:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">联系人2关系:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">联系人2姓名:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-500">联系人2手机号:</span>
                      <span className="text-gray-900 font-medium">-</span>
                    </div>
                  </div>
                </div>
              ) : (
                // 桌面端保持原有三列布局
                <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-sm">
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-500">申请流水号:</span>
                    <span className="text-gray-900 font-medium">202506253671779267034808320</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">机构:</span>
                    <span className="text-gray-900 font-medium">00000045</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">客户号:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.customerId}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">客户名称:</span>
                    <span className="text-gray-900 font-medium">{maskSensitiveData(selectedApplication.customerName, 'name')}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">产品号:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.productNumber}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">贷款类型:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.loanType}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">贷款子类型:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.loanSubType}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">证件类型:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.certificateType}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">证件号码:</span>
                    <span className="text-gray-900 font-medium">{maskSensitiveData(selectedApplication.certificateNumber, 'idCard')}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">币种:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.currency}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">业务渠道:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.businessChannel}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">子业务渠道:</span>
                    <span className="text-gray-900 font-medium">{selectedApplication.subBusinessChannel || '-'}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">申请人邮箱地址:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">销售员姓名:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">销售员手机:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">申请人所在省:</span>
                    <span className="text-gray-900 font-medium">310000</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">申请人所在市:</span>
                    <span className="text-gray-900 font-medium">310000</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">申请人所在区县:</span>
                    <span className="text-gray-900 font-medium">310115</span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-500">申请人所在详细地址:</span>
                    <span className="text-gray-900 font-medium">上海市普陀区江桥路***弄*号</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">申请人学历:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-500">申请人公司名称:</span>
                    <span className="text-gray-900 font-medium">新希望金融科技有限公司</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">申请人公司所在省:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">公司所在市:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">公司所在区县:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">公司详细地址:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">申请人行职业:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">联系人1关系:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">联系人1姓名:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">联系人1手机号:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">联系人2关系:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">联系人2姓名:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">联系人2手机号:</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailDialogOpen(false)}
                  className="px-8"
                >
                  关闭
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
