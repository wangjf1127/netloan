"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { getLoanReceiptDetail } from "../data/mock-account-query"
import type { LoanReceiptDetail } from "../types"

interface LoanReceiptDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  receiptId: string
}

export function LoanReceiptDetailDialog({
  open,
  onOpenChange,
  receiptId
}: LoanReceiptDetailDialogProps) {
  const [detail, setDetail] = useState<LoanReceiptDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && receiptId) {
      setLoading(true)
      // 模拟API调用延迟
      setTimeout(() => {
        const data = getLoanReceiptDetail(receiptId)
        setDetail(data)
        setLoading(false)
      }, 300)
    }
  }, [open, receiptId])

  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === "") {
      return "-"
    }
    if (typeof value === "number") {
      return value.toLocaleString()
    }
    return String(value)
  }

  const fieldGroups = [
    {
      title: "基本信息",
      fields: [
        { label: "产品代码", key: "productCode" },
        { label: "贷款账号", key: "loanAccountNumber" },
        { label: "借据号", key: "loanReceiptNumber" },
        { label: "借据合同编号", key: "contractNumber" },
        { label: "客户号", key: "customerId" },
        { label: "账户性质", key: "accountNature" },
        { label: "借据金额", key: "loanAmount" },
        { label: "币种", key: "currency" }
      ]
    },
    {
      title: "账户信息",
      fields: [
        { label: "入账账户", key: "depositAccount" },
        { label: "入账户名", key: "accountName" },
        { label: "开户行号", key: "bankCode" },
        { label: "开户行名称", key: "bankName" }
      ]
    },
    {
      title: "还款信息",
      fields: [
        { label: "还款方式", key: "repaymentMethod" },
        { label: "还息周期", key: "interestCycle" },
        { label: "还本周期", key: "principalCycle" },
        { label: "贷款对象", key: "loanTarget" },
        { label: "贷款对象细分", key: "loanTargetDetail" }
      ]
    },
    {
      title: "分类信息",
      fields: [
        { label: "四级分类标志", key: "fourLevelClassification" },
        { label: "四级分类日期", key: "fourLevelClassificationDate" },
        { label: "五级分类标志", key: "fiveLevelClassification" },
        { label: "五级分类日期", key: "fiveLevelClassificationDate" }
      ]
    },
    {
      title: "日期信息",
      fields: [
        { label: "起息日期", key: "interestStartDate" },
        { label: "到期日期", key: "maturityDate" },
        { label: "上次还款日", key: "lastRepaymentDate" },
        { label: "下一次还款日", key: "nextRepaymentDate" },
        { label: "计提日期", key: "provisionDate" },
        { label: "结息日期", key: "interestSettlementDate" }
      ]
    },
    {
      title: "本金信息",
      fields: [
        { label: "正常本金", key: "normalPrincipal" },
        { label: "逾期本金", key: "overduePrincipal" },
        { label: "减值本金", key: "impairedPrincipal" },
        { label: "减值标志", key: "impairedFlag" },
        { label: "贷款余额", key: "loanBalance" }
      ]
    },
    {
      title: "利息信息",
      fields: [
        { label: "应收应计利息", key: "receivableAccruedInterest" },
        { label: "催收应计利息", key: "collectionAccruedInterest" },
        { label: "应收欠息", key: "receivableOverdueInterest" },
        { label: "催收欠息", key: "collectionOverdueInterest" },
        { label: "应收应计罚息", key: "receivableAccruedPenalty" },
        { label: "催收应计罚息", key: "collectionAccruedPenalty" },
        { label: "应收罚息", key: "receivablePenalty" },
        { label: "催收罚息", key: "collectionPenalty" },
        { label: "应计复息", key: "accruedCompoundInterest" },
        { label: "复息", key: "compoundInterest" },
        { label: "待摊利息", key: "deferredInterest" }
      ]
    },
    {
      title: "其他信息",
      fields: [
        { label: "是否已停息", key: "isInterestStopped" },
        { label: "是否代偿", key: "isCompensated" },
        { label: "核销标志", key: "writeOffFlag" },
        { label: "核销日期", key: "writeOffDate" },
        { label: "核销收回状态", key: "writeOffRecoveryStatus" },
        { label: "利息调整", key: "interestAdjustment" },
        { label: "本年度利息收入", key: "currentYearInterestIncome" },
        { label: "实收利息收入", key: "actualInterestIncome" },
        { label: "应收贷款费用", key: "receivableLoanFees" },
        { label: "实收费用利息收入", key: "actualFeeInterestIncome" },
        { label: "应收贷款费用罚息", key: "receivableLoanFeePenalty" },
        { label: "实收费用罚息收入", key: "actualFeePenaltyIncome" },
        { label: "应收罚金", key: "receivableFine" },
        { label: "罚金收入", key: "fineIncome" },
        { label: "准备金", key: "provision" },
        { label: "总期数", key: "totalPeriods" },
        { label: "本期期数", key: "currentPeriod" }
      ]
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg font-medium">借据详情</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">加载中...</div>
          ) : detail ? (
            <div className="space-y-6">
            {fieldGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {group.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="flex items-start">
                      <span className="text-sm text-gray-500 w-32 flex-shrink-0">
                        {field.label}:
                      </span>
                      <span className="text-sm text-gray-900 flex-1 text-left break-all">
                        {formatValue(detail[field.key as keyof LoanReceiptDetail])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="p-8 text-center text-red-500">获取借据详情失败</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
