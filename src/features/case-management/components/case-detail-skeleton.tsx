import { Skeleton } from "@/shared/components/ui/skeleton"

export function CaseDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 面包屑导航骨架 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* 返回按钮和案件号骨架 */}
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-16 rounded" />
      </div>

      {/* 基本信息卡片骨架 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i + 8}>
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* 标签页骨架 */}
      <div>
        <div className="bg-white border-b border-gray-200 rounded-t-lg flex space-x-2 p-1">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        
        {/* 内容卡片骨架 */}
        <div className="space-y-4 mt-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200">
              <div className="bg-gray-100 h-10 rounded-t-lg" />
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, j) => (
                    <div key={j}>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 