"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Menu, CheckCircle, Clock, User, Phone, CreditCard, MapPin, Smartphone, Globe, Settings } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "../../../../components/ui/use-mobile"
import { maskSensitiveData } from "@/lib/utils"
import { useLoanApprovalDetail } from "../hooks/use-loan-approval"
import type { LoanApprovalDetailProps } from "../types/loan-approval"

export function LoanApprovalDetail({ approvalId, sidebarCollapsed, onToggleSidebar }: LoanApprovalDetailProps) {
  const isMobile = useIsMobile()
  const { data: detail, isLoading, error } = useLoanApprovalDetail(approvalId)

  // 根据状态获取印章样式
  const getStampStyle = (status: string) => {
    switch (status) {
      case '决策通过':
        return {
          borderColor: 'border-green-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          decorBorder: 'border-green-400',
          text: ['决策', '通过']
        }
      case '决策拒绝':
        return {
          borderColor: 'border-red-500',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          decorBorder: 'border-red-400',
          text: ['决策', '拒绝']
        }
      case '人工审核':
        return {
          borderColor: 'border-yellow-500',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          decorBorder: 'border-yellow-400',
          text: ['人工', '审核']
        }
      default:
        return {
          borderColor: 'border-gray-500',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          decorBorder: 'border-gray-400',
          text: ['待', '审核']
        }
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-8 text-center">加载中...</div>
      </div>
    )
  }

  if (error || !detail) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-8 text-center text-red-500">获取详情失败</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {isMobile ? (
              <span className="text-gray-900">详情</span>
            ) : (
              <>
                <Link href="/" className="text-gray-600 hover:text-gray-900">首页</Link>
                <span>/</span>
                <span className="text-gray-900">全流程风险掌控</span>
                <span>/</span>
                <span className="text-gray-900">贷中管理</span>
                <span>/</span>
                <span className="text-gray-900">贷款审批</span>
                <span>/</span>
                <span className="text-gray-900">详情</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            href="/risk-control/during-loan/loan-approval" 
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            返回
          </Link>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* 基础信息区域 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">基础信息</CardTitle>
            <div className="flex items-center space-x-2">
              {/* 状态印章样式 */}
              {(() => {
                const stampStyle = getStampStyle(detail.status)
                return (
                  <div className="relative">
                    <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-full border-4 ${stampStyle.borderColor} ${stampStyle.bgColor} flex items-center justify-center transform rotate-12`}>
                      <div className="text-center">
                        <div className={`${stampStyle.textColor} font-bold ${isMobile ? 'text-xs' : 'text-sm'} leading-tight`}>{stampStyle.text[0]}</div>
                        <div className={`${stampStyle.textColor} font-bold ${isMobile ? 'text-xs' : 'text-sm'} leading-tight`}>{stampStyle.text[1]}</div>
                      </div>
                    </div>
                    {/* 印章边框装饰 */}
                    <div className={`absolute inset-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-full border-2 ${stampStyle.decorBorder} opacity-50 transform rotate-12`}></div>
                  </div>
                )
              })()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">贷款流水号</div>
                <div className="font-medium">{detail.loanSerialNumber}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">客户ID</div>
                <div className="font-medium">{detail.customerId}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">客户姓名</div>
                <div className="font-medium">{maskSensitiveData(detail.customerName, 'name')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">手机号</div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{maskSensitiveData(detail.phoneNumber, 'phone')}</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    查看历史记录
                  </Link>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">身份证</div>
                <div className="font-medium">{maskSensitiveData(detail.idCard, 'idCard')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">产品</div>
                <div className="font-medium">{detail.product}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">申请时间</div>
                <div className="font-medium">{detail.applicationTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 流程进度区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">流程进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between relative">
              {/* 进度线 */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-green-200"></div>
              
              {/* 注册 */}
              <div className="flex flex-col items-center space-y-2 relative z-10">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">注册</div>
                  <div className="text-xs text-gray-500">{detail.processProgress.register}</div>
                </div>
              </div>
              
              {/* 实名 */}
              <div className="flex flex-col items-center space-y-2 relative z-10">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">实名</div>
                  <div className="text-xs text-gray-500">{detail.processProgress.realName}</div>
                </div>
              </div>
              
              {/* 授信 */}
              <div className="flex flex-col items-center space-y-2 relative z-10">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">授信</div>
                  <div className="text-xs text-gray-500">{detail.processProgress.credit}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 扫码信息区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">扫码信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600">{detail.scanInfo}</div>
          </CardContent>
        </Card>

        {/* 注册信息区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">注册信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">注册时间</div>
                <div className="font-medium">{detail.registerInfo.registerTime}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">注册手机号</div>
                <div className="font-medium">{maskSensitiveData(detail.registerInfo.registerPhone, 'phone')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">手机号归属地</div>
                <div className="font-medium">{detail.registerInfo.phoneLocation}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 决策结果区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">决策结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">评估结果</div>
                <div className="font-medium">{detail.decisionResult.evaluationResult}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">评估备注</div>
                <div className="font-medium">{detail.decisionResult.evaluationRemark}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 事件信息区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">事件信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">流水号</div>
                <div className="font-medium">{detail.eventInfo.eventSerialNumber}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">手机号</div>
                <div className="font-medium">{maskSensitiveData(detail.eventInfo.phoneNumber, 'phone')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">手机号归属城市</div>
                <div className="font-medium">{detail.eventInfo.phoneCity}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">IP归属地</div>
                <div className="font-medium">{detail.eventInfo.ipLocation}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">GPS坐标</div>
                <div className="font-medium">{detail.eventInfo.gpsCoordinates}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">GPS精度</div>
                <div className="font-medium">{detail.eventInfo.gpsAccuracy}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">时间</div>
                <div className="font-medium">{detail.eventInfo.eventTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 设备信息区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">设备信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500">暂无设备信息</div>
          </CardContent>
        </Card>

        {/* 渠道信息区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">渠道信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">渠道</div>
                <div className="font-medium">{detail.channelInfo.channel}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">入口</div>
                <div className="font-medium">{detail.channelInfo.entrance}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 其他信息区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">其他信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">手机归属地</div>
                <div className="font-medium">{detail.otherInfo.phoneLocation}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">运营商</div>
                <div className="font-medium">{detail.otherInfo.operator}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
