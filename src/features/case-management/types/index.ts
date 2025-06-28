export interface CaseItem {
  id: string
  caseNumber: string
  caseType: string
  title: string
  client: string
  status: "pending" | "processing" | "completed" | "cancelled"
  priority: "high" | "medium" | "low"
  createDate: string
  updateDate: string
  assignee: string
  description: string
}

export interface MenuItem {
  id: string
  label: string
  icon: string
  path: string
  children?: MenuItem[]
  badge?: number
}

export interface CaseListProps {
  cases: CaseItem[]
  onCaseSelect?: (caseId: string) => void
}

export interface CaseDetailProps {
  caseId?: string
}

export interface CaseDetailData {
  id: string
  caseNumber: string
  caseType: string
  clientId: string
  clientName: string
  phone: string
  idCard: string
  status: string
  amount: number
  product: string
  businessProduct: string
  applyTime: string
  channel: string
  industry: string
  company: string
  address: string
  creditStatus: string
  contact: {
    name: string
    relation: string
    phone: string
  }
  idCardInfo: {
    nation: string
    validDate: string
    address: string
    issueAuthority: string
  }
  manager: {
    type: string
    name?: string
    contact?: string
    code?: string
  }
  images?: {
    idCardFront?: string
    idCardBack?: string
    bankCard?: string
    other?: string[]
  }
  contract?: {
    content: string
  }
  antifraud?: {
    score: number
    lastOperation: string
    lastDecision: string
    rules?: {
      code: string
      name: string
    }[]
  }
  modelScores?: {
    // 模型分数相关字段
    paymentModelType?: string
    creditQualityModelType?: string
    creditPriceType?: string
    assetQualityModelType?: string
    assetPriceModelType?: string
    appropriateTargetTypeA?: string
    appropriateTargetTypeB?: string
    fraudPreventionModelType?: string
    appropriateTargetTypeC?: string
    creditApplicationTypeA?: string
    creditApplicationTypeB?: string
    targetSelfModelScoreV1?: string
    targetSelfCreditScore?: number
    targetSelfCreditScoreModelScore?: number
    consumerCreditRiskModelScore?: string
    creditRiskLevelScore?: string
    totalRiskControlKv2ModelScore?: string
  }
  creditInfo?: {
    // 授信信息相关字段
    result: string
    productLevel?: string
  }
  limitInfo?: {
    // 额度信息相关字段
    productName?: string
    productId?: string
    approvalAmount: number
    standardRate?: number
    preferentialRate?: number
    actualRate: number
    applicationDate: string
    expiryDate: string
  }
  // 决策流相关字段
  decisionFlows?: {
    flow5?: {
      point: number
      info: string
    }
    flow4?: {
      point: number
      info: string
    }
    flow3?: {
      point: number
      info: string
    }
    flow2?: {
      point: number
      info: string
    }
    flow1?: {
      point: number
      info: string
    }
    flow0?: {
      point: number
      info: string
    }
  }
}
