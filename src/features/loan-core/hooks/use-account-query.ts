import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAccountQueryData, searchAccountQuery } from '../data/mock-account-query'
import type { AccountQuerySearchParams } from '../types'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取账户查询列表
export function useAccountQuery() {
  return useQuery({
    queryKey: ['accountQuery'],
    queryFn: async () => {
      await delay(800) // 模拟网络延迟
      return getAccountQueryData()
    }
  })
}

// 搜索账户查询
export function useSearchAccountQuery() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: AccountQuerySearchParams) => {
      await delay(600) // 模拟网络延迟
      return searchAccountQuery(params)
    },
    onSuccess: (data) => {
      // 更新缓存
      queryClient.setQueryData(['accountQuery'], data)
    }
  })
}
