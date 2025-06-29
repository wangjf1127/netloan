"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export function LoanContractSkeleton() {
  return (
    <div className="space-y-6">
      {/* 面包屑骨架 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-12" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* 搜索表单骨架 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={`search-row-1-${i}`}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={`search-row-2-${i}`}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={`search-row-3-${i}`}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      {/* 表格骨架 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4">
          {/* 表头骨架 */}
          <div className="grid grid-cols-7 gap-4 mb-4 pb-2 border-b">
            {Array(7).fill(0).map((_, i) => (
              <Skeleton key={`header-${i}`} className="h-4 w-full" />
            ))}
          </div>
          
          {/* 表格行骨架 */}
          {Array(10).fill(0).map((_, i) => (
            <div key={`row-${i}`} className="grid grid-cols-7 gap-4 py-3 border-b border-gray-100">
              {Array(7).fill(0).map((_, j) => (
                <Skeleton key={`cell-${i}-${j}`} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
        
        {/* 分页骨架 */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
