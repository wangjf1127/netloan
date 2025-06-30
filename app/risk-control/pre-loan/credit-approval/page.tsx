"use client"

import { NotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface CreditApprovalPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function CreditApprovalPage({ sidebarCollapsed, onToggleSidebar }: CreditApprovalPageProps) {
  return (
    <NotImplementedPage
      featureName="授信审批"
      breadcrumbItems={[
        { label: "首页", href: "/" },
        { label: "全流程风险掌控", href: "/risk-control" },
        { label: "贷前管理", href: "/risk-control/pre-loan" },
        { label: "授信审批" }
      ]}
      backLink="/risk-control/pre-loan"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
