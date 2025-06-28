"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface RouteDebugProps {
  enabled?: boolean
}

export function RouteDebug({ enabled = false }: RouteDebugProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [userAgent, setUserAgent] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserAgent(navigator.userAgent)
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs max-w-sm z-50">
      <div className="font-bold mb-2">🐛 路由调试信息</div>
      <div><strong>当前路径:</strong> {pathname}</div>
      <div><strong>查询参数:</strong> {searchParams.toString() || '无'}</div>
      <div><strong>设备类型:</strong> {isMobile ? '移动端' : '桌面端'}</div>
      <div><strong>User Agent:</strong> {userAgent.substring(0, 50)}...</div>
      <div><strong>窗口大小:</strong> {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '未知'}</div>
    </div>
  )
}
