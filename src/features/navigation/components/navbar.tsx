"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/shared/components/ui/button"
import type { NavigationItem } from "../types"

interface NavbarProps {
  items: NavigationItem[]
  className?: string
}

export function Navbar({ items, className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={cn("bg-white/10 backdrop-blur-sm border-b border-white/20", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StartTrek
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "text-white hover:text-blue-400 transition-colors font-medium",
                  item.isActive && "text-blue-400",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "block py-2 text-white hover:text-blue-400 transition-colors",
                  item.isActive && "text-blue-400",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
