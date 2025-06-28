"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/shared/components/ui/button"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import * as Icons from "lucide-react"
import type { MenuItem } from "@/features/case-management/types"

interface SidebarProps {
  items: MenuItem[]
  className?: string
  collapsed?: boolean
  onClose?: () => void
}

function SidebarContent({ items, className, collapsed = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["case-management"])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const IconComponent = Icons[item.icon as keyof typeof Icons] as any
    const isExpanded = expandedItems.includes(item.id)
    const isActive = pathname === item.path
    const hasChildren = item.children && item.children.length > 0

    // 如果收缩状态且是子菜单，不显示
    if (collapsed && level > 0) {
      return null
    }

    return (
      <div key={item.id} className="w-full">
        <div className="flex items-center w-full">
          {hasChildren ? (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-bold h-10 text-gray-300 hover:bg-slate-700 hover:text-white",
                collapsed ? "px-2" : "px-4",
                level > 0 && !collapsed && "pl-8 text-sm",
                isActive && "bg-slate-700 text-white",
              )}
              onClick={() => !collapsed && toggleExpanded(item.id)}
            >
              <IconComponent className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{item.badge}</span>
                  )}
                  {isExpanded ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                </>
              )}
            </Button>
          ) : (
            <Link href={item.path} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-bold h-10 text-gray-300 hover:bg-slate-700 hover:text-white",
                  collapsed ? "px-2" : "px-4",
                  level > 0 && !collapsed && "pl-8 text-sm",
                  isActive && "bg-slate-700 text-white",
                )}
              >
                <IconComponent className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{item.badge}</span>
                    )}
                  </>
                )}
              </Button>
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-2">{item.children?.map((child) => renderMenuItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className={cn(
      "bg-slate-800 h-full overflow-y-auto transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h2 className={cn(
          "text-lg font-semibold text-white transition-opacity duration-300",
          collapsed ? "opacity-0" : "opacity-100"
        )}>
          {collapsed ? "" : "风险驾驶舱"}
        </h2>
        {/* 移动端关闭按钮 */}
        {onClose && !collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden h-8 w-8 text-white hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <nav className="p-2 space-y-1">{items.map((item) => renderMenuItem(item))}</nav>
    </div>
  )
}

export function Sidebar(props: SidebarProps) {
  return (
    <Suspense fallback={
      <div className={cn(
        "h-full bg-slate-800 text-white transition-all duration-300 ease-in-out",
        props.collapsed ? "w-16" : "w-64",
        props.className
      )}>
        <div className="p-4 border-b border-slate-700">
          <div className="text-lg font-semibold text-white">
            加载中...
          </div>
        </div>
        <div className="p-2">
          <div className="animate-pulse space-y-2">
            <div className="h-8 bg-slate-700 rounded"></div>
            <div className="h-8 bg-slate-700 rounded"></div>
            <div className="h-8 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <SidebarContent {...props} />
    </Suspense>
  )
}
