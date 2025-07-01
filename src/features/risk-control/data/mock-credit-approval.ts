import type { CreditApproval, CreditApprovalDetail } from '../types'

export const mockCreditApprovals: CreditApproval[] = [
  {
    id: '1',
    creditSerialNumber: '100800002559087358572191170723S',
    product: '循环贷-消费贷(个人消费住担保类贷款)',
    customerId: '204997',
    customerName: '叶双',
    phoneNumber: '13712556174',
    idCard: '421088199602066174',
    applicationTime: '2025-06-25 16:39:37',
    creditAmount: 150000,
    reviewResult: '决策通过',
    status: '已通过'
  },
  {
    id: '2',
    creditSerialNumber: '100800002559087358572191170724S',
    product: '循环贷-消费贷(个人消费住担保类贷款)',
    customerId: '204998',
    customerName: '张三',
    phoneNumber: '13812345678',
    idCard: '421088199603066175',
    applicationTime: '2025-06-24 14:20:15',
    creditAmount: 200000,
    reviewResult: '人工审核',
    status: '人工审核'
  },
  {
    id: '3',
    creditSerialNumber: '100800002559087358572191170725S',
    product: '循环贷-消费贷(个人消费住担保类贷款)',
    customerId: '204999',
    customerName: '李四',
    phoneNumber: '13987654321',
    idCard: '421088199604066176',
    applicationTime: '2025-06-23 09:45:22',
    creditAmount: 100000,
    reviewResult: '决策拒绝',
    status: '已拒绝'
  }
]

export function getCreditApprovals(): CreditApproval[] {
  return mockCreditApprovals
}

// 授信审批详情模拟数据
export const mockCreditApprovalDetail: CreditApprovalDetail = {
  id: '1',
  // 基础信息
  creditSerialNumber: '100800002559087358572191170723S',
  customerId: '204997',
  customerName: '叶双',
  phoneNumber: '13712556174',
  idCard: '421088199602066174',
  product: '个人消费住担保类贷款',
  applicationTime: '2025-06-25 16:39:37',
  status: '决策通过',

  // 流程进度
  processProgress: {
    register: '2025-06-25 16:39:37',
    realName: '2025-06-25 16:39:37',
    credit: '2025-06-25 16:39:42'
  },

  // 扫码信息
  scanInfo: '自然进件，无扫码动作',

  // 注册信息
  registerInfo: {
    registerTime: '2025-06-25 16:39:37',
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
    eventSerialNumber: '100800002559087358572191170723S-2',
    phoneNumber: '13712556174',
    phoneCity: '东莞',
    ipLocation: '-',
    gpsCoordinates: '0, 0',
    gpsAccuracy: '-9999999',
    eventTime: '2025-06-25 16:39:37'
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

export function getCreditApprovalDetail(id: string): CreditApprovalDetail {
  // 模拟根据ID获取详情，根据不同ID返回不同状态的数据
  const baseDetail = { ...mockCreditApprovalDetail }

  switch (id) {
    case '2':
      return {
        ...baseDetail,
        id: '2',
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
        status: '决策拒绝',
        decisionResult: {
          evaluationResult: '拒绝',
          evaluationRemark: '不符合授信条件'
        }
      }
    default:
      return baseDetail
  }
}
