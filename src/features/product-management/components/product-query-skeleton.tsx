"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export function ProductQuerySkeleton() {
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
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* 搜索表单骨架 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-16" />
          </div>
        </div>
      </div>

      {/* 表格骨架 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* 表头 */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* 表格行 */}
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="px-6 py-4">
              <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: 12 }).map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-4 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 分页骨架 */}
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}
