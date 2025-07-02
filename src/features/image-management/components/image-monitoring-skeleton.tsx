"use client"

import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"

export function ImageMonitoringSkeleton() {
  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "影像件管理" },
          { label: "影像检测查询" }
        ]}
        backLink="/"
      />

      {/* 搜索表单骨架 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-end space-x-2">
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 表格骨架 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* 表头骨架 */}
          <div className="grid grid-cols-10 gap-4 mb-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          
          {/* 表格行骨架 */}
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-10 gap-4 mb-3">
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
          ))}
        </div>
        
        {/* 分页骨架 */}
        <div className="border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
