import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { LoanTransaction, LoanTransactionSearchParams } from "../types/loan-transaction"
import { mockLoanTransactionData } from "../data/mock-loan-transaction"

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取贷款交易流水列表
export function useLoanTransaction() {
  return useQuery({
    queryKey: ["loanTransaction"],
    queryFn: async (): Promise<LoanTransaction[]> => {
      await delay(500)
      return mockLoanTransactionData
    },
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

// 搜索贷款交易流水
export function useSearchLoanTransaction() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: LoanTransactionSearchParams): Promise<LoanTransaction[]> => {
      await delay(800)
      
      // 模拟搜索逻辑
      let filteredData = [...mockLoanTransactionData]
      
      if (params.institution) {
        filteredData = filteredData.filter(item => 
          item.institution.includes(params.institution!)
        )
      }
      
      if (params.customerNumber) {
        // 模拟客户号搜索
        filteredData = filteredData.filter(item => 
          item.counterpartAccount.includes(params.customerNumber!)
        )
      }
      
      if (params.loanAccountNumber) {
        filteredData = filteredData.filter(item => 
          item.counterpartAccount.includes(params.loanAccountNumber!)
        )
      }
      
      if (params.receiptNumber) {
        filteredData = filteredData.filter(item => 
          item.receiptNumber.includes(params.receiptNumber!)
        )
      }
      
      if (params.transactionDate) {
        filteredData = filteredData.filter(item => 
          item.transactionDate.includes(params.transactionDate!)
        )
      }
      
      if (params.transactionSerialNumber) {
        filteredData = filteredData.filter(item => 
          item.transactionSerialNumber.includes(params.transactionSerialNumber!)
        )
      }
      
      if (params.counterpartDate) {
        // 模拟对方日期搜索
        filteredData = filteredData.filter(item => 
          item.transactionDate.includes(params.counterpartDate!)
        )
      }
      
      if (params.counterpartSerialNumber) {
        // 模拟对方流水号搜索
        filteredData = filteredData.filter(item => 
          item.transactionSerialNumber.includes(params.counterpartSerialNumber!)
        )
      }
      
      if (params.serviceCode) {
        filteredData = filteredData.filter(item => 
          item.serviceCode.includes(params.serviceCode!)
        )
      }
      
      if (params.transactionStatus) {
        filteredData = filteredData.filter(item => 
          item.transactionStatus.includes(params.transactionStatus!)
        )
      }
      
      return filteredData
    },
    onSuccess: (data) => {
      // 更新缓存
      queryClient.setQueryData(["loanTransaction"], data)
    },
  })
}
