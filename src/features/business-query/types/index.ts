// 授信申请相关类型定义

export interface CreditApplication {
  id: string
  institution: string
  productNumber: string
  businessChannel: string
  subBusinessChannel: string
  loanType: string
  loanSubType: string
  customerId: string
  customerName: string
  certificateType: string
  certificateNumber: string
  currency: string
  applicationDate: string
}

export interface CreditApplicationSearchParams {
  institution?: string
  customerId?: string
  customerPhone?: string
  customerName?: string
  customerIdCard?: string
  loanType?: string
  loanSubType?: string
  channel?: string
  applicationDate?: string
}

export interface CreditApplicationListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

// 授信协议相关类型定义

export interface CreditAgreement {
  id: string
  customerId: string           // 客户号
  customerName: string         // 客户名称
  institution: string          // 机构
  loanType: string            // 贷款类型
  loanSubType: string         // 贷款子类型
  productNumber: string       // 产品号
  rateType: string           // 年/月利率标记
  normalRate: number         // 正常利率(%)
  overdueRate: number        // 逾期利率(%)
  compoundRate: number       // 复利利率(%)
  repaymentMethod: string    // 还款方式
  principalCycle: string     // 还本周期
  interestCycle: string      // 还息周期
  totalAmount: number        // 总额度
  effectiveDate: string      // 额度生效日期
  expiryDate: string         // 额度失效日期
  accessChannel: string      // 接入渠道
  subChannel?: string        // 子渠道
}

export interface CreditAgreementSearchParams {
  institution?: string
  customerId?: string
  customerName?: string
  customerIdCard?: string
  loanType?: string
  loanSubType?: string
  effectiveDate?: string
}

export interface CreditAgreementListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

// 贷款合同相关类型定义

export interface LoanContract {
  id: string
  customerId: string           // 客户ID
  institution: string          // 机构
  materialType: string         // 资料类型
  contractNumber: string       // 电签系统合同编号
  contractType: string         // 合同类型
  contractName: string         // 合同名称
  // 详情弹窗额外字段
  customerName?: string        // 客户名称
  applicationNumber?: string   // 对象申请编号
  fileCategory?: string        // 文件分类
  fileType?: string           // 文件类型
  fileName?: string           // 文件名称
  filePath?: string           // 文件路径
  fileRemark?: string         // 文件备注
}

export interface LoanContractSearchParams {
  institution?: string
  customerId?: string
  customerName?: string
  customerPhone?: string
  customerIdCard?: string
  materialType?: string
}

export interface LoanContractListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

// 测试记录相关类型定义

export interface TestRecord {
  id: string
  customerId: string           // 客户ID
  institution: string          // 机构
  loanType: string            // 贷款类型
  loanSubtype: string         // 贷款子类型
  businessChannel: string     // 业务渠道
  subBusinessChannel?: string // 子业务渠道
  loanPurpose?: string        // 贷款用途
  withdrawalAmount: number    // 提现金额(元)
  withdrawalDate: string      // 提现日期
  processingResult: string    // 处理结果
  remainingDays: number       // 还剩日
}

export interface TestRecordSearchParams {
  institution?: string        // 机构
  customerId?: string         // 客户ID
  customerName?: string       // 客户姓名
  customerPhone?: string      // 客户手机号
  customerIdCard?: string     // 客户身份证
  processingResult?: string   // 处理结果
  loanType?: string          // 贷款类型
  loanSubtype?: string       // 贷款子类型
  channel?: string           // 渠道
  withdrawalDate?: string    // 提现日期
}

export interface TestRecordListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

// 额度提现相关类型定义

export interface CreditWithdrawal {
  id: string
  customerId: string           // 客户ID
  institution: string          // 机构
  loanType: string            // 贷款类型
  loanSubtype: string         // 贷款子类型
  businessChannel: string     // 业务渠道
  subBusinessChannel?: string // 子业务渠道
  loanPurpose?: string        // 贷款用途
  withdrawalAmount: number    // 提现金额(元)
  withdrawalDate: string      // 提现日期
  processingResult: string    // 处理结果
  remainingDays: number       // 还剩日
  // 弹窗详情字段
  institutionCode: string     // 机构代码
  customerName: string        // 客户名称
  loanNumber: string          // 借据号
  applicationAmount: number   // 申请金额
  loanDirection?: string      // 贷款投向
  repaymentMethod: string     // 还款方式
  repaymentDay: number        // 还款日
  loanAccount: string         // 贷款账号
}

export interface CreditWithdrawalSearchParams {
  institution?: string        // 机构
  customerId?: string         // 客户ID
  customerName?: string       // 客户姓名
  customerPhone?: string      // 客户手机号
  customerIdCard?: string     // 客户身份证
  processingResult?: string   // 处理结果
  loanType?: string          // 贷款类型
  loanSubtype?: string       // 贷款子类型
  channel?: string           // 渠道
  withdrawalDate?: string    // 提现日期
}

export interface CreditWithdrawalListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}
