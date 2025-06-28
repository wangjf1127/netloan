"use client"

import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Menu } from "lucide-react"

export function CreditAgreementSkeleton() {
  return (
    <div className="space-y-6">
      {/* 面包屑导航骨架 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-12" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-12" />
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">管</span>
          </div>
        </div>
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
          {Array(1).fill(0).map((_, i) => (
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

      {/* 列表区域骨架 */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <th key={index} className="px-6 py-3">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 10 }).map((_, colIndex) => (
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
