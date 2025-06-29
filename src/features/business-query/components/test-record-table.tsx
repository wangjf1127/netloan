"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TestRecord } from "../types"

interface TestRecordTableProps {
  records: TestRecord[]
  loading?: boolean
}

export function TestRecordTable({ records, loading }: TestRecordTableProps) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null)

  const handleViewDetail = (record: TestRecord) => {
    setSelectedRecord(record)
    setIsDetailDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  客户ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  机构
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  贷款类型
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  贷款子类型
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  业务渠道
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  子业务渠道
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  贷款用途
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  提现金额(元)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  提现日期
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  处理结果
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  还剩日
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-blue-600 whitespace-nowrap">
                      {record.customerId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.institution}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.loanType}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.loanSubtype}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.businessChannel}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.subBusinessChannel || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.loanPurpose || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.withdrawalAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.withdrawalDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.processingResult === '正常' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.processingResult}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {record.remainingDays}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleViewDetail(record)}
                        className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
                      >
                        查看
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情弹窗 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>测试记录详情</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-16 gap-y-5">
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">客户ID:</span>
                  <span className="text-gray-900">{selectedRecord.customerId}</span>
                </div>
                
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">机构:</span>
                  <span className="text-gray-900">{selectedRecord.institution}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">贷款类型:</span>
                  <span className="text-gray-900">{selectedRecord.loanType}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">贷款子类型:</span>
                  <span className="text-gray-900">{selectedRecord.loanSubtype}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">业务渠道:</span>
                  <span className="text-gray-900">{selectedRecord.businessChannel}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">子业务渠道:</span>
                  <span className="text-gray-900">{selectedRecord.subBusinessChannel || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">贷款用途:</span>
                  <span className="text-gray-900">{selectedRecord.loanPurpose || '-'}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">提现金额(元):</span>
                  <span className="text-gray-900">{selectedRecord.withdrawalAmount.toLocaleString()}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">提现日期:</span>
                  <span className="text-gray-900">{selectedRecord.withdrawalDate}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">处理结果:</span>
                  <span className="text-gray-900">{selectedRecord.processingResult}</span>
                </div>

                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">还剩日:</span>
                  <span className="text-gray-900">{selectedRecord.remainingDays}</span>
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
    </>
  )
}
