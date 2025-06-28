"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, RotateCcw, Menu, Eye, Edit, FileText, Download, Trash2, User } from "lucide-react"
import type { CustomerListProps } from "../types"
import { useCustomers, useSearchCustomers } from "../hooks/use-customers"
import { CustomerListSkeleton } from "./customer-list-skeleton"

export function CustomerList({ sidebarCollapsed, onToggleSidebar }: CustomerListProps) {
  const [customerId, setCustomerId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [certificateNumber, setCertificateNumber] = useState("")
  const [customerType, setCustomerType] = useState("all")
  const [certificateType, setCertificateType] = useState("all")
  const [organization, setOrganization] = useState("all")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  
  const { data: customers = [], isLoading, error, refetch } = useCustomers()
  const searchMutation = useSearchCustomers()

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000) // 显示骨架屏1秒钟，模拟加载过程
    
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    searchMutation.mutate({
      query: customerId,
      customerName,
      phoneNumber,
      certificateNumber,
      customerType: customerType === "all" ? "" : customerType,
      certificateType: certificateType === "all" ? "" : certificateType,
      organization: organization === "all" ? "" : organization
    })
  }

  const handleReset = () => {
    setCustomerId("")
    setCustomerName("")
    setPhoneNumber("")
    setCertificateNumber("")
    setCustomerType("all")
    setCertificateType("all")
    setOrganization("all")
    // 重新获取所有客户数据
    refetch()
  }

  // 显示骨架屏
  if (isInitialLoading) {
    return <CustomerListSkeleton />
  }

  return (
    <div className="flex flex-col h-full">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between mb-4">
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
            <span className="text-gray-900">客户管理</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            返回
          </Link>
        </div>
      </div>

      {/* 搜索区域 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-700 mb-1">机构：</label>
            <Select value={organization} onValueChange={setOrganization}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择机构" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="上海农村商业银行">上海农村商业银行</SelectItem>
                <SelectItem value="北京银行">北京银行</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户ID：</label>
            <Input
              placeholder="请输入客户ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户名称：</label>
            <Input
              placeholder="请输入客户名称"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户手机号：</label>
            <Input
              placeholder="请输入客户手机号"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">证件类型：</label>
            <Select value={certificateType} onValueChange={setCertificateType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择证件类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="居民身份证">居民身份证</SelectItem>
                <SelectItem value="护照">护照</SelectItem>
                <SelectItem value="营业执照">营业执照</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1">证件号码：</label>
            <Input
              placeholder="请输入证件号码"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              className="h-8"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-700 mb-1">客户类型：</label>
            <Select value={customerType} onValueChange={setCustomerType}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="请选择客户类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="个人客户">个人客户</SelectItem>
                <SelectItem value="企业客户">企业客户</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center h-8"
                onClick={handleReset}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                重置
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex items-center h-8 bg-blue-500 hover:bg-blue-600"
                onClick={handleSearch}
                disabled={searchMutation.isPending}
              >
                <Search className="h-3.5 w-3.5 mr-1" />
                {searchMutation.isPending ? "搜索中..." : "查询"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center h-8"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              模板下载
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center h-8"
            >
              <FileText className="h-3.5 w-3.5 mr-1" />
              导入文件
            </Button>
          </div>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading || searchMutation.isPending ? (
          <div className="p-8 text-center">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">获取客户列表失败</div>
        ) : customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">暂无客户数据</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    机构
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户手机号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    证件类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    证件号码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer, index) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      上海农村商业银行
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {customer.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.certificateType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.certificateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.customerType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link href={`/customers/${customer.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          >
                            详情
                          </Button>
                        </Link>
                        <Link href={`/customers/${customer.id}/loan-records`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          >
                            借据信息
                          </Button>
                        </Link>
                        <Link href={`/customers/${customer.id}/repayment-plan`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                          >
                            还款计划
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                        >
                          用户信息更新
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 h-auto"
                        >
                          客户注销
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 