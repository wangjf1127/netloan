"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface LoanCorePageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function LoanCorePage({ sidebarCollapsed, onToggleSidebar }: LoanCorePageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="贷款核心"
      parentPath="/"
      parentLabel="首页"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
