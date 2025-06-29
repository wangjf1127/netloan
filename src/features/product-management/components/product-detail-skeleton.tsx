"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* 面包屑导航骨架屏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-24" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-5 w-24" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-12" />
      </div>

      {/* 标签页导航骨架屏 */}
      <div className="w-full bg-white border-b border-gray-200 p-0 mb-4">
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {/* 基本信息区域骨架屏 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* 左列字段 */}
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-5 w-32 mr-4" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {/* 右列字段 */}
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-5 w-32 mr-4" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
