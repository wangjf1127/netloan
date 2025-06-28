import { Skeleton } from "@/shared/components/ui/skeleton"

export function CustomerListSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 面包屑导航骨架 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>

      {/* 搜索表单骨架 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={`search-row-1-${i}`}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={`search-row-2-${i}`}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex items-end">
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      {/* 表格骨架 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Array(8).fill(0).map((_, i) => (
                  <th key={`header-${i}`} className="px-6 py-3 text-left">
                    <Skeleton className="h-4 w-full" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array(5).fill(0).map((_, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {Array(7).fill(0).map((_, cellIndex) => (
                    <td key={`cell-${rowIndex}-${cellIndex}`} className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {Array(5).fill(0).map((_, btnIndex) => (
                        <Skeleton key={`btn-${rowIndex}-${btnIndex}`} className="h-4 w-12" />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 