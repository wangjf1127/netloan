"use client"

import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb"
import { TestRecordSearch } from "./test-record-search"
import { TestRecordTable } from "./test-record-table"
import { TestRecordPagination } from "./test-record-pagination"
import { useTestRecords } from "../hooks/use-test-records"

export function TestRecordList() {
  const {
    records,
    loading,
    currentPage,
    pageSize,
    totalCount,
    handleSearch,
    handleReset,
    setCurrentPage
  } = useTestRecords()

  const breadcrumbItems = [
    { label: "业务查询", href: "/business-query" },
    { label: "测试记录", href: "/business-query/test-records" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 面包屑导航 */}
        <div className="mb-6">
          <ResponsiveBreadcrumb items={breadcrumbItems} />
        </div>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">测试记录</h1>
          <p className="mt-1 text-sm text-gray-600">
            查看和管理测试记录信息
          </p>
        </div>

        {/* 搜索表单 */}
        <TestRecordSearch
          onSearch={handleSearch}
          onReset={handleReset}
          loading={loading}
        />

        {/* 数据列表 */}
        <TestRecordTable
          records={records}
          loading={loading}
        />

        {/* 分页 */}
        {!loading && totalCount > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-0">
            <TestRecordPagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
