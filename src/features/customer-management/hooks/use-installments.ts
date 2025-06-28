import { useQuery } from '@tanstack/react-query'
import { mockInstallments } from '../data/mock-installments'
import type { InstallmentItem } from '../types'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取期供列表
export function useInstallments(loanNumber: string) {
  return useQuery({
    queryKey: ['installments', loanNumber],
    queryFn: async (): Promise<InstallmentItem[]> => {
      await delay(600) // 模拟网络延迟
      return mockInstallments
    },
    enabled: !!loanNumber
  })
}
