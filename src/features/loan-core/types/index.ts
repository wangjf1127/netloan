export interface AccountQuery {
  id: string
  institution: string
  customerId: string
  loanAccountNumber: string
  loanReceiptNumber: string
  primaryChannelNumber: string
  coreProductNumber: string
  loanAmount: number
  loanBalance: number
  currency: string
  startDate: string
  maturityDate: string
  nextRepaymentDate: string
  repaymentMethod: string
  accountStatus: string
  processingFlag: string
}

export interface AccountQuerySearchParams {
  institution?: string
  primaryChannelNumber?: string
  coreProduct?: string
  customerId?: string
  loanAccountNumber?: string
  loanReceiptNumber?: string
  accountName?: string
  accountStatus?: string
  processingFlag?: string
}

export interface AccountQueryListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}
