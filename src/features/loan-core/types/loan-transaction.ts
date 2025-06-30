export interface LoanTransaction {
  id: string
  institution: string
  serviceCode: string
  accountingDate: string
  voucherAccountingDate: string | null
  transactionDate: string
  transactionTime: string
  transactionSerialNumber: string
  counterpartAccount: string
  receiptNumber: string
  counterpartAccountName: string
  repaymentAmount: number
  transactionStatus: string
  responseCode: string
  responseMessage: string
}

export interface LoanTransactionSearchParams {
  institution?: string
  customerNumber?: string
  loanAccountNumber?: string
  receiptNumber?: string
  transactionDate?: string
  transactionSerialNumber?: string
  counterpartDate?: string
  counterpartSerialNumber?: string
  serviceCode?: string
  transactionStatus?: string
}

export interface LoanTransactionListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}
