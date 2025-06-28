import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockCreditLedger } from '../data/mock-credit-ledger'
import type { CreditLedgerItem, CreditLedgerFilters } from '../types'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取所有额度台账
export function useCreditLedger() {
  return useQuery({
    queryKey: ['creditLedger'],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return mockCreditLedger
    }
  })
}

// 搜索额度台账
export function useSearchCreditLedger() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (filters: CreditLedgerFilters) => {
      await delay(300) // 模拟网络延迟
      
      return mockCreditLedger.filter(item => {
        const matchesInstitution = !filters.institution || 
          filters.institution === 'all' || 
          item.institution.includes(filters.institution)
        
        const matchesCustomerId = !filters.customerId ||
          item.customerId.includes(filters.customerId)
        
        const matchesCustomerName = !filters.customerName ||
          item.customerName.includes(filters.customerName)
        
        const matchesCustomerPhone = !filters.customerPhone ||
          item.customerId.includes(filters.customerPhone) // 这里用customerId模拟手机号搜索
        
        const matchesCustomerIdCard = !filters.customerIdCard ||
          item.customerId.includes(filters.customerIdCard) // 这里用customerId模拟身份证搜索
        
        const matchesLedgerStatus = !filters.ledgerStatus || 
          filters.ledgerStatus === 'all' || 
          item.ledgerStatus === filters.ledgerStatus
        
        const matchesLoanType = !filters.loanType || 
          filters.loanType === 'all' || 
          item.loanType === filters.loanType
        
        const matchesLoanSubType = !filters.loanSubType || 
          filters.loanSubType === 'all' || 
          item.loanSubType === filters.loanSubType
        
        const matchesCreditType = !filters.creditType || 
          filters.creditType === 'all' || 
          item.creditType === filters.creditType
        
        return matchesInstitution && 
               matchesCustomerId && 
               matchesCustomerName && 
               matchesCustomerPhone && 
               matchesCustomerIdCard && 
               matchesLedgerStatus && 
               matchesLoanType && 
               matchesLoanSubType && 
               matchesCreditType
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['creditLedger'], data)
    }
  })
}

// 获取单个额度台账详情
export function useCreditLedgerDetail(creditId: string) {
  return useQuery({
    queryKey: ['creditLedgerDetail', creditId],
    queryFn: async () => {
      await delay(400) // 模拟网络延迟
      const item = mockCreditLedger.find(item => item.id === creditId)
      if (!item) {
        throw new Error('额度台账不存在')
      }
      return item
    },
    enabled: !!creditId
  })
}
