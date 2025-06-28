"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export function RepaymentPlanSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* 面包屑导航骨架屏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-2" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-12" />
      </div>

      {/* 还款计划列表骨架屏 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[...Array(7)].map((_, index) => (
                  <th key={index} scope="col" className="px-6 py-3 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(7)].map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* 分页骨架屏 */}
        <div className="flex justify-between items-center mt-4 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
