import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockCustomers } from '../data/mock-customers'
import type { CustomerItem } from '../types'

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取所有客户
export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      await delay(500) // 模拟网络延迟
      return mockCustomers
    }
  })
}

// 搜索客户
interface SearchCustomersParams {
  query?: string
  customerType?: string
  certificateType?: string
  organization?: string
  customerName?: string
  phoneNumber?: string
  certificateNumber?: string
}

export function useSearchCustomers() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ 
      query, 
      customerType, 
      certificateType, 
      organization,
      customerName,
      phoneNumber,
      certificateNumber
    }: SearchCustomersParams) => {
      await delay(300) // 模拟网络延迟
      
      return mockCustomers.filter(customer => {
        const matchesQuery = !query || 
          customer.customerId.includes(query)
        
        const matchesCustomerName = !customerName ||
          customer.customerName.includes(customerName)
        
        const matchesPhoneNumber = !phoneNumber ||
          customer.phoneNumber.includes(phoneNumber)
        
        const matchesCertificateNumber = !certificateNumber ||
          customer.certificateNumber.includes(certificateNumber)
        
        const matchesCustomerType = !customerType || customerType === 'all' || customer.customerType === customerType
        const matchesCertificateType = !certificateType || certificateType === 'all' || customer.certificateType === certificateType
        const matchesOrganization = !organization || organization === 'all'
        
        return matchesQuery && 
               matchesCustomerType && 
               matchesCertificateType && 
               matchesOrganization && 
               matchesCustomerName && 
               matchesPhoneNumber && 
               matchesCertificateNumber
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['customers'], data)
    }
  })
} 