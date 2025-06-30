"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"
import { AccountQuerySearch } from "./account-query-search"
import { AccountQueryPagination } from "./account-query-pagination"
import { LoanReceiptDetailDialog } from "./loan-receipt-detail-dialog"
import { LoanTransactionDialog } from "./loan-transaction-dialog"
import { InstallmentPaymentDialog } from "./installment-payment-dialog"
import { useAccountQuery, useSearchAccountQuery } from "../hooks/use-account-query"
import { maskSensitiveData } from "@/lib/utils"
import { NotImplementedButton } from "@/shared/components/ui/feature-not-implemented"
import type { AccountQueryListProps, AccountQuery, AccountQuerySearchParams } from "../types"

export function AccountQueryList({ sidebarCollapsed, onToggleSidebar }: AccountQueryListProps) {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [searchParams, setSearchParams] = useState<AccountQuerySearchParams>({})
  const [selectedReceiptId, setSelectedReceiptId] = useState<string>("")
  const [showReceiptDetail, setShowReceiptDetail] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string>("")
  const [showLoanTransaction, setShowLoanTransaction] = useState(false)
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<string>("")
  const [showInstallmentPayment, setShowInstallmentPayment] = useState(false)

  const { data: accountQueries = [], isLoading, error } = useAccountQuery()
  const searchMutation = useSearchAccountQuery()

  // 处理搜索
  const handleSearch = (params: AccountQuerySearchParams) => {
    setSearchParams(params)
    setCurrentPage(1)
    searchMutation.mutate(params)
  }

  // 处理重置
  const handleReset = () => {
    setSearchParams({})
    setCurrentPage(1)
    // 重新获取原始数据
    window.location.reload()
  }

  // 处理查看借据详情
  const handleViewReceiptDetail = (query: AccountQuery) => {
    setSelectedReceiptId(query.id)
    setShowReceiptDetail(true)
  }

  // 处理查看贷款流水
  const handleViewLoanTransaction = (query: AccountQuery) => {
    setSelectedAccountId(query.id)
    setShowLoanTransaction(true)
  }

  // 处理查看期供
  const handleViewInstallmentPayment = (query: AccountQuery) => {
    setSelectedInstallmentId(query.id)
    setShowInstallmentPayment(true)
  }

  // 分页数据
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedQueries = accountQueries.slice(startIndex, endIndex)

  // 移动端卡片渲染函数
  const renderMobileCard = (query: AccountQuery) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{query.institution}</div>
          <div className="text-sm text-blue-600">客户号: {query.customerId}</div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '借据详情',
              onClick: () => handleViewReceiptDetail(query)
            },
            {
              label: '贷款流水',
              onClick: () => handleViewLoanTransaction(query)
            },
            {
              label: '期供',
              onClick: () => handleViewInstallmentPayment(query)
            },
            {
              label: '期供明细',
              onClick: () => console.log('期供明细', query.id)
            }
          ]}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">贷款账号:</span>
          <div className="font-medium break-all">{query.loanAccountNumber}</div>
        </div>
        <div>
          <span className="text-gray-500">借据号:</span>
          <div className="font-medium break-all">{query.loanReceiptNumber}</div>
        </div>
        <div>
          <span className="text-gray-500">借据金额:</span>
          <div className="font-medium">{query.loanAmount.toLocaleString()}</div>
        </div>
        <div>
          <span className="text-gray-500">贷款余额:</span>
          <div className="font-medium">{query.loanBalance.toLocaleString()}</div>
        </div>
        <div>
          <span className="text-gray-500">账户状态:</span>
          <div className="font-medium">{query.accountStatus}</div>
        </div>
        <div>
          <span className="text-gray-500">处理标志:</span>
          <div className="font-medium">{query.processingFlag}</div>
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
          { label: "账户查询" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索区域 */}
      <AccountQuerySearch
        onSearch={handleSearch}
        onReset={handleReset}
        loading={isLoading || searchMutation.isPending}
      />

      {/* 账户查询列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取账户查询列表失败</div>
        ) : accountQueries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无账户查询数据</div>
        ) : isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-3">
            {paginatedQueries.map((query) => (
              <div key={query.id} className="bg-white rounded-lg border border-gray-200 p-4">
                {renderMobileCard(query)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端表格布局（带遮罩效果）
          <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '2000px', tableLayout: 'fixed' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>
                    机构
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                    客户号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '280px', minWidth: '280px' }}>
                    贷款账号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '280px', minWidth: '280px' }}>
                    借据号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>
                    一级渠道号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '150px', minWidth: '150px' }}>
                    核心产品号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                    借据金额
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                    贷款余额
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px', minWidth: '80px' }}>
                    币种
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                    起始日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                    到期日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                    下一还款日
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                    还款方式
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px', minWidth: '80px' }}>
                    账户状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px', minWidth: '80px' }}>
                    处理标志
                  </th>
                  {/* 操作列固定在右侧，带层叠效果 */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10 relative" style={{ width: '300px', minWidth: '300px' }}>
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-gray-300/20 to-gray-50 pointer-events-none -ml-4"></div>
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedQueries.map((query) => (
                  <tr key={query.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-all">
                      {query.loanAccountNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-all">
                      {query.loanReceiptNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.primaryChannelNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.coreProductNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.loanAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.loanBalance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.maturityDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.nextRepaymentDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.repaymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.accountStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.processingFlag}
                    </td>
                    {/* 操作列固定在右侧，带层叠效果 */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 sticky right-0 bg-white z-10 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-gray-300/25 to-white pointer-events-none -ml-4"></div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewReceiptDetail(query)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto text-sm"
                        >
                          借据详情
                        </button>
                        <button
                          onClick={() => handleViewLoanTransaction(query)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto text-sm"
                        >
                          贷款流水
                        </button>
                        <button
                          onClick={() => handleViewInstallmentPayment(query)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto text-sm"
                        >
                          期供
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页 */}
        {accountQueries.length > 0 && (
          <AccountQueryPagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={accountQueries.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* 借据详情弹窗 */}
      <LoanReceiptDetailDialog
        open={showReceiptDetail}
        onOpenChange={setShowReceiptDetail}
        receiptId={selectedReceiptId}
      />

      {/* 贷款流水弹窗 */}
      <LoanTransactionDialog
        open={showLoanTransaction}
        onOpenChange={setShowLoanTransaction}
        accountId={selectedAccountId}
      />

      {/* 期供弹窗 */}
      <InstallmentPaymentDialog
        open={showInstallmentPayment}
        onOpenChange={setShowInstallmentPayment}
        accountId={selectedInstallmentId}
      />
    </div>
  )
}
