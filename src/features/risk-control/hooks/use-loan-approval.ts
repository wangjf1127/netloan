import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockLoanApprovals, getLoanApprovalDetail } from '../data/mock-loan-approval'
import type { LoanApproval, LoanApprovalSearchParams, LoanApprovalDetail } from '../types/loan-approval'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取所有贷款审批记录
export function useLoanApprovals() {
  return useQuery({
    queryKey: ['loanApprovals'],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return mockLoanApprovals
    }
  })
}

// 搜索贷款审批记录
export function useSearchLoanApprovals() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: LoanApprovalSearchParams) => {
      await delay(300) // 模拟网络延迟
      
      // 模拟搜索逻辑
      return mockLoanApprovals.filter(approval => {
        const matchesProduct = !params.product || approval.product.includes(params.product)
        const matchesLoanSerialNumber = !params.loanSerialNumber || 
          approval.loanSerialNumber.includes(params.loanSerialNumber)
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
        
        return matchesProduct && matchesLoanSerialNumber && matchesStatus && 
               matchesCustomerId && matchesCustomerName && matchesPhoneNumber && 
               matchesIdCard && matchesApplicationTime
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['loanApprovals'], data)
    },
  })
}

// 获取贷款审批详情
export function useLoanApprovalDetail(id: string) {
  return useQuery({
    queryKey: ['loanApprovalDetail', id],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return getLoanApprovalDetail(id)
    },
    enabled: !!id, // 只有当id存在时才执行查询
  })
}
