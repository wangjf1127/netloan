"use client"

import { useIsMobile } from "../../../../components/ui/use-mobile"

interface Column {
  key: string
  label: string
  className?: string
  render?: (value: any, row: any) => React.ReactNode
  mobileHidden?: boolean // 移动端隐藏
}

interface ResponsiveTableProps {
  columns: Column[]
  data: any[]
  keyField: string
  className?: string
  mobileCardRender?: (row: any, index: number) => React.ReactNode
}

export function ResponsiveTable({
  columns,
  data,
  keyField,
  className,
  mobileCardRender
}: ResponsiveTableProps) {
  const isMobile = useIsMobile()

  if (isMobile && mobileCardRender) {
    return (
      <div className={`space-y-3 ${className}`}>
        {data.map((row, index) => (
          <div key={row[keyField]} className="bg-white rounded-lg border border-gray-200 p-4">
            {mobileCardRender(row, index)}
          </div>
        ))}
      </div>
    )
  }

  if (isMobile) {
    // 默认移动端卡片布局
    const visibleColumns = columns.filter(col => !col.mobileHidden)
    
    return (
      <div className={`space-y-3 ${className}`}>
        {data.map((row) => (
          <div key={row[keyField]} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-2">
              {visibleColumns.map((column) => (
                <div key={column.key} className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600 min-w-0 flex-shrink-0">
                    {column.label}:
                  </span>
                  <span className="text-sm text-gray-900 text-right ml-2">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 桌面端表格布局
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row[keyField]} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
