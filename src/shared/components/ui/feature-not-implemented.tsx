"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "./button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FeatureNotImplementedProps {
  /** 功能名称，如"授信审批"、"贷款审批"等 */
  featureName?: string
  /** 是否显示为弹窗，默认为true */
  showAsDialog?: boolean
  /** 是否显示为内联提示，默认为false */
  showAsInline?: boolean
  /** 自定义提示文本 */
  customMessage?: string
  /** 触发元素的点击事件 */
  onTrigger?: () => void
}

/**
 * 功能未完成提示组件
 * 用于统一显示"当前功能未完成"的提示信息
 */
export function FeatureNotImplemented({
  featureName,
  showAsDialog = true,
  showAsInline = false,
  customMessage,
  onTrigger
}: FeatureNotImplementedProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultMessage = featureName 
    ? `当前${featureName}功能未完成` 
    : "当前功能未完成"
  
  const message = customMessage || defaultMessage

  const handleTrigger = () => {
    if (onTrigger) {
      onTrigger()
    }
    if (showAsDialog) {
      setIsOpen(true)
    }
  }

  // 内联提示模式
  if (showAsInline) {
    return (
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          {message}
        </AlertDescription>
      </Alert>
    )
  }

  // 弹窗模式
  return (
    <>
      {showAsDialog && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                功能提示
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700 text-center">{message}</p>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                确定
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

/**
 * 用于包装未实现功能的高阶组件
 */
interface WithFeatureNotImplementedProps {
  featureName?: string
  customMessage?: string
  children: React.ReactNode
  /** 是否禁用点击，默认为false */
  disabled?: boolean
  /** 点击时的回调 */
  onClick?: () => void
}

export function WithFeatureNotImplemented({
  featureName,
  customMessage,
  children,
  disabled = false,
  onClick
}: WithFeatureNotImplementedProps) {
  const [showDialog, setShowDialog] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (onClick) {
      onClick()
    }
    
    if (!disabled) {
      setShowDialog(true)
    }
  }

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      
      <FeatureNotImplemented
        featureName={featureName}
        customMessage={customMessage}
        showAsDialog={showDialog}
        onTrigger={() => setShowDialog(false)}
      />
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              功能提示
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 text-center">
              {customMessage || (featureName ? `当前${featureName}功能未完成` : "当前功能未完成")}
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowDialog(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

/**
 * 用于创建显示功能未完成提示的按钮
 */
interface NotImplementedButtonProps {
  featureName?: string
  customMessage?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function NotImplementedButton({
  featureName,
  customMessage,
  children,
  className,
  variant = "default",
  size = "default"
}: NotImplementedButtonProps) {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setShowDialog(true)}
      >
        {children}
      </Button>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              功能提示
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 text-center">
              {customMessage || (featureName ? `当前${featureName}功能未完成` : "当前功能未完成")}
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowDialog(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
