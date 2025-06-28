export function CreditLedgerSkeleton() {
  return (
    <div className="space-y-6">
      {/* 面包屑导航骨架 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      {/* 搜索区域骨架 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* 列表区域骨架 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Array.from({ length: 12 }).map((_, index) => (
                  <th key={index} className="px-6 py-3">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 12 }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
