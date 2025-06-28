"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

interface RouteDebugProps {
  enabled?: boolean
}

function RouteDebugContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [userAgent, setUserAgent] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [windowSize, setWindowSize] = useState('未知')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setUserAgent(navigator.userAgent)
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      setWindowSize(`${window.innerWidth}x${window.innerHeight}`)

      const handleResize = () => {
        setWindowSize(`${window.innerWidth}x${window.innerHeight}`)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs max-w-sm z-50">
        <div className="font-bold mb-2">🐛 路由调试信息</div>
        <div><strong>当前路径:</strong> {pathname}</div>
        <div><strong>查询参数:</strong> {searchParams.toString() || '无'}</div>
        <div><strong>设备类型:</strong> 加载中...</div>
        <div><strong>User Agent:</strong> 加载中...</div>
        <div><strong>窗口大小:</strong> 未知</div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs max-w-sm z-50">
      <div className="font-bold mb-2">🐛 路由调试信息</div>
      <div><strong>当前路径:</strong> {pathname}</div>
      <div><strong>查询参数:</strong> {searchParams.toString() || '无'}</div>
      <div><strong>设备类型:</strong> {isMobile ? '移动端' : '桌面端'}</div>
      <div><strong>User Agent:</strong> {userAgent.substring(0, 50)}...</div>
      <div><strong>窗口大小:</strong> {windowSize}</div>
    </div>
  )
}

export function RouteDebug({ enabled = false }: RouteDebugProps) {
  if (!enabled) return null

  return (
    <Suspense fallback={
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs max-w-sm z-50">
        <div className="font-bold mb-2">🐛 路由调试信息</div>
        <div>加载中...</div>
      </div>
    }>
      <RouteDebugContent />
    </Suspense>
  )
}
