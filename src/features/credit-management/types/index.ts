export interface CreditLedgerItem {
  id: string
  institution: string
  branch: string
  customerId: string
  customerName: string
  productNumber: string
  loanType: string
  loanSubType: string
  creditType: string
  totalAmount: number
  availableAmount: number
  usedAmount: number
  rateType: string
  normalRate: number
  overdueRate: number
  compoundRate: number
  repaymentMethod: string
  creditStatus: string
  ledgerStatus: string
  effectiveDate: string
  expiryDate: string
}

export interface CreditLedgerFilters {
  institution?: string
  customerId?: string
  customerName?: string
  customerPhone?: string
  customerIdCard?: string
  ledgerStatus?: string
  loanType?: string
  loanSubType?: string
  creditType?: string
}

export interface CreditLedgerListProps {
  items?: CreditLedgerItem[]
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export interface CreditLedgerDetailProps {
  creditId: string
}

// 操作类型
export type CreditAction = "view" | "adjust" | "download"

// 台账状态选项
export const LEDGER_STATUS_OPTIONS = [
  { value: "active", label: "有效" },
  { value: "inactive", label: "无效" },
  { value: "frozen", label: "冻结" },
  { value: "expired", label: "过期" },
] as const

// 贷款类型选项
export const LOAN_TYPE_OPTIONS = [
  { value: "guarantee", label: "担保类" },
  { value: "credit", label: "信用类" },
  { value: "mortgage", label: "抵押类" },
  { value: "pledge", label: "质押类" },
] as const

// 贷款子类型选项
export const LOAN_SUB_TYPE_OPTIONS = [
  { value: "consumer-credit", label: "信用类-消费贷款" },
  { value: "business-credit", label: "信用类-经营贷款" },
  { value: "housing-mortgage", label: "抵押类-住房贷款" },
  { value: "commercial-mortgage", label: "抵押类-商业贷款" },
] as const

// 授信类型选项
export const CREDIT_TYPE_OPTIONS = [
  { value: "revolving", label: "循环授信" },
  { value: "one-time", label: "一次性授信" },
  { value: "installment", label: "分期授信" },
] as const

// 机构选项
export const INSTITUTION_OPTIONS = [
  { value: "shanghai-rural-bank", label: "上海**银行商业银行" },
  { value: "beijing-rural-bank", label: "北京农村商业银行" },
  { value: "guangzhou-rural-bank", label: "广州农村商业银行" },
] as const
