"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ImageManagementPage() {
  const router = useRouter()

  useEffect(() => {
    // 自动重定向到影像检测查询页面
    router.replace("/image-management/monitoring")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">正在跳转到影像检测查询...</p>
      </div>
    </div>
  )
}
