"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { Pagination } from "@/shared/components/ui/pagination"
import { LoanTransactionSearch } from "./loan-transaction-search"
import { useLoanTransaction, useSearchLoanTransaction } from "../hooks/use-loan-transaction"
import { maskSensitiveData } from "@/lib/utils"
import { NotImplementedButton } from "@/shared/components/ui/feature-not-implemented"
import type { LoanTransaction, LoanTransactionListProps, LoanTransactionSearchParams } from "../types/loan-transaction"

export function LoanTransactionList({ sidebarCollapsed, onToggleSidebar }: LoanTransactionListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  const isMobile = useIsMobile()
  const { data: loanTransactions = [], isLoading, error, refetch } = useLoanTransaction()
  const searchMutation = useSearchLoanTransaction()

  const handleSearch = (params: LoanTransactionSearchParams) => {
    searchMutation.mutate(params)
    setCurrentPage(1)
  }

  const handleReset = () => {
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

  // 计算分页数据
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedTransactions = loanTransactions.slice(startIndex, endIndex)

  // 移动端卡片渲染函数
  const renderMobileCard = (transaction: LoanTransaction) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{transaction.institution}</div>
          <div className="text-sm text-blue-600">服务代码: {transaction.serviceCode}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '查看',
              onClick: () => console.log('查看', transaction.id)
            }
          ]}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">会计日期</div>
          <div className="font-medium">{transaction.accountingDate}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">交易日期</div>
          <div className="font-medium">{transaction.transactionDate}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">交易流水号</div>
          <div className="font-medium">{transaction.transactionSerialNumber}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">对方账号</div>
          <div className="font-medium">{transaction.counterpartAccount}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">对方户名</div>
          <div className="font-medium">{maskSensitiveData(transaction.counterpartAccountName, 'name')}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">交易状态</div>
          <div className="font-medium">{transaction.transactionStatus}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "贷款核心" },
          { label: "流水查询" },
          { label: "贷款交易流水" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索区域 */}
      <LoanTransactionSearch
        onSearch={handleSearch}
        onReset={handleReset}
        loading={isLoading || searchMutation.isPending}
      />

      {/* 贷款交易流水列表 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取贷款交易流水列表失败</div>
        ) : loanTransactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无贷款交易流水数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {paginatedTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                {renderMobileCard(transaction)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端表格布局
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed" style={{ minWidth: '1800px' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>
                    机构
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                    服务代码
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                    会计日期
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>
                    凭证会计日期
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                    交易日期
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '140px' }}>
                    交易时间
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '140px' }}>
                    交易流水号
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '140px' }}>
                    对方账号
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '200px' }}>
                    借据号
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px' }}>
                    对方户名
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                    还款金额
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                    交易状态
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px' }}>
                    响应码
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                    响应信息
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px' }}>
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '120px' }}>
                      {transaction.institution}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '100px' }}>
                      {transaction.serviceCode}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '100px' }}>
                      {transaction.accountingDate}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '120px' }}>
                      {transaction.voucherAccountingDate || '-'}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '100px' }}>
                      {transaction.transactionDate}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '140px' }}>
                      {transaction.transactionTime}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '140px' }}>
                      {transaction.transactionSerialNumber}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '140px' }}>
                      {transaction.counterpartAccount}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '200px' }}>
                      {transaction.receiptNumber}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '80px' }}>
                      {maskSensitiveData(transaction.counterpartAccountName, 'name')}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '100px' }}>
                      {transaction.repaymentAmount}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '100px' }}>
                      {transaction.transactionStatus}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '80px' }}>
                      {transaction.responseCode}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 truncate" style={{ maxWidth: '100px' }}>
                      {transaction.responseMessage}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm" style={{ maxWidth: '80px' }}>
                      <NotImplementedButton
                        featureName="查看"
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                      >
                        查看
                      </NotImplementedButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页组件 */}
        {loanTransactions.length > 0 && (
          <Pagination
            total={loanTransactions.length}
            current={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  )
}
