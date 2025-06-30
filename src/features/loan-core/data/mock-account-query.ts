import type { AccountQuery, LoanReceiptDetail, LoanTransactionData, InstallmentPaymentData } from "../types"

export const mockAccountQueryData: AccountQuery[] = [
  {
    id: "1",
    institution: "上海**商业银行",
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
    institution: "上海**商业银行",
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
    institution: "上海**商业银行",
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

// 借据详情模拟数据
export const mockLoanReceiptDetail: LoanReceiptDetail = {
  productCode: "PROD0000004500022",
  loanAccountNumber: "9990000033671779408322035712000",
  loanReceiptNumber: "9990000033671779408280092672000",
  contractNumber: "20250625164053f7647c26dc5ff2f1",
  customerId: "204997",
  accountNature: "本人账户",
  loanAmount: 10000,
  currency: "人民币",
  depositAccount: "4013100083396567",
  accountName: "奇司",
  bankCode: "322290000011",
  bankName: "上海**商业银行股份有限公司营业部",
  repaymentMethod: "等本还款",
  interestCycle: "1|M|A|*",
  principalCycle: "1|M|A|E",
  loanTarget: "对私",
  loanTargetDetail: "个人消费贷款",
  fourLevelClassification: "呆滞",
  fourLevelClassificationDate: "2029-08-31",
  fiveLevelClassification: "次级",
  fiveLevelClassificationDate: "2029-08-08",
  interestStartDate: "2029-04-29",
  maturityDate: "2030-04-26",
  normalPrincipal: 0,
  overduePrincipal: 0,
  impairedPrincipal: 10000,
  impairedFlag: "已减值",
  isInterestStopped: "否",
  isCompensated: "否",
  loanBalance: 10000,
  receivableAccruedInterest: 0,
  collectionAccruedInterest: 162.37,
  receivableOverdueInterest: 0,
  collectionOverdueInterest: 155.27,
  receivableAccruedPenalty: 0,
  collectionAccruedPenalty: 40.34,
  receivablePenalty: 0,
  collectionPenalty: 40.34,
  accruedCompoundInterest: 1.96,
  compoundInterest: 1.96,
  deferredInterest: 0,
  writeOffFlag: "否",
  writeOffDate: "",
  writeOffRecoveryStatus: "",
  interestAdjustment: 0,
  currentYearInterestIncome: 0,
  actualInterestIncome: 0,
  receivableLoanFees: 0,
  actualFeeInterestIncome: 0,
  receivableLoanFeePenalty: 0,
  actualFeePenaltyIncome: 0,
  receivableFine: 0,
  fineIncome: 0,
  provision: 0,
  totalPeriods: 12,
  currentPeriod: 0,
  lastRepaymentDate: "",
  nextRepaymentDate: "2029-05-26",
  provisionDate: "2029-09-02",
  interestSettlementDate: ""
}

export function getLoanReceiptDetail(receiptId: string): LoanReceiptDetail {
  // 模拟根据借据ID获取详情，这里返回固定数据
  return mockLoanReceiptDetail
}

// 贷款流水模拟数据
export const mockLoanTransactionData: LoanTransactionData = {
  accountName: "时XX",
  loanAccountNumber: "9990000033671779408322035712000",
  loanReceiptNumber: "9990000033671779408280092672000",
  transactions: [
    {
      id: "1",
      transactionNumber: "36717794079906856",
      counterpartyName: "奇司",
      transactionDate: "2029-04-29",
      loanAmount: 10000,
      repaymentAmount: 0,
      principalRepayment: 0,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 0,
      receivablePenalty: 0,
      collectionPenalty: 0,
      compoundInterest: 0,
      fine: 0,
      prepaymentPrincipal: 0,
      prepaymentInterest: 0
    }
  ],
  totalCount: 1
}

export function getLoanTransactionData(accountId: string): LoanTransactionData {
  // 模拟根据账户ID获取贷款流水，这里返回固定数据
  return mockLoanTransactionData
}

// 期供模拟数据
export const mockInstallmentPaymentData: InstallmentPaymentData = {
  accountName: "时XX",
  loanAccountNumber: "9990000033671779408322035712000",
  loanReceiptNumber: "9990000033671779408280092672000",
  installments: [
    {
      id: "1",
      periodNumber: 1,
      startDate: "2029-04-29",
      dueDate: "2029-05-26",
      initialPrincipal: 833.33,
      initialInterest: 41.1,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 41.1,
      receivablePenalty: 0,
      collectionPenalty: 53.28,
      compoundInterest: 2.63,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "2",
      periodNumber: 2,
      startDate: "2029-05-26",
      dueDate: "2029-06-26",
      initialPrincipal: 833.33,
      initialInterest: 41.86,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 41.86,
      receivablePenalty: 0,
      collectionPenalty: 47.38,
      compoundInterest: 2.38,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "3",
      periodNumber: 3,
      startDate: "2029-06-26",
      dueDate: "2029-07-26",
      initialPrincipal: 833.33,
      initialInterest: 38.06,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 38.06,
      receivablePenalty: 0,
      collectionPenalty: 41.67,
      compoundInterest: 1.9,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "4",
      periodNumber: 4,
      startDate: "2029-07-26",
      dueDate: "2029-08-26",
      initialPrincipal: 833.33,
      initialInterest: 34.25,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 34.25,
      receivablePenalty: 0,
      collectionPenalty: 35.77,
      compoundInterest: 1.47,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "5",
      periodNumber: 5,
      startDate: "2029-08-26",
      dueDate: "2029-09-26",
      initialPrincipal: 833.33,
      initialInterest: 30.44,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 30.44,
      receivablePenalty: 0,
      collectionPenalty: 29.87,
      compoundInterest: 1.09,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "6",
      periodNumber: 6,
      startDate: "2029-09-26",
      dueDate: "2029-10-26",
      initialPrincipal: 833.33,
      initialInterest: 26.64,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 26.64,
      receivablePenalty: 0,
      collectionPenalty: 24.17,
      compoundInterest: 0.77,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "7",
      periodNumber: 7,
      startDate: "2029-10-26",
      dueDate: "2029-11-26",
      initialPrincipal: 833.33,
      initialInterest: 22.83,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 22.83,
      receivablePenalty: 0,
      collectionPenalty: 18.27,
      compoundInterest: 0.5,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "8",
      periodNumber: 8,
      startDate: "2029-11-26",
      dueDate: "2029-12-26",
      initialPrincipal: 833.33,
      initialInterest: 19.03,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 19.03,
      receivablePenalty: 0,
      collectionPenalty: 12.56,
      compoundInterest: 0.29,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "9",
      periodNumber: 9,
      startDate: "2029-12-26",
      dueDate: "2030-01-26",
      initialPrincipal: 833.33,
      initialInterest: 15.22,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 15.22,
      receivablePenalty: 0,
      collectionPenalty: 6.66,
      compoundInterest: 0.12,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    },
    {
      id: "10",
      periodNumber: 10,
      startDate: "2030-01-26",
      dueDate: "2030-02-26",
      initialPrincipal: 833.33,
      initialInterest: 11.42,
      duePrincipal: 833.33,
      receivableOverdueInterest: 0,
      collectionOverdueInterest: 11.42,
      receivablePenalty: 0,
      collectionPenalty: 0.76,
      compoundInterest: 0.01,
      interestAdjustment: 0,
      penaltyAdjustment: 0,
      compoundInterestAdjustment: 0,
      feeAdjustment: 0,
      outstandingInterest: 0,
      outstandingPenalty: 0,
      outstandingCompoundInterest: 0,
      outstandingFees: 0,
      periodStatus: "呆滞"
    }
  ],
  totalCount: 12
}

export function getInstallmentPaymentData(accountId: string): InstallmentPaymentData {
  // 模拟根据账户ID获取期供数据，这里返回固定数据
  return mockInstallmentPaymentData
}
