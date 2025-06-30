export interface Product {
  id: string
  institution: string
  productSubCode: string
  productSubName: string
  productCode: string
  productName: string
  loanComponentCode: string
  loanComponentName: string
  repaymentComponentCode: string
  repaymentComponentName: string
  interestComponentCode: string
  interestComponentName: string
  repaymentMethod: string
}

export interface ProductDetail {
  id: string
  institutionCode: string           // 机构代码
  institutionName: string           // 机构名称
  branchInstitution: string         // 分支机构
  productCode: string               // 产品代码
  productName: string               // 产品名称
  productDescription: string        // 产品描述
  currencyCode: string              // 货币代码
  loanType: string                  // 贷款类型
  loanSubType1: string              // 贷款分类细分1
  loanSubType2?: string             // 贷款分类细分2
  loanTarget: string                // 贷款对象
  businessCategory: string          // 业务分类
  targetScope: string               // 对象范围
  calendarType: string              // 日历类型
  minNormalRate: number             // 最小正常利率%
  maxNormalRate: number             // 最大正常利率%
  minOverdueRate: number            // 最小逾期利率%
  maxOverdueRate: number            // 最大逾期利率%
  minCompoundRate: number           // 最小复息利率%
  maxCompoundRate: number           // 最大复息利率%
  effectiveDate: string             // 生效日期
  expiryDate: string                // 失效日期
  creditType: string                // 额度类型
  productMaxCredit: number          // 产品最大授信额度
  customerMaxCredit: number         // 客户产品最大授信额度
  creditValidYears: number          // 额度有效年份
  productStatus: string             // 产品状态
  repaymentPlan: string             // 还款方式方案

  // 放款信息相关字段
  componentCode?: string            // 部件代码
  componentName?: string            // 部件名称
  minLoanTerm?: string              // 最短贷款期限
  maxLoanTerm?: string              // 最长贷款期限
  maxLoanCount?: number             // 最大放款次数
  fundingSource?: string            // 资金来源
  minAmount?: number                // 每次最小金额
  maxAmount?: number                // 每次最大金额

  // 还款信息相关字段
  interestCycle?: string            // 还息周期
  principalCycle?: string           // 还本周期
  perPaymentCycle?: string          // 按次还款周期
  directPaymentOrder?: string       // 已成直达款顺序
  repaymentOrder?: string           // 还款顺序
  minRepaymentDays?: number         // 还款最小天数
  maxRepaymentDay?: number          // 最大还款日
  fixedRepaymentDay?: number        // 固定还款日
  sameRepaymentDay?: string         // 是否同一还款日
  repaymentDayRule?: string         // 还款日规则
  firstLastSameDay?: string         // 首期与末期是否同日
  monthlyDue?: string               // 每期是否落月
  autoDeductRule?: string           // 自动扣款规则
  autoDeductFlag?: string           // 自动扣款标志
  autoSettleFlag?: string           // 自动结清标志
  multiAccountFlag?: string         // 多还款账户标志
  allowEarlyRepaymentSameDay?: string // 允许提前还当日放款
  allowEarlyRepayment?: string      // 允许提前还款
  earlyRepaymentRule?: string       // 提前还款规则
  earlyRepaymentPeriods?: string    // 提前还款期数
  earlyRepaymentAmountCode?: number // 提前还款可金额号
  earlyRepaymentMinRule?: string    // 提前还款最低金额规则
  earlyRepaymentMinAmount?: string  // 提前还款最低金额取值
  earlyRepaymentMaxRule?: string    // 提前还款最高金额规则
  earlyRepaymentMaxAmount?: string  // 提前还款最高金额取值
  hasGracePeriod?: string           // 是否有宽限期
  principalGraceDays?: number       // 本金宽限期天数
  interestGraceDays?: number        // 利息宽限期天数
}

export interface ProductSearchParams {
  institution?: string
  productSubCode?: string
  productCode?: string
}

export interface ProductDetailProps {
  productId: string
}
