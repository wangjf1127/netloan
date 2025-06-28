"use client"

import React, { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Menu, X } from "lucide-react"
import { Sidebar } from "@/features/navigation/components/sidebar"
import { sidebarMenuItems } from "@/features/navigation/config/sidebar-menu"
import { RouteDebug } from "@/components/debug/route-debug"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="h-screen flex bg-gray-100">
      {/* 移动端遮罩层 */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 桌面端侧边栏 */}
      <div className="hidden lg:block">
        <Sidebar
          items={sidebarMenuItems}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* 移动端侧边栏 */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          items={sidebarMenuItems}
          collapsed={false}
          className="h-full"
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-100 flex flex-col">
        {/* 移动端顶部导航栏 */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="h-8 w-8"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">风险驾驶舱</h1>
          <div className="w-8" /> {/* 占位符保持居中 */}
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          {React.cloneElement(children as React.ReactElement, {
            sidebarCollapsed,
            onToggleSidebar: () => setSidebarCollapsed(!sidebarCollapsed),
            onToggleMobileMenu: () => setMobileMenuOpen(!mobileMenuOpen)
          })}
        </div>
      </main>

      {/* 路由调试组件 - 仅在开发环境或需要调试时显示 */}
      <RouteDebug enabled={process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEBUG_ROUTES === 'true'} />
    </div>
  )
}
