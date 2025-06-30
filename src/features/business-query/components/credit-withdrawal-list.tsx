"use client"

import { useState, useEffect } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, RotateCcw } from "lucide-react"
import type { CreditWithdrawalListProps, CreditWithdrawal } from "../types"
import { useCreditWithdrawals, useSearchCreditWithdrawals } from "../hooks/use-credit-withdrawal"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { ResponsiveTable } from "@/shared/components/ui/responsive-table"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { Pagination } from "@/shared/components/ui/pagination"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { maskSensitiveData } from "@/lib/utils"

export function CreditWithdrawalList({ sidebarCollapsed, onToggleSidebar }: CreditWithdrawalListProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [institution, setInstitution] = useState("all")
  const [customerId, setCustomerId] = useState("204997") // 默认值
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerIdCard, setCustomerIdCard] = useState("")
  const [processingResult, setProcessingResult] = useState("all")
  const [loanType, setLoanType] = useState("all")
  const [loanSubtype, setLoanSubtype] = useState("all")
  const [channel, setChannel] = useState("all")
  const [withdrawalDate, setWithdrawalDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<CreditWithdrawal | null>(null)

  const isMobile = useIsMobile()
  const { data: creditWithdrawals = [], isLoading, error, refetch } = useCreditWithdrawals()
  const searchMutation = useSearchCreditWithdrawals()

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    searchMutation.mutate({
      institution: institution === "all" ? "" : institution,
      customerId,
      customerName,
      customerPhone,
      customerIdCard,
      processingResult: processingResult === "all" ? "" : processingResult,
      loanType: loanType === "all" ? "" : loanType,
      loanSubtype: loanSubtype === "all" ? "" : loanSubtype,
      channel: channel === "all" ? "" : channel,
      withdrawalDate
    })
  }

  const handleReset = () => {
    setInstitution("all")
    setCustomerId("204997")
    setCustomerName("")
    setCustomerPhone("")
    setCustomerIdCard("")
    setProcessingResult("all")
    setLoanType("all")
    setLoanSubtype("all")
    setChannel("all")
    setWithdrawalDate("")
    setCurrentPage(1)
    refetch()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }

  const handleViewDetail = (withdrawal: CreditWithdrawal) => {
    setSelectedWithdrawal(withdrawal)
    setIsDetailDialogOpen(true)
  }

  // 计算分页数据
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedWithdrawals = creditWithdrawals.slice(startIndex, endIndex)

  // 显示骨架屏
  if (isInitialLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 移动端卡片渲染函数
  const renderMobileCard = (withdrawal: CreditWithdrawal) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium text-blue-600">{withdrawal.customerId}</div>
          <div className="text-sm text-gray-900">{withdrawal.institution}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '查看',
              onClick: () => handleViewDetail(withdrawal)
            }
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">贷款类型:</span>
          <span className="text-gray-900 ml-1">{withdrawal.loanType}</span>
        </div>
        <div>
          <span className="text-gray-500">贷款子类型:</span>
          <span className="text-gray-900 ml-1">{withdrawal.loanSubtype}</span>
        </div>
        <div>
          <span className="text-gray-500">业务渠道:</span>
          <span className="text-gray-900 ml-1">{withdrawal.businessChannel}</span>
        </div>
        <div>
          <span className="text-gray-500">提现金额:</span>
          <span className="text-gray-900 ml-1">{withdrawal.withdrawalAmount.toLocaleString()}元</span>
        </div>
        <div>
          <span className="text-gray-500">提现日期:</span>
          <span className="text-gray-900 ml-1">{withdrawal.withdrawalDate}</span>
        </div>
        <div>
          <span className="text-gray-500">处理结果:</span>
          <span className={`ml-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            withdrawal.processingResult === '正常' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {withdrawal.processingResult}
          </span>
        </div>
      </div>
    </div>
  )

  // 表格列定义
  const columns = [
    {
      key: 'customerId',
      label: '客户ID',
      className: 'text-blue-600',
      mobileHidden: true
    },
    {
      key: 'institution',
      label: '机构',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'loanType',
      label: '贷款类型',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'loanSubtype',
      label: '贷款子类型',
      className: 'text-gray-900',
      mobileHidden: true
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
      render: (value: string) => value || '-',
      mobileHidden: true
    },
    {
      key: 'loanPurpose',
      label: '贷款用途',
      className: 'text-gray-900',
      render: (value: string) => value || '-',
      mobileHidden: true
    },
    {
      key: 'withdrawalAmount',
      label: '提现金额(元)',
      className: 'text-gray-900',
      render: (value: number) => value.toLocaleString(),
      mobileHidden: true
    },
    {
      key: 'withdrawalDate',
      label: '提现日期',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'processingResult',
      label: '处理结果',
      className: 'text-gray-900',
      render: (value: string) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === '正常' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
      mobileHidden: true
    },
    {
      key: 'remainingDays',
      label: '还剩日',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'actions',
      label: '操作',
      className: 'text-gray-500',
      render: (_: any, withdrawal: CreditWithdrawal) => (
        isMobile ? (
          <MobileActionMenu
            actions={[
              {
                label: '查看',
                onClick: () => handleViewDetail(withdrawal)
              }
            ]}
          />
        ) : (
          <button
            onClick={() => handleViewDetail(withdrawal)}
            className="text-blue-600 hover:text-blue-800"
          >
            查看
          </button>
        )
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "业务查询" },
          { label: "额度提现" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索表单 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* 第1排 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">机构</label>
            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="请选择机构" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="上海**银行商业银行">上海**银行商业银行</SelectItem>
                <SelectItem value="中国工商银行">中国工商银行</SelectItem>
                <SelectItem value="中国建设银行">中国建设银行</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">客户ID</label>
            <Input
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="204997"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">客户姓名</label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="请输入客户姓名"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">客户手机号</label>
            <Input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="请输入客户手机号"
            />
          </div>
        </div>

        {/* 第2排 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">客户身份证</label>
            <Input
              value={customerIdCard}
              onChange={(e) => setCustomerIdCard(e.target.value)}
              placeholder="请输入客户身份证"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">处理结果</label>
            <Select value={processingResult} onValueChange={setProcessingResult}>
              <SelectTrigger>
                <SelectValue placeholder="请选择处理结果" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="正常">正常</SelectItem>
                <SelectItem value="异常">异常</SelectItem>
                <SelectItem value="待处理">待处理</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">贷款类型</label>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">贷款子类型</label>
            <Select value={loanSubtype} onValueChange={setLoanSubtype}>
              <SelectTrigger>
                <SelectValue placeholder="请选择贷款子类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="信用类-消费贷现金">信用类-消费贷现金</SelectItem>
                <SelectItem value="信用类-经营贷款">信用类-经营贷款</SelectItem>
                <SelectItem value="抵押类-住房贷款">抵押类-住房贷款</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 第3排 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">渠道</label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger>
                <SelectValue placeholder="请选择渠道" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="奇瑞车贷-消费">奇瑞车贷-消费</SelectItem>
                <SelectItem value="线上渠道">线上渠道</SelectItem>
                <SelectItem value="线下渠道">线下渠道</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">提现日期</label>
            <Input
              type="date"
              value={withdrawalDate}
              onChange={(e) => setWithdrawalDate(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleSearch}
              disabled={searchMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              查询
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={searchMutation.isPending}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重置
            </Button>
          </div>
        </div>
      </div>

      {/* 额度提现列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取额度提现列表失败</div>
        ) : creditWithdrawals.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无额度提现数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {paginatedWithdrawals.map((withdrawal) => (
              <div key={withdrawal.id}>
                {renderMobileCard(withdrawal)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端表格布局
          <ResponsiveTable
            columns={columns}
            data={paginatedWithdrawals}
            keyField="id"
            className="min-h-[400px]"
          />
        )}

        {/* 分页组件 */}
        {creditWithdrawals.length > 0 && (
          <Pagination
            total={creditWithdrawals.length}
            current={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>

      {/* 额度提现信息弹窗 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-7xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>额度提现信息</DialogTitle>
          </DialogHeader>
          {selectedWithdrawal && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-x-12 gap-y-4">
                <div className="text-left">
                  <span className="text-gray-600">机构:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.institutionCode}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">客户号:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.customerId}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">客户名称:</span>
                  <span className="ml-2 text-gray-900">{maskSensitiveData(selectedWithdrawal.customerName, 'name')}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">贷款类型:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.loanType}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">贷款子类型:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.loanSubtype}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">借据号:</span>
                  <span className="ml-2 text-gray-900 whitespace-nowrap">{selectedWithdrawal.loanNumber}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">申请金额:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.applicationAmount.toLocaleString()}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">贷款投向:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.loanDirection || '-'}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">还款方式:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.repaymentMethod}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">贷款用途:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.loanPurpose || '-'}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">还款日:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.repaymentDay}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">贷款账号:</span>
                  <span className="ml-2 text-gray-900 whitespace-nowrap">{selectedWithdrawal.loanAccount}</span>
                </div>

                <div className="text-left">
                  <span className="text-gray-600">处理结果:</span>
                  <span className="ml-2 text-gray-900">{selectedWithdrawal.processingResult}</span>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-gray-200">
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
