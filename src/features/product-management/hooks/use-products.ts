"use client"

import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import type { Product, ProductSearchParams } from "../types"

// 生成129条模拟产品数据
const generateMockProducts = (): Product[] => {
  const baseProducts: Product[] = [
  {
    id: "1",
    institution: "上海**银行商业银行",
    productSubCode: "SPRODSUB00000044",
    productSubName: "鑫E贷(利随本清)",
    productCode: "00000045",
    productName: "",
    loanComponentCode: "PART00000045",
    loanComponentName: "",
    repaymentComponentCode: "PART00000045",
    repaymentComponentName: "",
    interestComponentCode: "PART00000045",
    interestComponentName: "",
    repaymentMethod: "利随本清"
  },
  {
    id: "2",
    institution: "上海**银行商业银行",
    productSubCode: "SPRODSUB00000004",
    productSubName: "鑫E贷【先息后本】",
    productCode: "00000045",
    productName: "",
    loanComponentCode: "PART00000045",
    loanComponentName: "",
    repaymentComponentCode: "PART00000045",
    repaymentComponentName: "",
    interestComponentCode: "PART00000045",
    interestComponentName: "",
    repaymentMethod: "先息后本"
  },
  {
    id: "3",
    institution: "上海**银行商业银行",
    productSubCode: "PRODSUB0000004503",
    productSubName: "鑫E贷[等额本息]",
    productCode: "00000045",
    productName: "",
    loanComponentCode: "PART00000045",
    loanComponentName: "",
    repaymentComponentCode: "PART00000045",
    repaymentComponentName: "",
    interestComponentCode: "PART00000045",
    interestComponentName: "",
    repaymentMethod: "等额还款"
  },
  {
    id: "4",
    institution: "上海**银行商业银行",
    productSubCode: "PRODSUB0000004504",
    productSubName: "鑫E贷[等额本金]",
    productCode: "00000045",
    productName: "",
    loanComponentCode: "PART00000045",
    loanComponentName: "",
    repaymentComponentCode: "PART00000045",
    repaymentComponentName: "",
    interestComponentCode: "PART00000045",
    interestComponentName: "",
    repaymentMethod: "等本还款"
  },
  {
    id: "5",
    institution: "上海**银行商业银行",
    productSubCode: "PRODSUB0000004505",
    productSubName: "鑫E贷[自定义还款]",
    productCode: "00000045",
    productName: "",
    loanComponentCode: "PART00000045",
    loanComponentName: "",
    repaymentComponentCode: "PART00000045",
    repaymentComponentName: "",
    interestComponentCode: "PART00000045",
    interestComponentName: "",
    repaymentMethod: "自定义周期性还本还息"
  },
  {
    id: "6",
    institution: "上海**银行商业银行",
    productSubCode: "SPRODSUB00000039",
    productSubName: "UAT测试",
    productCode: "PROD00000001",
    productName: "",
    loanComponentCode: "PARTPROD0000004500002",
    loanComponentName: "",
    repaymentComponentCode: "PART00000045",
    repaymentComponentName: "",
    interestComponentCode: "PARTPROD0000004500002",
    interestComponentName: "",
    repaymentMethod: "先息后本"
  },
  {
    id: "7",
    institution: "上海**银行商业银行",
    productSubCode: "SPRODSUB00000010",
    productSubName: "鑫e贷[按月付息，到期还本]",
    productCode: "PROD00000045000002",
    productName: "",
    loanComponentCode: "PARTPROD0000004500002",
    loanComponentName: "",
    repaymentComponentCode: "PARTPROD0000004500002",
    repaymentComponentName: "",
    interestComponentCode: "PARTPROD0000004500002",
    interestComponentName: "",
    repaymentMethod: "先息后本"
  },
  {
    id: "8",
    institution: "上海**银行商业银行",
    productSubCode: "SPRODSUB00000013",
    productSubName: "鑫e贷[等额本息]",
    productCode: "PROD00000045000002",
    productName: "",
    loanComponentCode: "PARTPROD0000004500002",
    loanComponentName: "",
    repaymentComponentCode: "PARTPROD0000004500002",
    repaymentComponentName: "",
    interestComponentCode: "PARTPROD0000004500002",
    interestComponentName: "",
    repaymentMethod: "等额还款"
  },
  {
    id: "9",
    institution: "上海**银行商业银行",
    productSubCode: "PRODSUB00000045000002",
    productSubName: "鑫e贷[等额本金]",
    productCode: "PROD00000045000002",
    productName: "",
    loanComponentCode: "PARTPROD0000004500002",
    loanComponentName: "",
    repaymentComponentCode: "PARTPROD0000004500002",
    repaymentComponentName: "",
    interestComponentCode: "PARTPROD0000004500002",
    interestComponentName: "",
    repaymentMethod: "等本还款"
  },
  {
    id: "10",
    institution: "上海**银行商业银行",
    productSubCode: "PRODSUB00000045000003",
    productSubName: "鑫e贷[等额还款]",
    productCode: "PROD00000045000003",
    productName: "",
    loanComponentCode: "PARTPROD0000004500003",
    loanComponentName: "",
    repaymentComponentCode: "PARTPROD0000004500003",
    repaymentComponentName: "",
    interestComponentCode: "PARTPROD0000004500003",
    interestComponentName: "",
    repaymentMethod: "等额还款"
  }
  ]

  // 生成129条数据（复制基础数据并添加序号）
  const products: Product[] = []
  for (let i = 0; i < 129; i++) {
    const baseIndex = i % baseProducts.length
    const baseProduct = baseProducts[baseIndex]
    products.push({
      ...baseProduct,
      id: `${i + 1}`,
      productSubCode: `${baseProduct.productSubCode}_${String(i + 1).padStart(3, '0')}`,
      productCode: `${baseProduct.productCode}_${String(i + 1).padStart(3, '0')}`,
      loanComponentCode: `${baseProduct.loanComponentCode}_${String(i + 1).padStart(3, '0')}`,
      repaymentComponentCode: `${baseProduct.repaymentComponentCode}_${String(i + 1).padStart(3, '0')}`,
      interestComponentCode: `${baseProduct.interestComponentCode}_${String(i + 1).padStart(3, '0')}`
    })
  }

  return products
}

const mockProducts = generateMockProducts()

// 模拟搜索API
const searchProducts = async (params: ProductSearchParams): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)) // 模拟网络延迟
  
  let filteredProducts = mockProducts
  
  if (params.institution) {
    filteredProducts = filteredProducts.filter(product => 
      product.institution.includes(params.institution!)
    )
  }
  
  if (params.productSubCode) {
    filteredProducts = filteredProducts.filter(product => 
      product.productSubCode.toLowerCase().includes(params.productSubCode!.toLowerCase())
    )
  }
  
  if (params.productCode) {
    filteredProducts = filteredProducts.filter(product => 
      product.productCode.toLowerCase().includes(params.productCode!.toLowerCase())
    )
  }
  
  return filteredProducts
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchMutation = useMutation({
    mutationFn: searchProducts,
    onMutate: () => {
      setIsLoading(true)
      setError(null)
    },
    onSuccess: (data) => {
      setProducts(data)
      setIsLoading(false)
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : '搜索失败')
      setIsLoading(false)
    }
  })

  const handleSearch = (params: ProductSearchParams) => {
    searchMutation.mutate(params)
  }

  const handleReset = () => {
    setProducts(mockProducts)
    setError(null)
  }

  // 初始加载
  useEffect(() => {
    setProducts(mockProducts)
  }, [])

  return {
    products,
    isLoading,
    error,
    searchMutation,
    handleSearch,
    handleReset
  }
}
