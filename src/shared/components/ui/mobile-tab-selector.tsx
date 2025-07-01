"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown, X } from "lucide-react"

interface TabOption {
  value: string
  label: string
  icon?: string
}

interface MobileTabSelectorProps {
  tabs: TabOption[]
  activeTab: string
  onTabChange: (value: string) => void
  primaryTabs?: string[] // 优先显示的页签
  className?: string
}

export function MobileTabSelector({
  tabs,
  activeTab,
  onTabChange,
  primaryTabs = [],
  className
}: MobileTabSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 分离主要页签和更多页签
  const mainTabs = tabs.filter(tab => primaryTabs.includes(tab.value))
  const moreTabs = tabs.filter(tab => !primaryTabs.includes(tab.value))
  
  // 获取当前激活页签的信息
  const activeTabInfo = tabs.find(tab => tab.value === activeTab)
  
  // 如果当前激活的页签在"更多"中，需要特殊处理显示
  const isActiveInMore = moreTabs.some(tab => tab.value === activeTab)

  const handleTabSelect = (value: string) => {
    onTabChange(value)
    setIsOpen(false)
  }

  return (
    <>
      {/* 页签导航栏 */}
      <div className={`flex items-center bg-white border-b border-gray-200 ${className}`}>
        <div className="flex flex-1 overflow-hidden">
          {/* 主要页签 */}
          {mainTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.value
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon && <span className="mr-1">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
          
          {/* 当前激活页签在"更多"中时的显示 */}
          {isActiveInMore && (
            <button
              onClick={() => setIsOpen(true)}
              className="px-3 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600 whitespace-nowrap flex-shrink-0"
            >
              {activeTabInfo?.icon && <span className="mr-1">{activeTabInfo.icon}</span>}
              {activeTabInfo?.label}
            </button>
          )}
        </div>
        
        {/* 更多按钮 */}
        {moreTabs.length > 0 && !isActiveInMore && (
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap flex-shrink-0 flex items-center"
          >
            更多
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        )}
      </div>

      {/* 底部弹窗 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md fixed bottom-0 left-0 right-0 top-auto translate-y-0 rounded-t-lg rounded-b-none border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom">
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-lg font-medium text-gray-900">选择页签</DialogTitle>
          </DialogHeader>

          <div className="space-y-1 pb-4 max-h-80 overflow-y-auto">
            {moreTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabSelect(tab.value)}
                className={`w-full flex items-center px-4 py-4 text-left rounded-lg transition-colors ${
                  activeTab === tab.value
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "hover:bg-gray-50 text-gray-700 border border-transparent"
                }`}
              >
                {tab.icon && (
                  <span className="mr-3 text-xl">{tab.icon}</span>
                )}
                <span className="font-medium text-base">{tab.label}</span>
                {activeTab === tab.value && (
                  <span className="ml-auto text-blue-600 text-lg">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-center pt-2 pb-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full h-12 text-base"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
