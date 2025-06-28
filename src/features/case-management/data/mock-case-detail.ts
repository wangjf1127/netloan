import type { CaseDetailData } from "../types"

export const mockCaseDetail: CaseDetailData = {
  id: "1",
  caseNumber: "1008000025559087358572191170723",
  caseType: "授信",
  clientId: "204997",
  clientName: "时欢",
  phone: "137****6174",
  idCard: "421********6174",
  status: "决策通过",
  amount: 150000.00,
  product: "消费车贷-抵押贷",
  businessProduct: "个人消费性抵押车贷款",
  applyTime: "2025-06-25 16:39:37",
  channel: "渠道",
  industry: "水、电、暖、气、烟草、石化行业公司",
  company: "新华安全融科技有限公司",
  address: "上海市黄浦区汉口路222号2号",
  creditStatus: "未查",
  contact: {
    name: "张均工",
    relation: "朋友",
    phone: "152****1222"
  },
  idCardInfo: {
    nation: "汉",
    validDate: "20230923-20430923",
    address: "上海市浦东新区新行南路340号",
    issueAuthority: "上海市公安局浦东分局"
  },
  manager: {
    type: "客户经理",
    name: "--",
    contact: "--",
    code: "--"
  },
  images: {
    idCardFront: "/placeholder.jpg",
    idCardBack: "/placeholder.jpg",
    bankCard: "/placeholder.jpg",
    other: ["/placeholder.jpg"]
  },
  contract: {
    content: "上海农商银行授信合同 上述本行个人信息查询及使用授权书 个人信用信息查询报告授权书"
  },
  antifraud: {
    score: 0,
    lastOperation: "通过",
    lastDecision: "接受",
    rules: []
  },
  modelScores: {
    paymentModelType: "--",
    creditQualityModelType: "--",
    creditPriceType: "--",
    assetQualityModelType: "--",
    assetPriceModelType: "--",
    appropriateTargetTypeA: "--",
    appropriateTargetTypeB: "--",
    fraudPreventionModelType: "--",
    appropriateTargetTypeC: "--",
    creditApplicationTypeA: "--",
    creditApplicationTypeB: "--",
    targetSelfModelScoreV1: "--",
    targetSelfCreditScore: 9999999,
    targetSelfCreditScoreModelScore: 9999999,
    consumerCreditRiskModelScore: "--",
    creditRiskLevelScore: "--",
    totalRiskControlKv2ModelScore: "--"
  },
  creditInfo: {
    result: "通过",
    productLevel: "--"
  },
  limitInfo: {
    productName: "--",
    productId: "PRCD0000004500022",
    approvalAmount: 150000,
    standardRate: 5.48,
    preferentialRate: 8.22,
    actualRate: 8.22,
    applicationDate: "2025-07-25 16:39:49",
    expiryDate: "2025-08-25 16:39:49"
  },
  decisionFlows: {
    flow5: {
      point: 5,
      info: ""
    },
    flow4: {
      point: 4,
      info: "[\"VIN 选定车型车300\",\"车标基础值(model)车300\",\"车标指定价(model)车300\"]"
    },
    flow3: {
      point: 3,
      info: "[\"VIN 归到车型che300\"]"
    },
    flow2: {
      point: 2,
      info: "[\"三网在线时长接口联通火爆\",\"三网在线状态接口联通火爆\"]"
    },
    flow1: {
      point: 1,
      info: "[\"芝法 司法风险 个人精确画像反应良好\",\"上农-二代征信待征生数据查询上农-二代征信\",\"上农-二代征信待征生数据查询上农-二代征信\",\"上农-二代征信待征生数据查询上农-二代征信\",\"上农-二代征信待征得分生数据查询上农-二代征信\",\"上农天眼查入件应商20\",\"个人工商信息分析元素\",\"企业工商信息查询元素\"]"
    },
    flow0: {
      point: 0,
      info: "[\"三网三要素接口联通火爆\",\"上农二代征信待征生数据查询上农二代征信\"]"
    }
  }
} 