"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { IdCardOcrRecord, IdCardOcrSearchParams } from "../types/id-card-ocr"

// 模拟数据
const mockIdCardOcrRecords: IdCardOcrRecord[] = [
  {
    id: "1",
    recordNumber: "100800002555909735857219117072235",
    frontRecognitionResult: "成功",
    backRecognitionResult: "成功", 
    faceRecognitionResult: "成功",
    inputIdCard: "421088199602066174",
    recognizedIdCard: "340322199510017480",
    inputName: "时欢",
    recognizedName: "张金叶",
    recordTime: "2025-06-25 16:39:37",
    primaryChannel: "移动端"
  },
  {
    id: "2",
    recordNumber: "100800002555909735857219117072236",
    frontRecognitionResult: "失败",
    backRecognitionResult: "成功",
    faceRecognitionResult: "成功",
    inputIdCard: "421088199602066175",
    recognizedIdCard: "340322199510017481",
    inputName: "李明",
    recognizedName: "王小明",
    recordTime: "2025-06-25 15:30:22",
    primaryChannel: "PC端"
  },
  {
    id: "3",
    recordNumber: "100800002555909735857219117072237",
    frontRecognitionResult: "成功",
    backRecognitionResult: "失败",
    faceRecognitionResult: "失败",
    inputIdCard: "421088199602066176",
    recognizedIdCard: "340322199510017482",
    inputName: "张三",
    recognizedName: "李四",
    recordTime: "2025-06-25 14:20:15",
    primaryChannel: "APP"
  }
]

// 模拟API调用
const fetchIdCardOcrRecords = async (params?: IdCardOcrSearchParams): Promise<IdCardOcrRecord[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  let filteredRecords = mockIdCardOcrRecords
  
  if (params?.recordNumber) {
    filteredRecords = filteredRecords.filter(record => 
      record.recordNumber.includes(params.recordNumber!)
    )
  }
  
  if (params?.inputIdCard) {
    filteredRecords = filteredRecords.filter(record => 
      record.inputIdCard.includes(params.inputIdCard!)
    )
  }
  
  if (params?.primaryChannel) {
    filteredRecords = filteredRecords.filter(record => 
      record.primaryChannel === params.primaryChannel
    )
  }
  
  if (params?.frontRecognitionResult) {
    filteredRecords = filteredRecords.filter(record => 
      record.frontRecognitionResult === params.frontRecognitionResult
    )
  }
  
  if (params?.backRecognitionResult) {
    filteredRecords = filteredRecords.filter(record => 
      record.backRecognitionResult === params.backRecognitionResult
    )
  }
  
  if (params?.faceRecognitionResult) {
    filteredRecords = filteredRecords.filter(record => 
      record.faceRecognitionResult === params.faceRecognitionResult
    )
  }
  
  return filteredRecords
}

export function useIdCardOcrRecords() {
  const [searchParams, setSearchParams] = useState<IdCardOcrSearchParams>({})
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  
  const queryClient = useQueryClient()
  
  const { data: records = [], isLoading, error } = useQuery({
    queryKey: ['idCardOcrRecords', searchParams],
    queryFn: () => fetchIdCardOcrRecords(searchParams),
    staleTime: 5 * 60 * 1000, // 5分钟
  })
  
  const searchMutation = useMutation({
    mutationFn: fetchIdCardOcrRecords,
    onSuccess: (data) => {
      queryClient.setQueryData(['idCardOcrRecords', searchParams], data)
      setCurrentPage(1)
    },
  })
  
  const handleSearch = (params: IdCardOcrSearchParams) => {
    setSearchParams(params)
    searchMutation.mutate(params)
  }
  
  const handleReset = () => {
    const resetParams = {}
    setSearchParams(resetParams)
    queryClient.setQueryData(['idCardOcrRecords', resetParams], mockIdCardOcrRecords)
    setCurrentPage(1)
  }
  
  // 分页数据
  const totalCount = records.length
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedRecords = records.slice(startIndex, endIndex)
  
  return {
    records: paginatedRecords,
    totalCount,
    currentPage,
    pageSize,
    isLoading: isLoading || searchMutation.isPending,
    error,
    handleSearch,
    handleReset,
    setCurrentPage,
    searchMutation
  }
}

export function useSearchIdCardOcrRecords() {
  return useMutation({
    mutationFn: fetchIdCardOcrRecords,
  })
}
