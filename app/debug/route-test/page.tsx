import { MainLayout } from "@/features/layout/components/main-layout"
import Link from "next/link"

export default function RouteTestPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🧪 路由测试页面</h1>
          <p className="text-gray-600 mb-6">
            这个页面用于测试移动端路由是否正常工作。如果您能看到这个页面，说明路由问题已经解决。
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/"
              className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-900">首页</h3>
              <p className="text-sm text-blue-700">案件列表页面</p>
            </Link>
            
            <Link 
              href="/customers"
              className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold text-green-900">客户管理</h3>
              <p className="text-sm text-green-700">客户列表页面</p>
            </Link>
            
            <Link 
              href="/credit-management/ledger"
              className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-semibold text-purple-900">额度台账</h3>
              <p className="text-sm text-purple-700">额度管理页面</p>
            </Link>
            
            <Link 
              href="/credit-management/ledger/demo"
              className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <h3 className="font-semibold text-orange-900">响应式演示</h3>
              <p className="text-sm text-orange-700">响应式设计演示</p>
            </Link>
            
            <Link 
              href="/customers/123"
              className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <h3 className="font-semibold text-red-900">客户详情</h3>
              <p className="text-sm text-red-700">动态路由测试</p>
            </Link>
            
            <Link
              href="/credit-management/ledger/456"
              className="block p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <h3 className="font-semibold text-indigo-900">额度详情</h3>
              <p className="text-sm text-indigo-700">嵌套路由测试</p>
            </Link>

            <Link
              href="/risk-control/pre-loan/credit-approval"
              className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <h3 className="font-semibold text-yellow-900">授信审批 ✅</h3>
              <p className="text-sm text-yellow-700">风险掌控 - 贷前管理 (已修复布局)</p>
            </Link>

            <Link
              href="/risk-control/pre-loan/credit-approval/1"
              className="block p-4 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
            >
              <h3 className="font-semibold text-teal-900">授信审批详情 ✅</h3>
              <p className="text-sm text-teal-700">详情页面 - 决策通过 (绿色印章)</p>
            </Link>

            <Link
              href="/risk-control/pre-loan/credit-approval/2"
              className="block p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <h3 className="font-semibold text-amber-900">人工审核详情 ✅</h3>
              <p className="text-sm text-amber-700">详情页面 - 人工审核 (黄色印章)</p>
            </Link>

            <Link
              href="/risk-control/pre-loan/credit-approval/3"
              className="block p-4 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
            >
              <h3 className="font-semibold text-rose-900">决策拒绝详情 ✅</h3>
              <p className="text-sm text-rose-700">详情页面 - 决策拒绝 (红色印章)</p>
            </Link>

            <Link
              href="/risk-control/during-loan/loan-approval"
              className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-semibold text-purple-900">贷款审批 ✅</h3>
              <p className="text-sm text-purple-700">贷中管理 - 贷款审批列表 (新开发)</p>
            </Link>

            <Link
              href="/risk-control/during-loan/loan-approval/1"
              className="block p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <h3 className="font-semibold text-indigo-900">贷款审批详情 ✅</h3>
              <p className="text-sm text-indigo-700">贷中管理 - 贷款审批详情 (决策通过)</p>
            </Link>

            <Link
              href="/risk-control/during-loan/loan-approval/2"
              className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <h3 className="font-semibold text-yellow-900">人工审核详情 ✅</h3>
              <p className="text-sm text-yellow-700">贷中管理 - 贷款审批详情 (人工审核)</p>
            </Link>

            <Link
              href="/risk-control/during-loan/loan-approval/3"
              className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <h3 className="font-semibold text-red-900">决策拒绝详情 ✅</h3>
              <p className="text-sm text-red-700">贷中管理 - 贷款审批详情 (决策拒绝)</p>
            </Link>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="font-semibold text-yellow-900 mb-2">📱 移动端测试说明</h2>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• 在移动设备上访问上述链接</li>
            <li>• 检查是否能正确跳转到对应页面</li>
            <li>• 确认不会自动跳转到案件列表</li>
            <li>• 测试浏览器前进后退功能</li>
            <li>• 测试直接输入URL访问</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  )
}
