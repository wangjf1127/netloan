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
}

export interface ProductSearchParams {
  institution?: string
  productSubCode?: string
  productCode?: string
}

export interface ProductDetailProps {
  productId: string
}
