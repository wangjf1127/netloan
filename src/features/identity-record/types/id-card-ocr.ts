export interface IdCardOcrRecord {
  id: string
  recordNumber: string // 记录编号
  frontRecognitionResult: string // 正面识别结果
  backRecognitionResult: string // 反面识别结果
  faceRecognitionResult: string // 人脸识别结果
  inputIdCard: string // 传入身份证号
  recognizedIdCard: string // 识别身份证号
  inputName: string // 传入姓名
  recognizedName: string // 识别姓名
  recordTime: string // 记录发生时间
  primaryChannel: string // 一级渠道
}

export interface IdCardOcrSearchParams {
  recordNumber?: string // 记录编号
  inputIdCard?: string // 传入身份证号
  recordTime?: string // 记录发生时间
  primaryChannel?: string // 一级渠道
  frontRecognitionResult?: string // 正面识别结果
  backRecognitionResult?: string // 反面识别结果
  faceRecognitionResult?: string // 人脸识别结果
}

export interface IdCardOcrListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}
