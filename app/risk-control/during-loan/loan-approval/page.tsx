"use client"

import { NotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface LoanApprovalPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function LoanApprovalPage({ sidebarCollapsed, onToggleSidebar }: LoanApprovalPageProps) {
  return (
    <NotImplementedPage
      featureName="贷款审批"
      breadcrumbItems={[
        { label: "首页", href: "/" },
        { label: "全流程风险掌控", href: "/risk-control" },
        { label: "贷中管理", href: "/risk-control/during-loan" },
        { label: "贷款审批" }
      ]}
      backLink="/risk-control/during-loan"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
