import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreditApplication, CreditApplicationSearchParams, CreditAgreement, CreditAgreementSearchParams, LoanContract, LoanContractSearchParams } from '../types'

// 模拟数据
const mockCreditApplications: CreditApplication[] = [
  {
    id: '1',
    institution: '上海**银行商业银行',
    productNumber: 'PRD0000004500002',
    businessChannel: '奇瑞车贷-消费',
    subBusinessChannel: '',
    loanType: '担保类',
    loanSubType: '信用类-消费贷现金',
    customerId: '204997',
    customerName: '张三',
    certificateType: '居民身份证',
    certificateNumber: '421081199603066174',
    currency: 'CNY',
    applicationDate: '2023-05-25'
  }
]

// 授信协议模拟数据
const mockCreditAgreements: CreditAgreement[] = [
  {
    id: '1',
    customerId: '204997',
    customerName: '时',
    institution: '00000045',
    loanType: '担保类',
    loanSubType: '信用类-消费贷款',
    productNumber: 'PROD0000004500022',
    rateType: '年利率',
    normalRate: 5.48,
    overdueRate: 8.22,
    compoundRate: 8.22,
    repaymentMethod: '等本还款/等额还款',
    principalCycle: '1M|A|*',
    interestCycle: '1M|A|*',
    totalAmount: 150000,
    effectiveDate: '2025-06-25',
    expiryDate: '2025-07-25',
    accessChannel: 'BL0000026407004SX01',
    subChannel: ''
  }
]

// 贷款合同模拟数据
const mockLoanContracts: LoanContract[] = [
  {
    id: '1',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人信息查询及使用授权书',
    contractNumber: '20250625163943da86219f1caae42',
    contractType: '个人信息查询及使用授权书',
    contractName: '上农-自营个人信息查询及使用授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250625163943da86219f1caae42',
    fileRemark: ''
  },
  {
    id: '2',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人征信授权书',
    contractNumber: '20250625163943fb535eed786cd539',
    contractType: '个人征信授权书',
    contractName: '个人信用信息查询和报送授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250625163943fb535eed786cd539',
    fileRemark: ''
  },
  {
    id: '3',
    customerId: '204997',
    institution: '00000045',
    materialType: '授信额度合同',
    contractNumber: '20250625163950fa5d9c3bc952e91',
    contractType: '授信额度合同',
    contractName: '上海农商银行授信额度合同',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250625163950fa5d9c3bc952e91',
    fileRemark: ''
  },
  {
    id: '4',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人征信授权书',
    contractNumber: '202506251640338a5385c287c71d9',
    contractType: '个人征信授权书',
    contractName: '个人信用信息查询和报送授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '202506251640338a5385c287c71d9',
    fileRemark: ''
  },
  {
    id: '5',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人信息查询及使用授权书',
    contractNumber: '202506251640338f25b99fcad57121',
    contractType: '个人信息查询及使用授权书',
    contractName: '上农-自营个人信息查询及使用授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '202506251640338f25b99fcad57121',
    fileRemark: ''
  },
  {
    id: '6',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人借款合同',
    contractNumber: '2025062516405317647c26dc5ff2f1',
    contractType: '个人借款合同',
    contractName: '个人借款合同',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '2025062516405317647c26dc5ff2f1',
    fileRemark: ''
  },
  {
    id: '7',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人信息查询及使用授权书',
    contractNumber: '20250625185448478185043cd636a',
    contractType: '个人信息查询及使用授权书',
    contractName: '上农-自营个人信息查询及使用授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250625185448478185043cd636a',
    fileRemark: ''
  },
  {
    id: '8',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人征信授权书',
    contractNumber: '20250625185448f96fbafa64805093',
    contractType: '个人征信授权书',
    contractName: '个人信用信息查询和报送授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250625185448f96fbafa64805093',
    fileRemark: ''
  },
  {
    id: '9',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人借款合同',
    contractNumber: '20250625185509ea6ac227cc493160',
    contractType: '个人借款合同',
    contractName: '个人借款合同',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250625185509ea6ac227cc493160',
    fileRemark: ''
  },
  {
    id: '10',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人信息查询及使用授权书',
    contractNumber: '202506261405483e2e099f680f928b',
    contractType: '个人信息查询及使用授权书',
    contractName: '上农-自营个人信息查询及使用授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '202506261405483e2e099f680f928b',
    fileRemark: ''
  },
  {
    id: '11',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人征信授权书',
    contractNumber: '20250626140612a1b2c3d4e5f6789',
    contractType: '个人征信授权书',
    contractName: '个人信用信息查询和报送授权书',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250626140612a1b2c3d4e5f6789',
    fileRemark: ''
  },
  {
    id: '12',
    customerId: '204997',
    institution: '00000045',
    materialType: '个人借款合同',
    contractNumber: '20250626140625b2c3d4e5f6789abc',
    contractType: '个人借款合同',
    contractName: '个人借款合同',
    customerName: '时*',
    applicationNumber: '',
    fileCategory: '',
    fileType: '',
    fileName: '',
    filePath: '20250626140625b2c3d4e5f6789abc',
    fileRemark: ''
  }
]

