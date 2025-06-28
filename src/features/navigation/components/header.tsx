"use client"

import { Search, Bell, User, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"

interface HeaderProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function Header({ sidebarCollapsed, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Button>

        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">张律师</div>
            <div className="text-gray-500 text-xs">高级合伙人</div>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
