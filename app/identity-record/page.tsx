"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface IdentityRecordPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function IdentityRecordPage({ sidebarCollapsed, onToggleSidebar }: IdentityRecordPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="实名记录"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
