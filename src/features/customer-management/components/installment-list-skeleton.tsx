"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export function InstallmentListSkeleton() {
  return (
    <div className="p-6">
      {/* 表格骨架屏 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[...Array(15)].map((_, index) => (
                <th key={index} scope="col" className="px-4 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(15)].map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 分页骨架屏 */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
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
  )
}
