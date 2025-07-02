export interface ImageMonitoring {
  id: string
  productName: string
  businessNumber: string
  customerName: string
  certificateNumber: string
  imageType: string
  businessDate: string
  imageSupplementDate: string
  createTime: string
  imageStatus: string
}

export interface ImageMonitoringSearchParams {
  startDate?: string
  endDate?: string
  productName?: string
  imageType?: string
  imageStatus?: string
  businessNumber?: string
  customerPhone?: string
  customerName?: string
  certificateNumber?: string
  uin?: string
  trx?: string
}

export const IMAGE_TYPES = [
  "代偿债务与权益转让确认书",
  "贷路申请书", 
  "代偿债务通知书",
  "放款凭证",
  "还款凭证"
] as const

export const IMAGE_STATUS = [
  "已推送行内",
  "待推送",
  "推送失败"
] as const

export const PRODUCT_NAMES = [
  "阳光财险消费"
] as const
