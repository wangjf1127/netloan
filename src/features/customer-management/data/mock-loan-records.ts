import { LoanRecord } from "../types"

export const mockLoanRecords: LoanRecord[] = [
  {
    id: "1",
    loanNumber: "9990000033671779408322035712000",
    receiptNumber: "9990000033671779408280092672000",
    productNumber: "PROD0000004500022",
    loanAmount: "10000",
    repaymentAmount: "10000",
    nextRepaymentDate: "2029-05-26",
    status: "正常",
    currency: "人民币",
    maturityDate: "2030-05-26"
  },
  {
    id: "2",
    loanNumber: "9990000033671796303983083520000",
    receiptNumber: "9990000033671796303947431936000",
    productNumber: "PROD0000004500022",
    loanAmount: "10000",
    repaymentAmount: "10000",
    nextRepaymentDate: "2029-06-26",
    status: "正常",
    currency: "人民币",
    maturityDate: "2030-06-26"
  },
  {
    id: "3",
    loanNumber: "9990000033671941130181738496000",
    receiptNumber: "9990000033671941130143989760000",
    productNumber: "PROD0000004500022",
    loanAmount: "10000",
    repaymentAmount: "10000",
    nextRepaymentDate: "2029-08-26",
    status: "正常",
    currency: "人民币",
    maturityDate: "2030-08-26"
  }
]

export const getLoanRecords = (customerId: string): LoanRecord[] => {
  // 这里可以根据客户ID返回不同的借据信息，目前只返回模拟数据
  return mockLoanRecords
} 