// 获取授信申请列表
export function useCreditApplications() {
  return useQuery({
    queryKey: ['creditApplications'],
    queryFn: async (): Promise<CreditApplication[]> => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockCreditApplications
    },
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

// 搜索授信申请
export function useSearchCreditApplications() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: CreditApplicationSearchParams): Promise<CreditApplication[]> => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // 模拟搜索逻辑
      return mockCreditApplications.filter(app => {
        const matchesInstitution = !params.institution || app.institution.includes(params.institution)
        const matchesCustomerId = !params.customerId || app.customerId.includes(params.customerId)
        const matchesCustomerName = !params.customerName || app.customerName.includes(params.customerName)
        const matchesCustomerIdCard = !params.customerIdCard || app.certificateNumber.includes(params.customerIdCard)
        const matchesLoanType = !params.loanType || app.loanType === params.loanType
        const matchesLoanSubType = !params.loanSubType || app.loanSubType === params.loanSubType
        const matchesApplicationDate = !params.applicationDate || app.applicationDate === params.applicationDate
        
        return matchesInstitution && matchesCustomerId && matchesCustomerName && 
               matchesCustomerIdCard && matchesLoanType && matchesLoanSubType && 
               matchesApplicationDate
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['creditApplications'], data)
    },
  })
}

// 获取授信协议列表
export function useCreditAgreements() {
  return useQuery({
    queryKey: ['creditAgreements'],
    queryFn: async (): Promise<CreditAgreement[]> => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockCreditAgreements
    },
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

// 搜索授信协议
export function useSearchCreditAgreements() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: CreditAgreementSearchParams): Promise<CreditAgreement[]> => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800))

      // 模拟搜索逻辑
      return mockCreditAgreements.filter(agreement => {
        const matchesInstitution = !params.institution || agreement.institution.includes(params.institution)
        const matchesCustomerId = !params.customerId || agreement.customerId.includes(params.customerId)
        const matchesCustomerName = !params.customerName || agreement.customerName.includes(params.customerName)
        const matchesLoanType = !params.loanType || agreement.loanType === params.loanType
        const matchesLoanSubType = !params.loanSubType || agreement.loanSubType === params.loanSubType
        const matchesEffectiveDate = !params.effectiveDate || agreement.effectiveDate === params.effectiveDate

        return matchesInstitution && matchesCustomerId && matchesCustomerName &&
               matchesLoanType && matchesLoanSubType && matchesEffectiveDate
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['creditAgreements'], data)
    },
  })
}

// 获取贷款合同列表
export function useLoanContracts() {
  return useQuery({
    queryKey: ['loanContracts'],
    queryFn: async (): Promise<LoanContract[]> => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockLoanContracts
    },
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

// 搜索贷款合同
export function useSearchLoanContracts() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: LoanContractSearchParams): Promise<LoanContract[]> => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800))

      // 模拟搜索逻辑
      return mockLoanContracts.filter(contract => {
        const matchesInstitution = !params.institution || contract.institution.includes(params.institution)
        const matchesCustomerId = !params.customerId || contract.customerId.includes(params.customerId)
        const matchesMaterialType = !params.materialType || contract.materialType === params.materialType

        return matchesInstitution && matchesCustomerId && matchesMaterialType
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['loanContracts'], data)
    },
  })
}
