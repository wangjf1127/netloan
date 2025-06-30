"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getInstallmentPaymentData } from "../data/mock-account-query"
import type { InstallmentPaymentData } from "../types"

interface InstallmentPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accountId: string
}

export function InstallmentPaymentDialog({
  open,
  onOpenChange,
  accountId
}: InstallmentPaymentDialogProps) {
  const [data, setData] = useState<InstallmentPaymentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [jumpPage, setJumpPage] = useState("")

  useEffect(() => {
    if (open && accountId) {
      setLoading(true)
      // 模拟API调用延迟
      setTimeout(() => {
        const installmentData = getInstallmentPaymentData(accountId)
        setData(installmentData)
        setLoading(false)
      }, 300)
    }
  }, [open, accountId])

  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === "") {
      return "0"
    }
    if (typeof value === "number") {
      return value.toLocaleString()
    }
    return String(value)
  }

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedInstallments = data ? data.installments.slice(startIndex, endIndex) : []

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleJump = () => {
    const page = parseInt(jumpPage)
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setJumpPage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJump()
    }
  }

  // 生成页码按钮
  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      // 如果总页数小于等于最大显示数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 复杂的页码显示逻辑
      if (currentPage <= 3) {
        // 当前页在前面
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // 当前页在后面
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 当前页在中间
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg font-medium">期供查询</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">加载中...</div>
          ) : data ? (
            <div className="space-y-6">
              {/* 账户基本信息 */}
              <div className="grid grid-cols-3 gap-x-8 gap-y-3 pb-4 border-b border-gray-200">
                <div className="flex items-start">
                  <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                    账户名称:
                  </span>
                  <span className="text-sm text-gray-900 flex-1 text-left">
                    {data.accountName}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                    贷款账号:
                  </span>
                  <span className="text-sm text-gray-900 flex-1 text-left break-all">
                    {data.loanAccountNumber}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                    借据号:
                  </span>
                  <span className="text-sm text-gray-900 flex-1 text-left break-all">
                    {data.loanReceiptNumber}
                  </span>
                </div>
              </div>

              {/* 期供表格 */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '2400px' }}>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px', minWidth: '80px' }}>
                        期次编号
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        开始日期
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        到期日期
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        初始本金
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        初始利息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        应还本金
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        应收欠息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        催收欠息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        应收罚息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        催收罚息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px', minWidth: '80px' }}>
                        复息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        利息调整
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        罚息调整
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        复息调整
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        费用调整
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        未偿整利息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        未偿整罚息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        未偿整复息
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        未偿整费用
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                        本期状态
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedInstallments.map((installment) => (
                      <tr key={installment.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {installment.periodNumber}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {installment.startDate}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {installment.dueDate}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.initialPrincipal)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.initialInterest)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.duePrincipal)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.receivableOverdueInterest)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.collectionOverdueInterest)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.receivablePenalty)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.collectionPenalty)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.compoundInterest)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.interestAdjustment)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.penaltyAdjustment)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.compoundInterestAdjustment)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.feeAdjustment)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.outstandingInterest)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.outstandingPenalty)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.outstandingCompoundInterest)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatValue(installment.outstandingFees)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {installment.periodStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 分页信息 */}
              {data.totalCount > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    总共{data.totalCount}条
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {/* 页码 */}
                    <div className="flex items-center space-x-1">
                      {renderPageNumbers().map((page, index) => (
                        page === '...' ? (
                          <span key={index} className="px-2 py-1 text-sm text-gray-500">...</span>
                        ) : (
                          <Button
                            key={index}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page as number)}
                            className="min-w-[32px]"
                          >
                            {page}
                          </Button>
                        )
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-sm text-gray-700">
                      {pageSize}条/页
                    </span>
                    
                    <span className="text-sm text-gray-700">跳至</span>
                    <Input
                      type="number"
                      value={jumpPage}
                      onChange={(e) => setJumpPage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-16 h-8 text-sm"
                      placeholder=""
                    />
                    <span className="text-sm text-gray-700">页</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-red-500">获取期供数据失败</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
