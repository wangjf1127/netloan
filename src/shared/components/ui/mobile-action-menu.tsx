"use client"

import { useState } from "react"
import { Button } from "../../../../components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"

interface ActionItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive"
}

interface MobileActionMenuProps {
  actions: ActionItem[]
  className?: string
}

export function MobileActionMenu({ actions, className }: MobileActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${className}`}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className={`flex items-center gap-2 ${
              action.variant === "destructive" ? "text-red-600" : ""
            }`}
          >
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
