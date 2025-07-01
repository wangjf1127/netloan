// 贷款审批相关类型定义

export interface LoanApproval {
  id: string
  loanSerialNumber: string     // 贷款流水号
  product: string              // 产品
  customerId: string           // 客户ID
  customerName: string         // 客户姓名
  phoneNumber: string          // 手机号
  idCard: string              // 身份证
  applicationTime: string      // 申请时间
  loanAmount: number           // 贷款金额
  reviewResult: string         // 审核结果
  status: string              // 状态
}

export interface LoanApprovalSearchParams {
  product?: string             // 产品
  loanSerialNumber?: string    // 贷款流水号
  status?: string             // 状态
  customerId?: string         // 客户ID
  customerName?: string       // 客户姓名
  phoneNumber?: string        // 客户手机号
  idCard?: string            // 身份证
  applicationTimeStart?: string // 申请时间开始
  applicationTimeEnd?: string   // 申请时间结束
}

export interface LoanApprovalListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

// 产品选项
export const LOAN_PRODUCT_OPTIONS = [
  { value: "revolving-loan", label: "循环贷" },
  { value: "consumer-loan", label: "消费贷" },
  { value: "business-loan", label: "经营贷" },
] as const

// 状态选项
export const LOAN_STATUS_OPTIONS = [
  { value: "pending", label: "待审批" },
  { value: "approved", label: "已通过" },
  { value: "rejected", label: "已拒绝" },
  { value: "processing", label: "审批中" },
] as const

// 审核结果选项
export const LOAN_REVIEW_RESULT_OPTIONS = [
  { value: "decision-pass", label: "决策通过" },
  { value: "decision-reject", label: "决策拒绝" },
  { value: "manual-review", label: "人工审核" },
  { value: "pending-review", label: "待审核" },
] as const

// 贷款审批详情类型定义
export interface LoanApprovalDetail {
  id: string
  // 基础信息
  loanSerialNumber: string     // 贷款流水号
  customerId: string           // 客户ID
  customerName: string         // 客户姓名
  phoneNumber: string          // 手机号
  idCard: string              // 身份证
  product: string             // 产品
  applicationTime: string      // 申请时间
  status: string              // 状态

  // 流程进度
  processProgress: {
    register: string           // 注册时间
    realName: string          // 实名时间
    credit: string            // 授信时间
  }

  // 扫码信息
  scanInfo: string            // 扫码信息

  // 注册信息
  registerInfo: {
    registerTime: string      // 注册时间
    registerPhone: string     // 注册手机号
    phoneLocation: string     // 手机号归属地
  }

  // 决策结果
  decisionResult: {
    evaluationResult: string  // 评估结果
    evaluationRemark: string  // 评估备注
  }

  // 事件信息
  eventInfo: {
    eventSerialNumber: string // 事件流水号
    phoneNumber: string       // 手机号
    phoneCity: string         // 手机号归属城市
    ipLocation: string        // IP归属地
    gpsCoordinates: string    // GPS坐标
    gpsAccuracy: string       // GPS精度
    eventTime: string         // 时间
  }

  // 设备信息
  deviceInfo: any             // 设备信息（暂时为空）

  // 渠道信息
  channelInfo: {
    channel: string           // 渠道
    entrance: string          // 入口
  }

  // 其他信息
  otherInfo: {
    phoneLocation: string     // 手机归属地
    operator: string          // 运营商
  }
}

export interface LoanApprovalDetailProps {
  approvalId: string
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}
