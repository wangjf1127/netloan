export interface CustomerItem {
  id: string
  customerId: string
  customerName: string
  phoneNumber: string
  idCard: string
  customerType: string
  certificateType: string
  certificateNumber: string
  createDate: string
  updateDate: string
  status: string
}

export interface CustomerListProps {
  customers?: CustomerItem[]
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export interface CustomerDetailProps {
  customerId: string
}

export interface CustomerDetail {
  id: string
  customerId: string
  customerName: string
  gender: string
  birthDate: string
  phoneNumber: string
  certificateType: string
  certificateNumber: string
  certificateIssuer: string
  certificateStartDate: string
  certificateEndDate: string
  address: string
  maritalStatus: string
  education: string
  isEmployee: string
  customerStatus: string
  childrenCount: string
  machineId: string
  // 配偶信息
  spouseName?: string
  spouseGender?: string
  spouseCertificateType?: string
  spouseCertificateNumber?: string
  spousePhoneNumber?: string
  // 单位信息
  companyName?: string
  companyAddress?: string
  department?: string
  position?: string
  monthlyIncome?: string
}

// 借据信息类型
export interface LoanRecord {
  id: string
  loanNumber: string         // 贷款账号
  receiptNumber: string      // 借据号
  productNumber: string      // 产品编号
  loanAmount: string         // 借贷金额
  repaymentAmount: string    // 贷款金额
  nextRepaymentDate: string  // 下次还款日
  status: string             // 当前状态
  currency: string           // 币种
  maturityDate: string       // 结清日期
}

export interface LoanRecordsProps {
  customerId: string
}

export interface LoanRecordsState {
  records: LoanRecord[]
  isLoading: boolean
  error: string | null
}

// 借据详情类型
export interface LoanDetail {
  id: string
  loanNumber: string         // 贷款账号
  receiptNumber: string      // 借据号
  productNumber: string      // 产品编号
  loanAmount: string         // 借据金额
  repaymentAmount: string    // 贷款余额
  currency: string           // 币种
  startDate: string          // 起始日期
  maturityDate: string       // 到期日期
  repaymentMethod: string    // 还款方式
  repaymentDay: string       // 还款日
  totalPeriods: string       // 总期数
  remainingPeriods: string   // 剩余期数
  fourthCategoryStatus: string // 四级分类标志
  fifthCategoryStatus: string  // 五级分类标志
  normalPrincipal: string    // 正常本金
  overduePrincipal: string   // 逾期本金
  overdueInterest: string    // 应收利息总额
  overdueInterestAmount: string // 催收欠息总额
  overdueInterestPenalty: string // 应收罚息总额
  recoveryAmount: string     // 复息总额
  processingStatus: string   // 处理标志
  loanStatus: string         // 借据状态
  nextRepaymentDate: string  // 下一次还款日
}

export interface LoanDetailProps {
  customerId: string
  loanId: string
}

// 还款计划类型
export interface RepaymentPlanItem {
  id: string
  loanNumber: string         // 贷款账号
  receiptNumber: string      // 借据号
  productNumber: string      // 产品编号
  repaymentType: string      // 还款方式
  dueDate: string           // 下次还款日
  status: string            // 状态
  operation: string         // 操作
}

export interface RepaymentPlanProps {
  customerId: string
}

export interface RepaymentPlanState {
  plans: RepaymentPlanItem[]
  isLoading: boolean
  error: string | null
}

// 期供列表类型
export interface InstallmentItem {
  id: string
  periodNumber: string        // 期次编号
  startDate: string          // 开始日期
  dueDate: string           // 到期日期
  duePrincipal: string      // 应还本金
  dueInterest: string       // 应还利息
  dueFee: string           // 应还费用
  dueTotal: string         // 应还总额
  paidPrincipal: string    // 实还本金
  paidInterest: string     // 实还利息
  paidFee: string         // 实还费用
  paidTotal: string       // 实还总额
  owedPrincipal: string   // 欠款本金
  owedInterest: string    // 欠款利息
  owedFee: string        // 欠款费用
  status: string         // 状态
}

export interface InstallmentListProps {
  loanNumber: string
  isOpen: boolean
  onClose: () => void
}

export interface InstallmentListState {
  installments: InstallmentItem[]
  isLoading: boolean
  error: string | null
}