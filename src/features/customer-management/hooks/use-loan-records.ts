import { useQuery } from '@tanstack/react-query'
import { getLoanRecords } from '../data/mock-loan-records'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取客户借据信息
export function useLoanRecords(customerId: string) {
  return useQuery({
    queryKey: ['loanRecords', customerId],
    queryFn: async () => {
      await delay(800) // 模拟网络延迟
      return getLoanRecords(customerId)
    },
    enabled: !!customerId
  })
} 