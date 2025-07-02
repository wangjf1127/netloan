"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import type { ImageMonitoring, ImageMonitoringSearchParams } from "../types"

// 模拟数据
const mockImageMonitoringData: ImageMonitoring[] = [
  {
    id: "1",
    productName: "阳光财险消费",
    businessNumber: "YGCX202506262022000",
    customerName: "吴次回测四",
    certificateNumber: "320382198209108439",
    imageType: "代偿债务与权益转让确认书",
    businessDate: "20300302",
    imageSupplementDate: "2025-06-30 14:30:35.0",
    createTime: "2025-06-28 14:07:39.0",
    imageStatus: "已推送行内"
  },
  {
    id: "2",
    productName: "阳光财险消费",
    businessNumber: "YGCX202506262022000",
    customerName: "吴次回测四",
    certificateNumber: "320382198209108439",
    imageType: "贷路申请书",
    businessDate: "20300302",
    imageSupplementDate: "2025-06-28 15:57:22.0",
    createTime: "2025-06-28 14:07:39.0",
    imageStatus: "已推送行内"
  },
  {
    id: "3",
    productName: "阳光财险消费",
    businessNumber: "YGCX202506262022000",
    customerName: "吴次回测四",
    certificateNumber: "320382198209108439",
    imageType: "代偿债务通知书",
    businessDate: "20300302",
    imageSupplementDate: "2025-06-30 14:30:35.0",
    createTime: "2025-06-28 14:07:39.0",
    imageStatus: "已推送行内"
  },
  {
    id: "4",
    productName: "阳光财险消费",
    businessNumber: "YGCX202506262022000",
    customerName: "吴次回测四",
    certificateNumber: "320382198209108439",
    imageType: "放款凭证",
    businessDate: "20300302",
    imageSupplementDate: "2025-06-30 14:30:35.0",
    createTime: "2025-06-28 14:07:39.0",
    imageStatus: "已推送行内"
  },
  {
    id: "5",
    productName: "阳光财险消费",
    businessNumber: "YGCX202506262022000",
    customerName: "吴次回测四",
    certificateNumber: "320382198209108439",
    imageType: "还款凭证",
    businessDate: "20300302",
    imageSupplementDate: "2025-06-30 14:30:35.0",
    createTime: "2025-06-28 14:07:39.0",
    imageStatus: "已推送行内"
  }
]

// 模拟API调用
const fetchImageMonitoring = async (): Promise<ImageMonitoring[]> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockImageMonitoringData
}

const searchImageMonitoring = async (params: ImageMonitoringSearchParams): Promise<ImageMonitoring[]> => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  let filteredData = [...mockImageMonitoringData]
  
  if (params.productName) {
    filteredData = filteredData.filter(item => 
      item.productName.includes(params.productName!)
    )
  }
  
  if (params.imageType) {
    filteredData = filteredData.filter(item => 
      item.imageType === params.imageType
    )
  }
  
  if (params.imageStatus) {
    filteredData = filteredData.filter(item => 
      item.imageStatus === params.imageStatus
    )
  }
  
  if (params.businessNumber) {
    filteredData = filteredData.filter(item => 
      item.businessNumber.includes(params.businessNumber!)
    )
  }
  
  if (params.customerPhone) {
    // 模拟手机号搜索
    filteredData = filteredData.filter(item => 
      item.customerName.includes(params.customerPhone!)
    )
  }
  
  if (params.customerName) {
    filteredData = filteredData.filter(item => 
      item.customerName.includes(params.customerName!)
    )
  }
  
  if (params.certificateNumber) {
    filteredData = filteredData.filter(item => 
      item.certificateNumber.includes(params.certificateNumber!)
    )
  }
  
  return filteredData
}

export function useImageMonitoring() {
  return useQuery({
    queryKey: ['imageMonitoring'],
    queryFn: fetchImageMonitoring,
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

export function useSearchImageMonitoring() {
  return useMutation({
    mutationFn: searchImageMonitoring,
  })
}

export function useImageMonitoringList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  const { data: imageMonitoringList = [], isLoading, error, refetch } = useImageMonitoring()
  const searchMutation = useSearchImageMonitoring()

  const handleSearch = (params: ImageMonitoringSearchParams) => {
    searchMutation.mutate(params)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setCurrentPage(1)
    refetch()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }

  // 使用搜索结果或默认数据
  const displayData = searchMutation.data || imageMonitoringList
  
  // 分页计算
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = displayData.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    totalCount: displayData.length,
    currentPage,
    pageSize,
    isLoading: isLoading || searchMutation.isPending,
    error,
    handleSearch,
    handleReset,
    handlePageChange,
    handlePageSizeChange
  }
}
