"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { Menu, ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useRepaymentPlan } from "../hooks/use-repayment-plan"
import { RepaymentPlanSkeleton } from "./repayment-plan-skeleton"
import { InstallmentListDialog } from "./installment-list-dialog"
import type { RepaymentPlanProps } from "../types"

export function RepaymentPlan({ customerId }: RepaymentPlanProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLoanNumber, setSelectedLoanNumber] = useState<string>("")
  const [isInstallmentDialogOpen, setIsInstallmentDialogOpen] = useState(false)
  const itemsPerPage = 10
  
  const { data: plans = [], isLoading, error } = useRepaymentPlan(customerId)

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000) // 显示骨架屏1秒钟，模拟加载过程
    
    return () => clearTimeout(timer)
  }, [])

  // 显示骨架屏
  if (isInitialLoading || isLoading) {
    return <RepaymentPlanSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/customers" className="hover:text-blue-600">客户管理</Link>
              <span>/</span>
              <span className="text-gray-900">还款计划</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/customers" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
          <div className="text-center text-red-500">
            获取还款计划失败，请重试
          </div>
        </div>
      </div>
    )
  }

  // 分页计算
  const totalPages = Math.ceil(plans.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPlans = plans.slice(startIndex, endIndex)

  // 处理期供列表弹窗
  const handleShowInstallments = (loanNumber: string) => {
    setSelectedLoanNumber(loanNumber)
    setIsInstallmentDialogOpen(true)
  }

  const handleCloseInstallmentDialog = () => {
    setIsInstallmentDialogOpen(false)
    setSelectedLoanNumber("")
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
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/customers" className="hover:text-blue-600">客户管理</Link>
            <span>/</span>
            <span className="text-gray-900">还款计划</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/customers" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Link>
        </div>
      </div>

      {/* 还款计划列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {plans.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无还款计划数据</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      贷款账号
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      借据号
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      产品编号
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      还款方式
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      下次还款日
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      币种
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {plan.loanNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {plan.receiptNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {plan.productNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {plan.repaymentType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {plan.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {plan.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          onClick={() => handleShowInstallments(plan.loanNumber)}
                        >
                          {plan.operation}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 分页 */}
            <div className="flex justify-between items-center px-6 py-3 border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  共计 {plans.length} 条，{itemsPerPage} 条/页
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  {currentPage}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 期供列表弹窗 */}
      <InstallmentListDialog
        loanNumber={selectedLoanNumber}
        isOpen={isInstallmentDialogOpen}
        onClose={handleCloseInstallmentDialog}
      />
    </div>
  )
}
