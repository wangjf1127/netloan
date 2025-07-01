import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockCreditApprovals, getCreditApprovalDetail } from '../data/mock-credit-approval'
import type { CreditApproval, CreditApprovalSearchParams, CreditApprovalDetail } from '../types'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取所有授信审批记录
export function useCreditApprovals() {
  return useQuery({
    queryKey: ['creditApprovals'],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return mockCreditApprovals
    }
  })
}

// 搜索授信审批记录
export function useSearchCreditApprovals() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: CreditApprovalSearchParams) => {
      await delay(300) // 模拟网络延迟
      
      // 模拟搜索逻辑
      return mockCreditApprovals.filter(approval => {
        const matchesProduct = !params.product || approval.product.includes(params.product)
        const matchesCreditSerialNumber = !params.creditSerialNumber || 
          approval.creditSerialNumber.includes(params.creditSerialNumber)
        const matchesStatus = !params.status || approval.status === params.status
        const matchesCustomerId = !params.customerId || 
          approval.customerId.includes(params.customerId)
        const matchesCustomerName = !params.customerName || 
          approval.customerName.includes(params.customerName)
        const matchesPhoneNumber = !params.phoneNumber || 
          approval.phoneNumber.includes(params.phoneNumber)
        const matchesIdCard = !params.idCard || 
          approval.idCard.includes(params.idCard)
        
        // 申请时间范围过滤
        let matchesApplicationTime = true
        if (params.applicationTimeStart || params.applicationTimeEnd) {
          const applicationDate = new Date(approval.applicationTime)
          if (params.applicationTimeStart) {
            const startDate = new Date(params.applicationTimeStart)
            matchesApplicationTime = matchesApplicationTime && applicationDate >= startDate
          }
          if (params.applicationTimeEnd) {
            const endDate = new Date(params.applicationTimeEnd)
            matchesApplicationTime = matchesApplicationTime && applicationDate <= endDate
          }
        }
        
        return matchesProduct && matchesCreditSerialNumber && matchesStatus && 
               matchesCustomerId && matchesCustomerName && matchesPhoneNumber && 
               matchesIdCard && matchesApplicationTime
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['creditApprovals'], data)
    },
  })
}

// 获取授信审批详情
export function useCreditApprovalDetail(id: string) {
  return useQuery({
    queryKey: ['creditApprovalDetail', id],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return getCreditApprovalDetail(id)
    },
    enabled: !!id, // 只有当id存在时才执行查询
  })
}
