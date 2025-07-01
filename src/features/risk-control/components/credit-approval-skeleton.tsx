"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export function CreditApprovalSkeleton() {
  return (
    <div className="space-y-6">
      {/* 面包屑骨架 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>

      {/* 搜索表单骨架 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第一行 */}
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第二行 */}
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 第三行 */}
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex items-end space-x-3">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>

      {/* 表格骨架 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4">
          <div className="space-y-3">
            {/* 表头 */}
            <div className="grid grid-cols-9 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            
            {/* 表格行 */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-9 gap-4">
                {Array.from({ length: 9 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
