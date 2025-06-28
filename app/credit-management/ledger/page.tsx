import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditLedgerList } from "@/features/credit-management/components/credit-ledger-list"

export default function CreditLedgerPage() {
  return (
    <MainLayout>
      <CreditLedgerList />
    </MainLayout>
  )
}
