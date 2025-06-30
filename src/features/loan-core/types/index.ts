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

export interface LoanReceiptDetail {
  productCode: string
  loanAccountNumber: string
  loanReceiptNumber: string
  contractNumber: string
  customerId: string
  accountNature: string
  loanAmount: number
  currency: string
  depositAccount: string
  accountName: string
  bankCode: string
  bankName: string
  repaymentMethod: string
  interestCycle: string
  principalCycle: string
  loanTarget: string
  loanTargetDetail: string
  fourLevelClassification: string
  fourLevelClassificationDate: string
  fiveLevelClassification: string
  fiveLevelClassificationDate: string
  interestStartDate: string
  maturityDate: string
  normalPrincipal: number
  overduePrincipal: number
  impairedPrincipal: number
  impairedFlag: string
  isInterestStopped: string
  isCompensated: string
  loanBalance: number
  receivableAccruedInterest: number
  collectionAccruedInterest: number
  receivableOverdueInterest: number
  collectionOverdueInterest: number
  receivableAccruedPenalty: number
  collectionAccruedPenalty: number
  receivablePenalty: number
  collectionPenalty: number
  accruedCompoundInterest: number
  compoundInterest: number
  deferredInterest: number
  writeOffFlag: string
  writeOffDate: string
  writeOffRecoveryStatus: string
  interestAdjustment: number
  currentYearInterestIncome: number
  actualInterestIncome: number
  receivableLoanFees: number
  actualFeeInterestIncome: number
  receivableLoanFeePenalty: number
  actualFeePenaltyIncome: number
  receivableFine: number
  fineIncome: number
  provision: number
  totalPeriods: number
  currentPeriod: number
  lastRepaymentDate: string
  nextRepaymentDate: string
  provisionDate: string
  interestSettlementDate: string
}

export interface LoanTransaction {
  id: string
  transactionNumber: string
  counterpartyName: string
  transactionDate: string
  loanAmount: number
  repaymentAmount: number
  principalRepayment: number
  receivableOverdueInterest: number
  collectionOverdueInterest: number
  receivablePenalty: number
  collectionPenalty: number
  compoundInterest: number
  fine: number
  prepaymentPrincipal: number
  prepaymentInterest: number
}

export interface LoanTransactionData {
  accountName: string
  loanAccountNumber: string
  loanReceiptNumber: string
  transactions: LoanTransaction[]
  totalCount: number
}

export interface InstallmentPayment {
  id: string
  periodNumber: number
  startDate: string
  dueDate: string
  initialPrincipal: number
  initialInterest: number
  duePrincipal: number
  receivableOverdueInterest: number
  collectionOverdueInterest: number
  receivablePenalty: number
  collectionPenalty: number
  compoundInterest: number
  interestAdjustment: number
  penaltyAdjustment: number
  compoundInterestAdjustment: number
  feeAdjustment: number
  outstandingInterest: number
  outstandingPenalty: number
  outstandingCompoundInterest: number
  outstandingFees: number
  periodStatus: string
}

export interface InstallmentPaymentData {
  accountName: string
  loanAccountNumber: string
  loanReceiptNumber: string
  installments: InstallmentPayment[]
  totalCount: number
}
