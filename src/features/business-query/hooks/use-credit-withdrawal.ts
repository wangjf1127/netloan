"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreditWithdrawal, CreditWithdrawalSearchParams } from '../types'

// 模拟额度提现数据
const mockCreditWithdrawals: CreditWithdrawal[] = [
  {
    id: "1",
    customerId: "204997",
    institution: "上海**银行商业银行",
    loanType: "担保类",
    loanSubtype: "信用类-消费贷现金",
    businessChannel: "奇瑞车贷-消费",
    subBusinessChannel: "",
    loanPurpose: "",
    withdrawalAmount: 10000,
    withdrawalDate: "2025-06-26 14:06:13",
    processingResult: "正常",
    remainingDays: 26,
    // 弹窗详情字段
    institutionCode: "00000045",
    customerName: "时杰",
    loanNumber: "999000003367194113014398976000000",
    applicationAmount: 10000,
    loanDirection: "",
    repaymentMethod: "等本还款",
    repaymentDay: 26,
    loanAccount: "40131000833965674"
  },
  {
    id: "2",
    customerId: "204997",
    institution: "上海**银行商业银行",
    loanType: "担保类",
    loanSubtype: "信用类-消费贷现金",
    businessChannel: "奇瑞车贷-消费",
    subBusinessChannel: "",
    loanPurpose: "",
    withdrawalAmount: 10000,
    withdrawalDate: "2025-06-25 18:55:15",
    processingResult: "正常",
    remainingDays: 26,
    // 弹窗详情字段
    institutionCode: "00000045",
    customerName: "时杰",
    loanNumber: "999000003367194113014398976000000",
    applicationAmount: 10000,
    loanDirection: "",
    repaymentMethod: "等本还款",
    repaymentDay: 26,
    loanAccount: "40131000833965674"
  },
  {
    id: "3",
    customerId: "204997",
    institution: "上海**银行商业银行",
    loanType: "担保类",
    loanSubtype: "信用类-消费贷现金",
    businessChannel: "奇瑞车贷-消费",
    subBusinessChannel: "",
    loanPurpose: "",
    withdrawalAmount: 10000,
    withdrawalDate: "2025-06-25 16:40:58",
    processingResult: "正常",
    remainingDays: 26,
    // 弹窗详情字段
    institutionCode: "00000045",
    customerName: "时杰",
    loanNumber: "999000003367194113014398976000000",
    applicationAmount: 10000,
    loanDirection: "",
    repaymentMethod: "等本还款",
    repaymentDay: 26,
    loanAccount: "40131000833965674"
  }
]

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取所有额度提现记录
export function useCreditWithdrawals() {
  return useQuery({
    queryKey: ['creditWithdrawals'],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return mockCreditWithdrawals
    }
  })
}

// 搜索额度提现记录
export function useSearchCreditWithdrawals() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: CreditWithdrawalSearchParams) => {
      await delay(300) // 模拟网络延迟
      
      // 模拟搜索逻辑
      let filteredData = [...mockCreditWithdrawals]
      
      if (params.institution) {
        filteredData = filteredData.filter(item => 
          item.institution.includes(params.institution!)
        )
      }
      
      if (params.customerId) {
        filteredData = filteredData.filter(item => 
          item.customerId.includes(params.customerId!)
        )
      }
      
      if (params.loanType) {
        filteredData = filteredData.filter(item => 
          item.loanType.includes(params.loanType!)
        )
      }
      
      if (params.loanSubtype) {
        filteredData = filteredData.filter(item => 
          item.loanSubtype.includes(params.loanSubtype!)
        )
      }
      
      if (params.processingResult) {
        filteredData = filteredData.filter(item => 
          item.processingResult.includes(params.processingResult!)
        )
      }
      
      if (params.channel) {
        filteredData = filteredData.filter(item => 
          item.businessChannel.includes(params.channel!)
        )
      }
      
      if (params.withdrawalDate) {
        filteredData = filteredData.filter(item => 
          item.withdrawalDate.includes(params.withdrawalDate!)
        )
      }
      
      return filteredData
    },
    onSuccess: (data) => {
      // 更新缓存
      queryClient.setQueryData(['creditWithdrawals'], data)
    }
  })
}
