"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { Menu, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { useCustomerDetail } from "../hooks/use-customer-detail"
import { CustomerDetailSkeleton } from "./customer-detail-skeleton"
import type { CustomerDetailProps } from "../types"
import { maskSensitiveData } from "@/lib/utils"
import { FeatureNotImplemented } from "@/shared/components/ui/feature-not-implemented"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { MobileTabSelector } from "@/shared/components/ui/mobile-tab-selector"

export function CustomerDetail({ customerId }: CustomerDetailProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("basic-info")
  const isMobile = useIsMobile()

  const { data: customer, isLoading, error } = useCustomerDetail(customerId)

  // 页签配置
  const allTabs = [
    { value: "basic-info", label: "基本信息", icon: "📋" },
    { value: "other-info", label: "其它证件信息", icon: "📄" },
    { value: "house-info", label: "房产信息", icon: "🏠" },
    { value: "car-info", label: "车位信息", icon: "🚗" },
    { value: "family-info", label: "家庭资产信息", icon: "👨‍👩‍👧‍👦" },
    { value: "unit-info", label: "单位信息", icon: "🏢" },
    { value: "contact-info", label: "联系人信息", icon: "📞" }
  ]

  // 移动端优先显示的页签
  const primaryTabs = ["basic-info", "unit-info", "contact-info"]

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000) // 显示骨架屏1秒钟，模拟加载过程
    
    return () => clearTimeout(timer)
  }, [])

  // 显示骨架屏
  if (isInitialLoading || isLoading) {
    return <CustomerDetailSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/customers" className="hover:text-blue-600">客户管理</Link>
              <span>/</span>
              <span className="text-gray-900">客户详情</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/customers" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-red-500">
          获取客户详情失败
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/customers" className="hover:text-blue-600">客户管理</Link>
              <span>/</span>
              <span className="text-gray-900">客户详情</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/customers" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-gray-500">
          未找到客户信息
        </div>
      </div>
    )
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
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/customers" className="hover:text-blue-600">客户管理</Link>
            <span>/</span>
            <span className="text-gray-900">客户详情</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/customers" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Link>
        </div>
      </div>

      {/* 标签页导航 */}
      <Tabs defaultValue="basic-info" value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isMobile ? (
          // 移动端使用底部弹窗选择器
          <MobileTabSelector
            tabs={allTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            primaryTabs={primaryTabs}
          />
        ) : (
          // 桌面端保持原有页签布局
          <TabsList className="bg-white border-b border-gray-200 rounded-none p-0 flex justify-start">
            <TabsTrigger
              value="basic-info"
              className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
            >
              基本信息
            </TabsTrigger>
            <TabsTrigger
              value="other-info"
              className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
            >
              其它证件信息
            </TabsTrigger>
            <TabsTrigger
              value="house-info"
              className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
            >
              房产信息
            </TabsTrigger>
            <TabsTrigger
              value="car-info"
              className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
            >
              车位信息
            </TabsTrigger>
            <TabsTrigger
              value="family-info"
              className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
            >
              家庭资产信息
            </TabsTrigger>
            <TabsTrigger
              value="unit-info"
              className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
            >
              单位信息
            </TabsTrigger>
            <TabsTrigger
              value="contact-info"
              className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
            >
              联系人信息
            </TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="basic-info" className="mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="text-lg font-medium mb-4">基本信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">核心客户号：</span>
                  <span className="font-medium">{customer.customerId}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">客户名称：</span>
                  <span className="font-medium">{maskSensitiveData(customer.customerName, 'name')}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">出生日期：</span>
                  <span className="font-medium">{customer.birthDate}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">婚姻状况：</span>
                  <span className="font-medium">{customer.maritalStatus || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">是否本行员工：</span>
                  <span className="font-medium">{customer.isEmployee || '未知'}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">机构：</span>
                  <span className="font-medium">{customer.machineId}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">性别：</span>
                  <span className="font-medium">{customer.gender}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">最高学历：</span>
                  <span className="font-medium">{customer.education || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">子女个数：</span>
                  <span className="font-medium">{customer.childrenCount || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">客户状态：</span>
                  <span className="font-medium">{customer.customerStatus || '未知'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="text-lg font-medium mb-4">证件信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">证件类型：</span>
                  <span className="font-medium">{customer.certificateType}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">发证机关：</span>
                  <span className="font-medium">{customer.certificateIssuer}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">证件有效期结束日期：</span>
                  <span className="font-medium">{customer.certificateEndDate}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">证件号码：</span>
                  <span className="font-medium">{maskSensitiveData(customer.certificateNumber, 'idCard')}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">证件有效期起始日期：</span>
                  <span className="font-medium">{customer.certificateStartDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="text-lg font-medium mb-4">联系信息</h3>
            <div className="space-y-4">
              <div className="flex">
                <span className="w-32 text-gray-500">手机号码：</span>
                <span className="font-medium">{maskSensitiveData(customer.phoneNumber, 'phone')}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">身份地址：</span>
                <span className="font-medium">{maskSensitiveData(customer.address, 'address')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">配偶信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">姓名：</span>
                  <span className="font-medium">{customer.spouseName ? maskSensitiveData(customer.spouseName, 'name') : '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">证件类型：</span>
                  <span className="font-medium">{customer.spouseCertificateType || '未知'}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">性别：</span>
                  <span className="font-medium">{customer.spouseGender || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">证件号码：</span>
                  <span className="font-medium">{customer.spouseCertificateNumber ? maskSensitiveData(customer.spouseCertificateNumber, 'idCard') : '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">手机号码：</span>
                  <span className="font-medium">{customer.spousePhoneNumber ? maskSensitiveData(customer.spousePhoneNumber, 'phone') : '未知'}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="other-info" className="mt-4">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <FeatureNotImplemented
              featureName="其它证件信息"
              showAsDialog={false}
              showAsInline={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="house-info" className="mt-4">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <FeatureNotImplemented
              featureName="房产信息"
              showAsDialog={false}
              showAsInline={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="car-info" className="mt-4">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <FeatureNotImplemented
              featureName="车位信息"
              showAsDialog={false}
              showAsInline={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="family-info" className="mt-4">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <FeatureNotImplemented
              featureName="家庭资产信息"
              showAsDialog={false}
              showAsInline={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="unit-info" className="mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">单位信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">工作性质：</span>
                  <span className="font-medium">全职</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">单位名称：</span>
                  <span className="font-medium">{customer.companyName || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">部门：</span>
                  <span className="font-medium">{customer.department || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">当前职务：</span>
                  <span className="font-medium">{customer.position || '未知'}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-500">单位地址：</span>
                  <span className="font-medium">{customer.companyAddress || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">所在部门：</span>
                  <span className="font-medium">{customer.department || '未知'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-500">个人年收入：</span>
                  <span className="font-medium">{customer.monthlyIncome ? `${customer.monthlyIncome}` : '未知'}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact-info" className="mt-4">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <FeatureNotImplemented
              featureName="联系人信息"
              showAsDialog={false}
              showAsInline={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 