import { create } from 'zustand'
import { mockCustomers } from '../data/mock-customers'
import type { CustomerItem } from '../types'

interface CustomerState {
  customers: CustomerItem[]
  isLoading: boolean
  error: string | null
  fetchCustomers: () => Promise<void>
  searchCustomers: (query: string, customerType?: string, certificateType?: string) => void
}

export const useCustomerStore = create<CustomerState>()((set) => ({
  customers: [],
  isLoading: false,
  error: null,
  
  fetchCustomers: async () => {
    set({ isLoading: true, error: null })
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ customers: mockCustomers, isLoading: false })
    } catch (error) {
      set({ error: '获取客户列表失败', isLoading: false })
    }
  },
  
  searchCustomers: (query: string, customerType?: string, certificateType?: string) => {
    set({ isLoading: true, error: null })
    try {
      // 模拟搜索功能
      const filteredCustomers = mockCustomers.filter(customer => {
        const matchesQuery = !query || 
          customer.customerId.includes(query) || 
          customer.customerName.includes(query) || 
          customer.phoneNumber.includes(query) ||
          customer.idCard.includes(query)
        
        const matchesCustomerType = !customerType || customer.customerType === customerType
        const matchesCertificateType = !certificateType || customer.certificateType === certificateType
        
        return matchesQuery && matchesCustomerType && matchesCertificateType
      })
      
      set({ customers: filteredCustomers, isLoading: false })
    } catch (error) {
      set({ error: '搜索客户失败', isLoading: false })
    }
  }
})) 