import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditLedgerDetail } from "@/features/credit-management/components/credit-ledger-detail"

export default function CreditLedgerDemoPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">响应式设计演示</h2>
          <p className="text-sm text-blue-700">
            请调整浏览器窗口大小或使用开发者工具的设备模拟器来查看响应式效果：
          </p>
          <ul className="text-xs text-blue-600 mt-2 space-y-1">
            <li>• 移动端（&lt;768px）：侧边栏抽屉式、卡片布局、垂直排列</li>
            <li>• 平板端（768px-1024px）：2列网格、水平标签页</li>
            <li>• 桌面端（&gt;1024px）：完整表格、3列网格、侧边栏展开</li>
          </ul>
        </div>
        <CreditLedgerDetail creditId="1" />
      </div>
    </MainLayout>
  )
}
