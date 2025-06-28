export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
  isActive?: boolean
  isExternal?: boolean
}

export interface NavigationProps {
  items: NavigationItem[]
  className?: string
}
