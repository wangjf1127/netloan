import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * 敏感信息脱敏处理工具函数
 * @param data 需要脱敏的数据
 * @param type 脱敏类型
 * @returns 脱敏后的数据
 */
export function maskSensitiveData(data: string | null | undefined, type: 'phone' | 'idCard' | 'email' | 'name' | 'address' = 'idCard'): string {
  if (!data || typeof data !== 'string') return data || ''

  switch (type) {
    case 'phone':
      // 手机号脱敏：保留前3位和后4位，中间用****替换
      if (data.length === 11) {
        return data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
      // 其他长度的电话号码，保留前3位，其余用*替换
      if (data.length >= 7) {
        return data.substring(0, 3) + '*'.repeat(data.length - 3)
      }
      return data

    case 'idCard':
      // 身份证号脱敏：保留前6位和后4位，中间用********替换
      if (data.length === 18) {
        return data.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
      }
      // 15位身份证号
      if (data.length === 15) {
        return data.replace(/(\d{6})\d{6}(\d{3})/, '$1******$2')
      }
      // 其他证件号码，保留前4位和后4位
      if (data.length >= 8) {
        const start = data.substring(0, 4)
        const end = data.substring(data.length - 4)
        const middle = '*'.repeat(data.length - 8)
        return start + middle + end
      }
      return data

    case 'email':
      // 邮箱脱敏：用户名保留前2位，其余用*替换
      const [username, domain] = data.split('@')
      if (username && domain) {
        const maskedUsername = username.length > 2
          ? username.substring(0, 2) + '*'.repeat(Math.max(username.length - 2, 1))
          : username
        return `${maskedUsername}@${domain}`
      }
      return data

    case 'name':
      // 姓名脱敏：保留姓氏，名字用*替换
      if (data.length <= 1) {
        return data
      }
      if (data.length === 2) {
        return data.charAt(0) + '*'
      }
      if (data.length === 3) {
        return data.charAt(0) + '*' + data.charAt(2)
      }
      // 4个字符以上的姓名，保留第一个和最后一个字符
      return data.charAt(0) + '*'.repeat(data.length - 2) + data.charAt(data.length - 1)

    case 'address':
      // 地址脱敏：保留省市信息，详细地址用*替换
      if (data.length <= 6) {
        return data.substring(0, Math.ceil(data.length / 2)) + '*'.repeat(Math.floor(data.length / 2))
      }
      // 保留前6个字符（通常是省市区），其余用*替换
      return data.substring(0, 6) + '*'.repeat(Math.max(data.length - 6, 1))

    default:
      return data
  }
}
