import { MainLayout } from "@/features/layout/components/main-layout"
import { CustomerList } from "@/features/customer-management/components/customer-list"

export default function CustomerManagementPage() {
  return (
    <MainLayout>
      <CustomerList />
    </MainLayout>
  )
} 