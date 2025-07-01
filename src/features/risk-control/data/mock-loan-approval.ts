import type { LoanApproval, LoanApprovalDetail } from '../types/loan-approval'

export const mockLoanApprovals: LoanApproval[] = [
  {
    id: '1',
    loanSerialNumber: '100800002555901135857385181008216',
    product: '奇瑞车贷-消费贷(个人消费住担保类贷款)',
    customerId: '204997',
    customerName: '叶双',
    phoneNumber: '13712556174',
    idCard: '421088199602066174',
    applicationTime: '2025-06-25 16:55:09',
    loanAmount: 10000,
    reviewResult: '决策通过',
    status: '已通过'
  },
  {
    id: '2',
    loanSerialNumber: '100800002555901135857220226803022',
    product: '奇瑞车贷-消费贷(个人消费住担保类贷款)',
    customerId: '204997',
    customerName: '叶双',
    phoneNumber: '13712556174',
    idCard: '421088199602066174',
    applicationTime: '2025-06-25 16:40:53',
    loanAmount: 10000,
    reviewResult: '决策通过',
    status: '已通过'
  },
  {
    id: '3',
    loanSerialNumber: '100800002555901135857220226803023',
    product: '奇瑞车贷-消费贷(个人消费住担保类贷款)',
    customerId: '204998',
    customerName: '张三',
    phoneNumber: '13812345678',
    idCard: '421088199603066175',
    applicationTime: '2025-06-24 14:20:15',
    loanAmount: 15000,
    reviewResult: '人工审核',
    status: '审批中'
  }
]

export function getLoanApprovals(): LoanApproval[] {
  return mockLoanApprovals
}

// 贷款审批详情模拟数据
export const mockLoanApprovalDetail: LoanApprovalDetail = {
  id: '1',
  // 基础信息
  loanSerialNumber: '100800002555901135857385181008216',
  customerId: '204997',
  customerName: '叶双',
  phoneNumber: '13712556174',
  idCard: '421088199602066174',
  product: '奇瑞车贷-消费贷(个人消费住担保类贷款)',
  applicationTime: '2025-06-25 16:55:09',
  status: '决策通过',

  // 流程进度
  processProgress: {
    register: '2025-06-25 16:55:09',
    realName: '2025-06-25 16:55:09',
    credit: '2025-06-25 16:55:14'
  },

  // 扫码信息
  scanInfo: '自然进件，无扫码动作',

  // 注册信息
  registerInfo: {
    registerTime: '2025-06-25 16:55:09',
    registerPhone: '13712556174',
    phoneLocation: '广东'
  },

  // 决策结果
  decisionResult: {
    evaluationResult: '通过',
    evaluationRemark: '通过'
  },

  // 事件信息
  eventInfo: {
    eventSerialNumber: '100800002555901135857385181008216-2',
    phoneNumber: '13712556174',
    phoneCity: '东莞',
    ipLocation: '-',
    gpsCoordinates: '0, 0',
    gpsAccuracy: '-9999999',
    eventTime: '2025-06-25 16:55:09'
  },

  // 设备信息
  deviceInfo: null,

  // 渠道信息
  channelInfo: {
    channel: '奇瑞车贷-消费',
    entrance: 'API接口'
  },

  // 其他信息
  otherInfo: {
    phoneLocation: '广东-东莞',
    operator: '中国移动'
  }
}

export function getLoanApprovalDetail(id: string): LoanApprovalDetail {
  // 模拟根据ID获取详情，根据不同ID返回不同状态的数据
  const baseDetail = { ...mockLoanApprovalDetail }

  switch (id) {
    case '2':
      return {
        ...baseDetail,
        id: '2',
        loanSerialNumber: '100800002555901135857220226803022',
        applicationTime: '2025-06-25 16:40:53',
        status: '人工审核',
        decisionResult: {
          evaluationResult: '待审核',
          evaluationRemark: '需要人工审核'
        }
      }
    case '3':
      return {
        ...baseDetail,
        id: '3',
        loanSerialNumber: '100800002555901135857220226803023',
        customerId: '204998',
        customerName: '张三',
        phoneNumber: '13812345678',
        idCard: '421088199603066175',
        applicationTime: '2025-06-24 14:20:15',
        status: '决策拒绝',
        decisionResult: {
          evaluationResult: '拒绝',
          evaluationRemark: '不符合贷款条件'
        }
      }
    default:
      return baseDetail
  }
}
