import { useQuery } from '@tanstack/react-query'
import { getCustomerDetail } from '../data/mock-customer-detail'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取客户详情
export function useCustomerDetail(customerId: string) {
  return useQuery({
    queryKey: ['customerDetail', customerId],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return getCustomerDetail(customerId)
    },
    enabled: !!customerId
  })
} 