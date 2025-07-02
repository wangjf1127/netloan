"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function IdCardOcrSkeleton() {
  return (
    <div className="space-y-6">
      {/* 面包屑骨架 */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-12" />
        <span className="text-gray-400">/</span>
        <Skeleton className="h-4 w-16" />
        <span className="text-gray-400">/</span>
        <Skeleton className="h-4 w-32" />
      </div>

      {/* 搜索表单骨架 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={`search-row-1-${i}`}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={`search-row-2-${i}`}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
          <div></div>
          <div></div>
          <div className="flex items-end space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>

      {/* 表格骨架 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4">
          {/* 表头骨架 */}
          <div className="grid grid-cols-9 gap-4 mb-4 pb-2 border-b">
            {Array(9).fill(0).map((_, i) => (
              <Skeleton key={`header-${i}`} className="h-4 w-full" />
            ))}
          </div>
          
          {/* 数据行骨架 */}
          {Array(5).fill(0).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-9 gap-4 mb-3">
              {Array(9).fill(0).map((_, colIndex) => (
                <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 分页骨架 */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  )
}
