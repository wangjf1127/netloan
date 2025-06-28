import type { CreditLedgerItem } from '../types'

export const mockCreditLedger: CreditLedgerItem[] = [
  {
    id: "1",
    institution: "上海农村商业银行",
    branch: "上海农村商业银行股份有限公司",
    customerId: "C001",
    customerName: "张三",
    productNumber: "PRD001",
    loanType: "信用类",
    loanSubType: "信用类-消费贷款",
    creditType: "循环授信",
    totalAmount: 500000,
    availableAmount: 300000,
    usedAmount: 200000,
    rateType: "年利率",
    normalRate: 5.48,
    overdueRate: 8.22,
    compoundRate: 8.22,
    repaymentMethod: "等本还款",
    creditStatus: "有效",
    ledgerStatus: "有效",
    effectiveDate: "2025-06-25",
    expiryDate: "2080-07-25"
  }
]
