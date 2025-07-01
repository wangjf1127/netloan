"use client"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw, Edit, Menu } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { MobileActionMenu } from "@/shared/components/ui/mobile-action-menu"

interface CaseListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function CaseList({ sidebarCollapsed, onToggleSidebar }: CaseListProps) {
  const isMobile = useIsMobile()

  // 案件数据
  const cases = [
    {
      id: "1008000025559011358567353471115564",
      customerName: "张三",
      type: "提现",
      customerId: "204955",
      product: "产品消费车贷-消费贷",
      businessProduct: "个人消费车贷的案例数据",
      idCard: "110**********0076",
      phone: "137****4931",
      applyTime: "2025-06-25 10:06:17",
      amount: "10000",
      status: "决策通过"
    },
    {
      id: "1008000025559011358567353471115563",
      customerName: "张三",
      type: "提现",
      customerId: "204955",
      product: "产品消费车贷-消费贷",
      businessProduct: "个人消费车贷的案例数据",
      idCard: "110**********0076",
      phone: "137****4931",
      applyTime: "2025-06-24 10:06:17",
      amount: "10000",
      status: "决策通过"
    },
    {
      id: "1008000025559011358567353471115562",
      customerName: "张三",
      type: "授信",
      customerId: "204955",
      product: "产品消费车贷-消费贷",
      businessProduct: "个人消费车贷的案例数据",
      idCard: "110**********0076",
      phone: "137****4931",
      applyTime: "2025-06-23 10:06:17",
      amount: "20000",
      status: "决策通过"
    }
  ]

  // 移动端案件卡片渲染函数
  const renderMobileCaseCard = (caseItem: any) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1 flex-1">
          <Link
            href={`/case/${caseItem.id}`}
            className="text-blue-600 font-mono text-sm font-bold hover:text-blue-800 hover:underline block truncate"
          >
            {caseItem.id}
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 font-medium">{caseItem.customerName}</span>
            <span className={`px-2 py-1 rounded text-xs ${
              caseItem.type === '提现' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {caseItem.type}
            </span>
          </div>
        </div>
        <MobileActionMenu
          actions={[
            {
              label: '查看详情',
              onClick: () => window.location.href = `/case/${caseItem.id}`
            }
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">客户ID</div>
          <div className="font-medium">{caseItem.customerId}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">身份证</div>
          <div className="font-medium">{caseItem.idCard}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">手机号</div>
          <div className="font-medium">{caseItem.phone}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">金额</div>
          <div className="font-medium text-orange-500">{caseItem.amount}</div>
        </div>
      </div>

      <div className="space-y-1 text-sm">
        <div className="text-gray-500">申请时间</div>
        <div className="text-gray-700">{caseItem.applyTime}</div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="text-emerald-400 font-medium">状态: {caseItem.status}</div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "案件管理" },
          { label: "案件列表" }
        ]}
        onToggleSidebar={onToggleSidebar}
        backLink="/"
      />

      {/* 搜索表单 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
          {/* 第一行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">产品：</label>
            <Select>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="产品" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product1">360助贷</SelectItem>
                <SelectItem value="product2">蚂蚁花呗</SelectItem>
                <SelectItem value="product2">奇瑞车贷消费贷</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">业务产品：</label>
            <Select>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business1">个人经营性担保类</SelectItem>
                <SelectItem value="business2">个人消费性担保类</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">合同记录编号：</label>
            <Input placeholder="" className="h-8" />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">类型：</label>
            <Select defaultValue="simulation">
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simulation">提现</SelectItem>
                <SelectItem value="real">授信</SelectItem>
                <SelectItem value="real">面签</SelectItem>
                <SelectItem value="real">尽调</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">状态：</label>
            <Select defaultValue="all">
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="pending">决策通过</SelectItem>
                <SelectItem value="processing">决策拒绝</SelectItem>
                <SelectItem value="completed">处理中</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {/* 第二行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户姓名：</label>
            <Input placeholder="" className="h-8" />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户ID：</label>
            <Input placeholder="" className="h-8" />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户手机号：</label>
            <Input placeholder="" className="h-8" />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">身份证：</label>
            <Input placeholder="" className="h-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {/* 第三行 */}
          <div>
            <label className="block text-xs text-gray-700 mb-1">授信金额（元）：</label>
            <div className="flex items-center space-x-2">
              <Input placeholder="最小值" className="h-8" />
              <span className="text-gray-500">-</span>
              <Input placeholder="最大值" className="h-8" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">授信金额（元）：</label>
            <div className="flex items-center space-x-2">
              <Input placeholder="最小值" className="h-8" />
              <span className="text-gray-500">-</span>
              <Input placeholder="最大值" className="h-8" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">时间：</label>
            <div className="flex items-center space-x-2">
              <Input placeholder="年/月/日" type="date" className="h-8" />
              <span className="text-gray-500">-</span>
              <Input placeholder="年/月/日" type="date" className="h-8" />
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center space-x-3">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-8">
            <Search className="mr-2 h-3 w-3" />
            查询
          </Button>
          <Button variant="outline" className="px-4 h-8">
            <RotateCcw className="mr-2 h-3 w-3" />
            清空
          </Button>
        </div>
      </div>

      {/* 搜索结果 */}
      <div className="bg-white rounded-lg border border-gray-200">
        {isMobile ? (
          // 移动端卡片布局
          <div className="p-4 space-y-4">
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                {renderMobileCaseCard(caseItem)}
              </div>
            ))}
          </div>
        ) : (
          // 桌面端原有布局
          <>
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="mb-4">
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/case/${caseItem.id}`}
                      className="text-blue-600 font-mono text-lg font-bold hover:text-blue-800 hover:underline"
                    >
                      {caseItem.id}
                    </Link>
                    <span className="text-gray-600">{caseItem.customerName}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      caseItem.type === '提现' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {caseItem.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                  <div className="flex flex-wrap items-center space-x-6">
                    <span>客户ID: {caseItem.customerId}</span>
                    <span>{caseItem.product}</span>
                    <span>业务产品: {caseItem.businessProduct}</span>
                    <span>身份证: {caseItem.idCard}</span>
                    <span>手机号: {caseItem.phone}</span>
                  </div>
                  <div className="flex items-center space-x-6 mt-2">
                    <span className="text-gray-700">申请时间: {caseItem.applyTime}</span>
                    <span className="text-orange-500 font-medium">金额: {caseItem.amount}</span>
                    <span className="text-emerald-400">状态: {caseItem.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
