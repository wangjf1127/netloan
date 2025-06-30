"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


import { getLoanTransactionData } from "../data/mock-account-query"
import type { LoanTransactionData } from "../types"

interface LoanTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accountId: string
}

export function LoanTransactionDialog({
  open,
  onOpenChange,
  accountId
}: LoanTransactionDialogProps) {
  const [data, setData] = useState<LoanTransactionData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && accountId) {
      setLoading(true)
      // 模拟API调用延迟
      setTimeout(() => {
        const transactionData = getLoanTransactionData(accountId)
        setData(transactionData)
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



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg font-medium">账户贷款流水</DialogTitle>
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

            {/* 流水表格 */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1800px' }}>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '140px', minWidth: '140px' }}>
                      流水号
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      对方户名
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      交易日期
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      借据金额
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      还款金额
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      归还本金
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      应收欠息
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      催收欠息
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      应收罚息
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>
                      催收罚息
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px', minWidth: '80px' }}>
                      复息
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px', minWidth: '80px' }}>
                      罚金
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>
                      提前还款本金
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>
                      提前还款利息
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.transactionNumber}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.counterpartyName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.transactionDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.loanAmount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.repaymentAmount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.principalRepayment)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.receivableOverdueInterest)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.collectionOverdueInterest)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.receivablePenalty)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.collectionPenalty)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.compoundInterest)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.fine)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.prepaymentPrincipal)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatValue(transaction.prepaymentInterest)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          ) : (
            <div className="p-8 text-center text-red-500">获取贷款流水失败</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
