"use client"

import { useState, useEffect } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, RotateCcw } from "lucide-react"
import type { LoanContractListProps, LoanContract } from "../types"
import { useLoanContracts, useSearchLoanContracts } from "../hooks/use-credit-applications"
import { LoanContractSkeleton } from "./loan-contract-skeleton"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { ResponsiveTable } from "@/shared/components/ui/responsive-table"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { Pagination } from "@/shared/components/ui/pagination"
import { useIsMobile } from "../../../../components/ui/use-mobile"

export function LoanContractList({ sidebarCollapsed, onToggleSidebar }: LoanContractListProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // 搜索状态
  const [institution, setInstitution] = useState("all")
  const [customerId, setCustomerId] = useState("204997")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerIdCard, setCustomerIdCard] = useState("")
  const [materialType, setMaterialType] = useState("all")

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 弹窗状态
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<LoanContract | null>(null)

  const isMobile = useIsMobile()
  const { data: loanContracts = [], isLoading, error, refetch } = useLoanContracts()
  const searchMutation = useSearchLoanContracts()

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
      materialType: materialType === "all" ? "" : materialType,
    })
  }

  const handleReset = () => {
    setInstitution("all")
    setCustomerId("")
    setCustomerName("")
    setCustomerPhone("")
    setCustomerIdCard("")
    setMaterialType("all")
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

  const handleViewDetail = (contract: LoanContract) => {
    setSelectedContract(contract)
    setIsDetailDialogOpen(true)
  }

  // 计算分页数据
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedContracts = loanContracts.slice(startIndex, endIndex)

  // 显示骨架屏
  if (isInitialLoading) {
    return <LoanContractSkeleton />
  }

  // 移动端卡片渲染
  const renderMobileCard = (contract: LoanContract) => (
    <div key={contract.id} className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">客户ID:</span>
          <span className="text-sm text-gray-900 text-right">{contract.customerId}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">机构:</span>
          <span className="text-sm text-gray-900 text-right">{contract.institution}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">资料类型:</span>
          <span className="text-sm text-gray-900 text-right">{contract.materialType}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">电签系统合同编号:</span>
          <span className="text-sm text-gray-900 text-right">{contract.contractNumber}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">合同类型:</span>
          <span className="text-sm text-gray-900 text-right">{contract.contractType}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-600">合同名称:</span>
          <span className="text-sm text-gray-900 text-right">{contract.contractName}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-600">操作:</span>
          <MobileActionMenu
            actions={[
              {
                label: '查看',
                onClick: () => handleViewDetail(contract)
              }
            ]}
          />
        </div>
      </div>
    </div>
  )

  // 表格列定义
  const columns = [
    {
      key: 'customerId',
      label: '客户ID',
      className: 'text-gray-900',
      mobileHidden: false
    },
    {
      key: 'institution',
      label: '机构',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'materialType',
      label: '资料类型',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'contractNumber',
      label: '电签系统合同编号',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'contractType',
      label: '合同类型',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'contractName',
      label: '合同名称',
      className: 'text-gray-900',
      mobileHidden: true
    },
    {
      key: 'actions',
      label: '操作',
      className: 'text-gray-500',
      render: (_: any, contract: LoanContract) => (
        isMobile ? (
          <MobileActionMenu
            actions={[
              {
                label: '查看',
                onClick: () => handleViewDetail(contract)
              }
            ]}
          />
        ) : (
          <button
            onClick={() => handleViewDetail(contract)}
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
          { label: "贷款合同" }
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第二行 */}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第三行 */}
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
            <label className="block text-xs text-gray-700 mb-1">资料类型：</label>
            <Select value={materialType} onValueChange={setMaterialType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择资料类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="个人信息查询及使用授权书">个人信息查询及使用授权书</SelectItem>
                <SelectItem value="个人征信授权书">个人征信授权书</SelectItem>
                <SelectItem value="授信额度合同">授信额度合同</SelectItem>
                <SelectItem value="个人借款合同">个人借款合同</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end space-x-2">
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
      </div>

      {/* 贷款合同列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取贷款合同列表失败</div>
        ) : loanContracts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无贷款合同数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {paginatedContracts.map((contract) => renderMobileCard(contract))}
          </div>
        ) : (
          // 桌面端表格布局
          <ResponsiveTable
            columns={columns}
            data={paginatedContracts}
            keyField="id"
            className="min-h-[400px]"
          />
        )}

        {/* 分页组件 */}
        {loanContracts.length > 0 && (
          <Pagination
            total={loanContracts.length}
            current={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>

      {/* 贷款合同信息弹窗 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-6xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>贷款合同信息</DialogTitle>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-16 gap-y-5">
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">机构:</span>
                  <span className="text-gray-900">{selectedContract.institution}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">客户号:</span>
                  <span className="text-gray-900">{selectedContract.customerId}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">客户名称:</span>
                  <span className="text-gray-900">{selectedContract.customerName || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">资料类型:</span>
                  <span className="text-gray-900">{selectedContract.materialType || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">对象申请编号:</span>
                  <span className="text-gray-900">{selectedContract.applicationNumber || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">电签系统合同编号:</span>
                  <span className="text-gray-900 break-all">{selectedContract.contractNumber}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">合同类型:</span>
                  <span className="text-gray-900">{selectedContract.contractType}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">合同名称:</span>
                  <span className="text-gray-900">{selectedContract.contractName}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">文件分类:</span>
                  <span className="text-gray-900">{selectedContract.fileCategory || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">文件类型:</span>
                  <span className="text-gray-900">{selectedContract.fileType || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">文件名称:</span>
                  <span className="text-gray-900">{selectedContract.fileName || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">文件路径:</span>
                  <span className="text-gray-900 break-all">{selectedContract.filePath || '-'}</span>
                </div>

                <div className="flex col-span-2">
                  <span className="text-gray-600 w-40 flex-shrink-0">文件备注:</span>
                  <span className="text-gray-900">{selectedContract.fileRemark || '-'}</span>
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
