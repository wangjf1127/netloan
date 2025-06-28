"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { Menu, ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react"
import { useLoanRecords } from "../hooks/use-loan-records"
import { useLoanDetail } from "../hooks/use-loan-detail"
import { LoanRecordsSkeleton } from "./loan-records-skeleton"
import type { LoanRecordsProps, LoanDetail } from "../types"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog"

export function LoanRecords({ customerId }: LoanRecordsProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<LoanDetail | null>(null)
  const itemsPerPage = 10
  
  const { data: records = [], isLoading, error } = useLoanRecords(customerId)
  const { data: loanDetail, isLoading: isLoanDetailLoading } = useLoanDetail(customerId, selectedLoanId || '')

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000) // 显示骨架屏1秒钟，模拟加载过程
    
    return () => clearTimeout(timer)
  }, [])

  // 当loanDetail加载完成后，更新selectedLoan
  useEffect(() => {
    if (loanDetail && !isLoanDetailLoading) {
      setSelectedLoan(loanDetail)
    }
  }, [loanDetail, isLoanDetailLoading])

  // 打开借据详情弹窗
  const handleOpenLoanDetail = (loanId: string) => {
    setSelectedLoanId(loanId)
    setIsDialogOpen(true)
  }

  // 显示骨架屏
  if (isInitialLoading || isLoading) {
    return <LoanRecordsSkeleton />
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
              <span className="text-gray-900">借据信息</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/customers" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-red-500">
          获取借据信息失败
        </div>
      </div>
    )
  }

  // 计算总页数
  const totalPages = Math.ceil(records.length / itemsPerPage)
  
  // 获取当前页的数据
  const currentRecords = records.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
            <span className="text-gray-900">借据信息</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/customers" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Link>
        </div>
      </div>

      {/* 借据列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {records.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无借据信息</div>
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
                      借据金额(元)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      贷款余额(元)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      下次还款日
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      借据状态
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      币种
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      结清日期
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.loanNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.receiptNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.productNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.loanAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.repaymentAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.nextRepaymentDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.maturityDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                            onClick={() => handleOpenLoanDetail(record.id)}
                          >
                            查看
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          >
                            还款评级
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 分页控件 */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                总共 <span className="font-medium">{records.length}</span> 条记录
              </div>
              <div className="flex space-x-1">
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
                <span className="flex items-center px-3 h-8 text-sm font-medium">
                  {currentPage} / {totalPages}
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

      {/* 借据详情弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-100 p-0 rounded-md">
          <div className="relative">
            <div className="p-6">
              <DialogTitle className="text-lg font-medium mb-6">借据信息</DialogTitle>
              
              {isLoanDetailLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : selectedLoan ? (
                <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm">
                  <div className="flex">
                    <span className="text-gray-500 w-28">贷款账号：</span>
                    <span>{selectedLoan.loanNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">借据号：</span>
                    <span>{selectedLoan.receiptNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">产品编号：</span>
                    <span>{selectedLoan.productNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">借据金额：</span>
                    <span>{selectedLoan.loanAmount}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">贷款余额：</span>
                    <span>{selectedLoan.repaymentAmount}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">币种：</span>
                    <span>{selectedLoan.currency}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">起始日期：</span>
                    <span>{selectedLoan.startDate}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">到期日期：</span>
                    <span>{selectedLoan.maturityDate}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">还款方式：</span>
                    <span>{selectedLoan.repaymentMethod}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">还款日：</span>
                    <span>{selectedLoan.repaymentDay}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">总期数：</span>
                    <span>{selectedLoan.totalPeriods}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">剩余期数：</span>
                    <span>{selectedLoan.remainingPeriods}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">四级分类标志：</span>
                    <span>{selectedLoan.fourthCategoryStatus}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">五级分类标志：</span>
                    <span>{selectedLoan.fifthCategoryStatus}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">正常本金：</span>
                    <span>{selectedLoan.normalPrincipal}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">逾期本金：</span>
                    <span>{selectedLoan.overduePrincipal}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">应收利息总额：</span>
                    <span>{selectedLoan.overdueInterest}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">催收欠息总额：</span>
                    <span>{selectedLoan.overdueInterestAmount}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">应收罚息总额：</span>
                    <span>{selectedLoan.overdueInterestPenalty}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">复息总额：</span>
                    <span>{selectedLoan.recoveryAmount}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">处理标志：</span>
                    <span>{selectedLoan.processingStatus}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">借据状态：</span>
                    <span>{selectedLoan.loanStatus}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-28">下一次还款日：</span>
                    <span>{selectedLoan.nextRepaymentDate}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">未找到借据信息</div>
              )}
            </div>
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 