import { useQuery } from '@tanstack/react-query'
import { mockRepaymentPlan } from '../data/mock-repayment-plan'
import type { RepaymentPlanItem } from '../types'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取还款计划
export function useRepaymentPlan(customerId: string) {
  return useQuery({
    queryKey: ['repayment-plan', customerId],
    queryFn: async (): Promise<RepaymentPlanItem[]> => {
      await delay(800) // 模拟网络延迟
      return mockRepaymentPlan
    },
    enabled: !!customerId
  })
}
