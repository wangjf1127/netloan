import type { AccountQuery } from "../types"

export const mockAccountQueryData: AccountQuery[] = [
  {
    id: "1",
    institution: "上海农村商业银行",
    customerId: "204997",
    loanAccountNumber: "9990000033671779408322035712000",
    loanReceiptNumber: "9990000033671779408280092672000",
    primaryChannelNumber: "FZ00002",
    coreProductNumber: "PROD0000004500022",
    loanAmount: 10000,
    loanBalance: 10000,
    currency: "人民币",
    startDate: "2029-04-29",
    maturityDate: "2030-04-26",
    nextRepaymentDate: "2029-05-26",
    repaymentMethod: "等本还款",
    accountStatus: "正常",
    processingFlag: "已处理"
  },
  {
    id: "2",
    institution: "上海农村商业银行",
    customerId: "204997",
    loanAccountNumber: "9990000033671796303983083520000",
    loanReceiptNumber: "9990000033671796303947431936000",
    primaryChannelNumber: "FZ00002",
    coreProductNumber: "PROD0000004500022",
    loanAmount: 10000,
    loanBalance: 10000,
    currency: "人民币",
    startDate: "2029-05-28",
    maturityDate: "2030-05-26",
    nextRepaymentDate: "2029-06-26",
    repaymentMethod: "等本还款",
    accountStatus: "正常",
    processingFlag: "已处理"
  },
  {
    id: "3",
    institution: "上海农村商业银行",
    customerId: "204997",
    loanAccountNumber: "9990000033671941130181738496000",
    loanReceiptNumber: "9990000033671941130143989760000",
    primaryChannelNumber: "FZ00002",
    coreProductNumber: "PROD0000004500022",
    loanAmount: 10000,
    loanBalance: 10000,
    currency: "人民币",
    startDate: "2029-08-08",
    maturityDate: "2030-07-26",
    nextRepaymentDate: "2029-08-26",
    repaymentMethod: "等本还款",
    accountStatus: "正常",
    processingFlag: "已处理"
  }
]

export function getAccountQueryData(): AccountQuery[] {
  return mockAccountQueryData
}

export function searchAccountQuery(params: any): AccountQuery[] {
  let results = [...mockAccountQueryData]
  
  // 根据搜索参数过滤数据
  if (params.institution) {
    results = results.filter(item => 
      item.institution.includes(params.institution)
    )
  }
  
  if (params.customerId) {
    results = results.filter(item => 
      item.customerId.includes(params.customerId)
    )
  }
  
  if (params.loanAccountNumber) {
    results = results.filter(item => 
      item.loanAccountNumber.includes(params.loanAccountNumber)
    )
  }
  
  if (params.loanReceiptNumber) {
    results = results.filter(item => 
      item.loanReceiptNumber.includes(params.loanReceiptNumber)
    )
  }
  
  if (params.accountName) {
    // 账户名称搜索逻辑（这里简化处理）
    results = results.filter(item => 
      item.customerId.includes(params.accountName)
    )
  }
  
  if (params.accountStatus) {
    results = results.filter(item => 
      item.accountStatus === params.accountStatus
    )
  }
  
  if (params.processingFlag) {
    results = results.filter(item => 
      item.processingFlag === params.processingFlag
    )
  }
  
  return results
}
