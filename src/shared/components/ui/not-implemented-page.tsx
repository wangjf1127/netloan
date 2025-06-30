"use client"

import { ArrowLeft, AlertTriangle, Construction } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveBreadcrumb } from "./responsive-breadcrumb"
import Link from "next/link"

interface NotImplementedPageProps {
  /** 功能名称 */
  featureName: string
  /** 面包屑导航项 */
  breadcrumbItems?: Array<{
    label: string
    href?: string
  }>
  /** 返回链接 */
  backLink?: string
  /** 是否显示侧边栏切换按钮 */
  sidebarCollapsed?: boolean
  /** 侧边栏切换回调 */
  onToggleSidebar?: () => void
  /** 自定义描述文本 */
  customDescription?: string
  /** 预计完成时间 */
  estimatedCompletion?: string
}

/**
 * 未开发功能页面组件
 * 用于统一显示未开发功能的页面
 */
export function NotImplementedPage({
  featureName,
  breadcrumbItems = [],
  backLink = "/",
  sidebarCollapsed,
  onToggleSidebar,
  customDescription,
  estimatedCompletion
}: NotImplementedPageProps) {
  const defaultBreadcrumbs = [
    { label: "首页", href: "/" },
    { label: featureName }
  ]

  const breadcrumbs = breadcrumbItems.length > 0 ? breadcrumbItems : defaultBreadcrumbs

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={breadcrumbs}
        onToggleSidebar={onToggleSidebar}
        backLink={backLink}
      />

      {/* 主要内容 */}
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Construction className="h-16 w-16 text-orange-500" />
                <AlertTriangle className="h-6 w-6 text-orange-600 absolute -top-1 -right-1" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {featureName}
            </CardTitle>
            <p className="text-lg text-orange-600 font-medium">
              当前功能未完成
            </p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="space-y-3">
              <p className="text-gray-600 text-base leading-relaxed">
                {customDescription || `${featureName}功能正在开发中，敬请期待。`}
              </p>
              
              {estimatedCompletion && (
                <p className="text-sm text-gray-500">
                  预计完成时间：{estimatedCompletion}
                </p>
              )}
            </div>

            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={backLink}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    返回上一页
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    返回首页
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="font-medium mb-2">您可以尝试以下操作：</p>
              <ul className="text-left space-y-1">
                <li>• 返回上一页继续其他操作</li>
                <li>• 访问已开发完成的其他功能</li>
                <li>• 联系系统管理员了解开发进度</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * 简化版未开发页面组件
 * 用于快速创建未开发功能页面
 */
interface SimpleNotImplementedPageProps {
  featureName: string
  parentPath?: string
  parentLabel?: string
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function SimpleNotImplementedPage({
  featureName,
  parentPath = "/",
  parentLabel = "首页",
  sidebarCollapsed,
  onToggleSidebar
}: SimpleNotImplementedPageProps) {
  return (
    <NotImplementedPage
      featureName={featureName}
      breadcrumbItems={[
        { label: parentLabel, href: parentPath },
        { label: featureName }
      ]}
      backLink={parentPath}
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}

/**
 * 带有自定义内容的未开发页面组件
 */
interface CustomNotImplementedPageProps {
  featureName: string
  breadcrumbItems?: Array<{
    label: string
    href?: string
  }>
  backLink?: string
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
  children?: React.ReactNode
}

export function CustomNotImplementedPage({
  featureName,
  breadcrumbItems,
  backLink = "/",
  sidebarCollapsed,
  onToggleSidebar,
  children
}: CustomNotImplementedPageProps) {
  const defaultBreadcrumbs = [
    { label: "首页", href: "/" },
    { label: featureName }
  ]

  const breadcrumbs = breadcrumbItems || defaultBreadcrumbs

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={breadcrumbs}
        onToggleSidebar={onToggleSidebar}
        backLink={backLink}
      />

      {/* 自定义内容 */}
      {children}
    </div>
  )
}
