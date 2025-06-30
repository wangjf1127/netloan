export interface CardBinding {
  id: string
  institution: string
  customerNumber: string
  customerName: string
  certificateNumber: string
}

export interface CardBindingSearchParams {
  institution?: string
  customerId?: string
  customerName?: string
  customerPhone?: string
  certificateNumber?: string
}

export interface CardBindingListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}
