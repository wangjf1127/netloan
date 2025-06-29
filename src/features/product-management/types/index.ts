export interface Product {
  id: string
  institution: string
  productSubCode: string
  productSubName: string
  productCode: string
  productName: string
  loanComponentCode: string
  loanComponentName: string
  repaymentComponentCode: string
  repaymentComponentName: string
  interestComponentCode: string
  interestComponentName: string
  repaymentMethod: string
}

export interface ProductSearchParams {
  institution?: string
  productSubCode?: string
  productCode?: string
}
