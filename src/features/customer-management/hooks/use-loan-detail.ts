import { useQuery } from '@tanstack/react-query'
import { getLoanDetail } from '../data/mock-loan-detail'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取借据详情
export function useLoanDetail(customerId: string, loanId: string) {
  return useQuery({
    queryKey: ['loanDetail', customerId, loanId],
    queryFn: async () => {
      await delay(800) // 模拟网络延迟
      return getLoanDetail(customerId, loanId)
    },
    enabled: !!customerId && !!loanId
  })
} 