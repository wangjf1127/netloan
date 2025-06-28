import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { QueryProvider } from "@/features/providers/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "风险驾驶舱",
  description: "风险驾驶舱系统",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
