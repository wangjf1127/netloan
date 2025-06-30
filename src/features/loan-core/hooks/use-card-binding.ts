import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { CardBinding, CardBindingSearchParams } from "../types/card-binding"
import { mockCardBindingData } from "../data/mock-card-binding"

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 获取绑卡查询列表
export function useCardBinding() {
  return useQuery({
    queryKey: ["cardBinding"],
    queryFn: async (): Promise<CardBinding[]> => {
      await delay(500)
      return mockCardBindingData
    },
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

// 搜索绑卡查询
export function useSearchCardBinding() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: CardBindingSearchParams): Promise<CardBinding[]> => {
      await delay(800)
      
      // 模拟搜索逻辑
      let filteredData = [...mockCardBindingData]
      
      if (params.institution) {
        filteredData = filteredData.filter(item => 
          item.institution.includes(params.institution!)
        )
      }
      
      if (params.customerId) {
        filteredData = filteredData.filter(item => 
          item.customerNumber.includes(params.customerId!)
        )
      }
      
      if (params.customerName) {
        filteredData = filteredData.filter(item => 
          item.customerName.includes(params.customerName!)
        )
      }
      
      if (params.customerPhone) {
        // 模拟手机号搜索（实际应该在后端处理）
        filteredData = filteredData.filter(item => 
          item.customerNumber.includes(params.customerPhone!)
        )
      }
      
      if (params.certificateNumber) {
        filteredData = filteredData.filter(item => 
          item.certificateNumber.includes(params.certificateNumber!)
        )
      }
      
      return filteredData
    },
    onSuccess: (data) => {
      // 更新缓存
      queryClient.setQueryData(["cardBinding"], data)
    },
  })
}
