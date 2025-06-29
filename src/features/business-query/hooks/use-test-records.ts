"use client"

import { useState, useEffect } from "react"
import { TestRecord, TestRecordSearchParams } from "../types"

// 模拟测试数据
const mockTestRecords: TestRecord[] = [
  {
    id: "1",
    customerId: "204997",
    institution: "上海**银行商业银行",
    loanType: "担保类",
    loanSubtype: "信用类-消费贷现金",
    businessChannel: "奇瑞车贷-消费",
    subBusinessChannel: "",
    loanPurpose: "",
    withdrawalAmount: 10000,
    withdrawalDate: "2025-06-26 14:06:13",
    processingResult: "正常",
    remainingDays: 26
  },
  {
    id: "2",
    customerId: "204997",
    institution: "上海**银行商业银行",
    loanType: "担保类",
    loanSubtype: "信用类-消费贷现金",
    businessChannel: "奇瑞车贷-消费",
    subBusinessChannel: "",
    loanPurpose: "",
    withdrawalAmount: 10000,
    withdrawalDate: "2025-06-25 18:55:15",
    processingResult: "正常",
    remainingDays: 26
  },
  {
    id: "3",
    customerId: "204997",
    institution: "上海**银行商业银行",
    loanType: "担保类",
    loanSubtype: "信用类-消费贷现金",
    businessChannel: "奇瑞车贷-消费",
    subBusinessChannel: "",
    loanPurpose: "",
    withdrawalAmount: 10000,
    withdrawalDate: "2025-06-25 16:40:58",
    processingResult: "正常",
    remainingDays: 26
  }
]

export function useTestRecords() {
  const [records, setRecords] = useState<TestRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState<TestRecordSearchParams>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  // 模拟数据加载
  useEffect(() => {
    const loadRecords = async () => {
      setLoading(true)
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 简单的搜索过滤逻辑
      let filteredRecords = mockTestRecords
      
      if (searchParams.customerId) {
        filteredRecords = filteredRecords.filter(record => 
          record.customerId.includes(searchParams.customerId!)
        )
      }
      
      if (searchParams.institution) {
        filteredRecords = filteredRecords.filter(record => 
          record.institution.includes(searchParams.institution!)
        )
      }
      
      if (searchParams.processingResult) {
        filteredRecords = filteredRecords.filter(record => 
          record.processingResult === searchParams.processingResult
        )
      }
      
      setRecords(filteredRecords)
      setLoading(false)
    }

    loadRecords()
  }, [searchParams])

  const handleSearch = (params: TestRecordSearchParams) => {
    setSearchParams(params)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchParams({})
    setCurrentPage(1)
  }

  const totalCount = records.length
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedRecords = records.slice(startIndex, endIndex)

  return {
    records: paginatedRecords,
    loading,
    searchParams,
    currentPage,
    pageSize,
    totalCount,
    handleSearch,
    handleReset,
    setCurrentPage
  }
}
