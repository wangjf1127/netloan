import { LoanDetail } from "../types"

export const mockLoanDetail: LoanDetail = {
  id: "1",
  loanNumber: "9990000033671779408322035712000",
  receiptNumber: "9990000033671779408280092672000",
  productNumber: "PROD0000004500022",
  loanAmount: "10000",
  repaymentAmount: "10000",
  currency: "CNY",
  startDate: "2029-04-29",
  maturityDate: "2030-04-26",
  repaymentMethod: "等本还款",
  repaymentDay: "26",
  totalPeriods: "12",
  remainingPeriods: "12",
  fourthCategoryStatus: "正常",
  fifthCategoryStatus: "次级",
  normalPrincipal: "0",
  overduePrincipal: "0",
  overdueInterest: "10000",
  overdueInterestAmount: "155.27",
  overdueInterestPenalty: "40.34",
  recoveryAmount: "1.96",
  processingStatus: "已处理",
  loanStatus: "正常",
  nextRepaymentDate: "2029-05-26"
}

export const getLoanDetail = (customerId: string, loanId: string): LoanDetail => {
  // 这里可以根据客户ID和借据ID返回不同的借据详情，目前只返回模拟数据
  return mockLoanDetail
} 