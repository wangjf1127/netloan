"use client"

import { useQuery } from "@tanstack/react-query"
import type { ProductDetail } from "../types"

// 模拟产品详情数据
const mockProductDetail: ProductDetail = {
  id: "1",
  institutionCode: "00000045",
  institutionName: "上海**商业银行",
  branchInstitution: "00004",
  productCode: "00000045",
  productName: "鑫E贷",
  productDescription: "在线零售消费贷款",
  currencyCode: "CNY",
  loanType: "信用类",
  loanSubType1: "信用类-消费贷现金",
  loanSubType2: "",
  loanTarget: "对私",
  businessCategory: "自营贷款",
  targetScope: "个人消费贷款",
  calendarType: "对私营业日历",
  minNormalRate: 3.8,
  maxNormalRate: 24,
  minOverdueRate: 5.7,
  maxOverdueRate: 24,
  minCompoundRate: 5.7,
  maxCompoundRate: 24,
  effectiveDate: "2019-04-22",
  expiryDate: "2099-04-22",
  creditType: "循环额度",
  productMaxCredit: 0,
  customerMaxCredit: 200000,
  creditValidYears: 3,
  productStatus: "正常",
  repaymentPlan: '["1":[1,3,6,9,12,18,24,30,36,42,48,54,60],"2":[1,3,6,9,12,18,24,30,36,42,48,54,60],"3":["1":[1,3,6,9,12,18,24,30,36,42,48,54,60],"4":[1,3,6,9,12,18,24,30,36,42,48,54,60],"5":[1,3,6,9,12,18,24,30,36,42,48,54,60]]]',

  // 放款信息相关字段
  componentCode: "PART00000045",
  componentName: "",
  minLoanTerm: "1D",
  maxLoanTerm: "7Y",
  maxLoanCount: undefined,
  fundingSource: "自有资金",
  minAmount: 500,
  maxAmount: 100000,

  // 还款信息相关字段
  interestCycle: "1|M|A|*",
  principalCycle: "3|Y|A|*",
  perPaymentCycle: "1|D|A|*",
  directPaymentOrder: "02CACDOPCRC",
  repaymentOrder: "00RCCIPRDRCA",
  minRepaymentDays: 15,
  maxRepaymentDay: 28,
  fixedRepaymentDay: 6,
  sameRepaymentDay: "是",
  repaymentDayRule: "固定还款日（借款日晚于于最大还款日）",
  firstLastSameDay: "否",
  monthlyDue: "",
  autoDeductRule: "部分扣款",
  autoDeductFlag: "否",
  autoSettleFlag: "是",
  multiAccountFlag: "是",
  allowEarlyRepaymentSameDay: "允许",
  allowEarlyRepayment: "允许",
  earlyRepaymentRule: "不控制",
  earlyRepaymentPeriods: "随时",
  earlyRepaymentAmountCode: 45,
  earlyRepaymentMinRule: "不适用",
  earlyRepaymentMinAmount: "",
  earlyRepaymentMaxRule: "不适用",
  earlyRepaymentMaxAmount: "",
  hasGracePeriod: "是",
  principalGraceDays: 3,
  interestGraceDays: 3
}

// 模拟API调用
const fetchProductDetail = async (productId: string): Promise<ProductDetail> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // 在真实环境中，这里会调用实际的API
  return mockProductDetail
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5分钟
    gcTime: 10 * 60 * 1000, // 10分钟
  })
}
