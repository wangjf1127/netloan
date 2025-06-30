"use client"

import { NotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface CollectionManagementPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function CollectionManagementPage({ sidebarCollapsed, onToggleSidebar }: CollectionManagementPageProps) {
  return (
    <NotImplementedPage
      featureName="催收管理"
      breadcrumbItems={[
        { label: "首页", href: "/" },
        { label: "全流程风险掌控", href: "/risk-control" },
        { label: "贷后管理", href: "/risk-control/post-loan" },
        { label: "催收管理" }
      ]}
      backLink="/risk-control/post-loan"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
