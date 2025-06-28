import type { CustomerDetail } from "../types"

export const mockCustomerDetail: CustomerDetail = {
  id: "1",
  customerId: "204997",
  customerName: "时欢",
  gender: "女",
  birthDate: "1996-02-06",
  phoneNumber: "13712555174",
  certificateType: "居民身份证",
  certificateNumber: "421081199602066174",
  certificateIssuer: "上海市公安局浦东分局",
  certificateStartDate: "2023-09-23",
  certificateEndDate: "2043-09-23",
  address: "上海市浦东新区新行路340号",
  maritalStatus: "已婚",
  education: "本科",
  isEmployee: "否",
  customerStatus: "正常",
  childrenCount: "1",
  machineId: "00000045",
  // 配偶信息
  spouseName: "张明",
  spouseGender: "男",
  spouseCertificateType: "居民身份证",
  spouseCertificateNumber: "310104199003156635",
  spousePhoneNumber: "13987654321",
  // 单位信息
  companyName: "新东星金融科技有限公司",
  companyAddress: "上海市青浦区红棕路2222号3号",
  department: "技术部",
  position: "工程师",
  monthlyIncome: "1234567"
}

export const getCustomerDetail = (id: string): CustomerDetail => {
  // 这里可以根据ID返回不同的客户详情，目前只返回模拟数据
  return mockCustomerDetail
} 