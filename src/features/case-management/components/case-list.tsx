"use client"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw, Edit, Menu } from "lucide-react"
import Link from "next/link"

interface CaseListProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function CaseList({ sidebarCollapsed, onToggleSidebar }: CaseListProps) {
  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>首页</span>
            <span>/</span>
            <span>案件管理</span>
            <span>/</span>
            <span className="text-gray-900">案件列表</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">管</span>
          </div>
          <span className="text-sm text-gray-700">管理员</span>
        </div>
      </div>

      {/* 搜索表单 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-5 gap-3 mb-3">
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

        <div className="grid grid-cols-4 gap-3 mb-3">
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

        <div className="grid grid-cols-3 gap-3 mb-4">
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
        {/* 案件详情 */}
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/case/1008000025559011358567353471115564"
                className="text-blue-600 font-mono text-lg font-bold hover:text-blue-800 hover:underline"
              >
                1008000025559011358567353471115564
              </Link>
              <span className="text-gray-600">张三</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">提现</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <div className="flex flex-wrap items-center space-x-6">
              <span>客户ID: 204955</span>
              <span>产品消费车贷-消费贷</span>
              <span>业务产品: 个人消费车贷的案例数据</span>
              <span>身份证: 110**********0076</span>
              <span>手机号: 137****4931</span>
            </div>
            <div className="flex items-center space-x-6 mt-2">
              <span className="text-gray-700">申请时间: 2025-06-25 10:06:17</span>
              <span className="text-orange-500 font-medium">金额: 10000</span>
              <span className="text-emerald-400">状态:决策通过</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/case/1008000025559011358567353471115563"
                className="text-blue-600 font-mono text-lg font-bold hover:text-blue-800 hover:underline"
              >
                1008000025559011358567353471115563
              </Link>
              <span className="text-gray-600">张三</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">提现</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <div className="flex flex-wrap items-center space-x-6">
              <span>客户ID: 204955</span>
              <span>产品消费车贷-消费贷</span>
              <span>业务产品: 个人消费车贷的案例数据</span>
              <span>身份证: 110**********0076</span>
              <span>手机号: 137****4931</span>
            </div>
            <div className="flex items-center space-x-6 mt-2">
              <span className="text-gray-700">申请时间: 2025-06-24 10:06:17</span>
              <span className="text-orange-500 font-medium">金额: 10000</span>
              <span className="text-emerald-400">状态:决策通过</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/case/1008000025559011358567353471115562"
                className="text-blue-600 font-mono text-lg font-bold hover:text-blue-800 hover:underline"
              >
                1008000025559011358567353471115562
              </Link>
              <span className="text-gray-600">张三</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">授信</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <div className="flex flex-wrap items-center space-x-6">
              <span>客户ID: 204955</span>
              <span>产品消费车贷-消费贷</span>
              <span>业务产品: 个人消费车贷的案例数据</span>
              <span>身份证: 110**********0076</span>
              <span>手机号: 137****4931</span>
            </div>
            <div className="flex items-center space-x-6 mt-2">
              <span className="text-gray-700">申请时间: 2025-06-23 10:06:17</span>
              <span className="text-orange-500 font-medium">金额: 20000</span>
              <span className="text-emerald-400">状态:决策通过</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
