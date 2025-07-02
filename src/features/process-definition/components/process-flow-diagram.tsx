"use client"


import { Card } from "@/components/ui/card"
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"

interface ProcessFlowDiagramProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
  onToggleMobileMenu?: () => void
}

export function ProcessFlowDiagram({
  sidebarCollapsed,
  onToggleSidebar,
  onToggleMobileMenu
}: ProcessFlowDiagramProps) {

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "流程定义", href: "/process-definition" },
    { label: "e鑫汽车消费贷流程" },
  ]

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={breadcrumbItems}
        backLink="/"
      />

      {/* 页面标题 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">e鑫汽车消费贷流程定义</h1>
        <p className="text-gray-600">展示e鑫汽车消费贷业务的完整流程定义和各个环节的详细说明</p>
      </div>

      {/* 流程图卡片 */}
      <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">流程定义</h2>
          <p className="text-gray-600">以下是e鑫汽车消费贷的完整业务流程，包含6个核心环节</p>
        </div>

        {/* 流程说明 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-red-800 mb-2">授信申请</h3>
            <p className="text-red-700 text-sm">客户信息录入验证、授信额度评估、风险评级计算</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-blue-800 mb-2">申请结果查询</h3>
            <p className="text-blue-700 text-sm">查询申请状态进度、获取审核结果详情</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-green-800 mb-2">放款申请</h3>
            <p className="text-green-700 text-sm">放款金额确认、收款账户验证、合同确认</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-orange-800 mb-2">放款结果查询</h3>
            <p className="text-orange-700 text-sm">放款状态查询、成功确认、失败原因分析</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-purple-800 mb-2">绑卡申请</h3>
            <p className="text-purple-700 text-sm">银行卡验证、身份确认、四要素验证</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-yellow-800 mb-2">绑卡结果确认</h3>
            <p className="text-yellow-700 text-sm">绑卡状态查询、成功通知、历史记录</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
