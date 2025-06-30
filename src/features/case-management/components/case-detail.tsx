"use client"

// 这是一个简单的测试注释
import { ArrowLeft, FileImage, CreditCard, UserRound, FileText, AlertTriangle, ChartBar, CreditCard as CreditCardIcon, Banknote } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { CaseDetailProps, CaseDetailData } from "../types"
import { mockCaseDetail } from "../data/mock-case-detail"
import { CaseDetailSkeleton } from "./case-detail-skeleton"
import { maskSensitiveData } from "@/lib/utils"

// 解析决策流信息的辅助函数
function parseDecisionFlowInfo(info: string): string[] {
  if (!info) return [];
  try {
    return JSON.parse(info);
  } catch (e) {
    return [info];
  }
}

export function CaseDetail({ caseId }: CaseDetailProps) {
  const [caseData, setCaseData] = useState<CaseDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // 在真实环境中，这里会根据caseId从API获取数据
    // 现在使用模拟数据并添加延迟模拟加载
    const fetchData = async () => {
      setLoading(true)
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCaseData(mockCaseDetail)
      setLoading(false)
    }
    
    fetchData()
  }, [caseId])

  if (loading) {
    return <CaseDetailSkeleton />
  }

  if (!caseData) {
    return <div className="p-6">加载失败，请重试...</div>
  }

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>首页</span>
          <span>/</span>
          <span>案件管理</span>
          <span>/</span>
          <span>案件列表</span>
          <span>/</span>
          <span className="text-gray-900">案件详情</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">管</span>
          </div>
          <span className="text-sm text-gray-700">管理员</span>
        </div>
      </div>

      {/* 返回按钮和案件号 */}
      <div className="flex items-center space-x-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <span className="text-blue-600 font-mono text-lg font-bold">
          {caseData.caseNumber}
        </span>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
          {caseData.channel}
        </span>
      </div>

      {/* 基本信息卡片 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm">客户ID：{caseData.clientId}</div>
          </div>
          <div>
            <div className="text-sm">客户姓名：{caseData.clientName}</div>
          </div>
          <div>
            <div className="text-sm">手机号：{caseData.phone}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm">状态：</div>
            </div>
            <div>
              <div className="text-sm">授信金额：</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm">身份证：{caseData.idCard}</div>
          </div>
          <div>
            <div className="text-sm">产品：{caseData.product}</div>
          </div>
          <div>
            <div className="text-sm">业务产品：{caseData.businessProduct}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-emerald-500 text-lg font-medium">{caseData.status}</div>
            </div>
            <div>
              <div className="text-orange-500 text-lg font-medium">{caseData.amount.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm">申请时间：{caseData.applyTime}</div>
          </div>
          <div className="col-span-3">
            {/* 空白占位 */}
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="bg-white border-b border-gray-200 rounded-t-lg">
          <TabsTrigger 
            value="basic" 
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
          >
            基本信息
          </TabsTrigger>
          <TabsTrigger 
            value="antifraud"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
          >
            反欺诈信息
          </TabsTrigger>
          <TabsTrigger 
            value="datasource"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
          >
            数据源
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="p-0 mt-0">
          <div className="space-y-4">
            {/* 客户申请信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg">
                客户申请信息
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm">客户姓名：{maskSensitiveData(caseData.clientName, 'name')}</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">客户手机号：{maskSensitiveData(caseData.phone, 'phone')}</span>
                      <a href="#" className="text-blue-500 text-xs">查询历史记录</a>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm">身份证：{maskSensitiveData(caseData.idCard, 'idCard')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-sm">行业：{caseData.industry}</div>
                    <div className="text-sm text-gray-500 mt-1">一般管理工作岗位: {caseData.company}</div>
                  </div>
                  <div>
                    <div className="text-sm">详细住址：{maskSensitiveData(caseData.address, 'address')}</div>
                  </div>
                  <div>
                    <div className="text-sm">产品名称：{caseData.product}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-sm">贷款类型：{caseData.businessProduct}</div>
                  </div>
                  <div>
                    <div className="text-sm">征信信息：{caseData.creditStatus}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 联系人信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg">
                联系人信息
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm">姓名：{maskSensitiveData(caseData.contact.name, 'name')}</div>
                  </div>
                  <div>
                    <div className="text-sm">关系：{caseData.contact.relation}</div>
                  </div>
                  <div>
                    <div className="text-sm">手机号：{maskSensitiveData(caseData.contact.phone, 'phone')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 身份证信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg">
                身份证信息
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm">身份证民族：{caseData.idCardInfo.nation}</div>
                  </div>
                  <div>
                    <div className="text-sm">有效日期：{caseData.idCardInfo.validDate}</div>
                  </div>
                  <div>
                    <div className="text-sm">身份证地址：{maskSensitiveData(caseData.idCardInfo.address, 'address')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-sm">签发机构：{caseData.idCardInfo.issueAuthority}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 客户经理信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg">
                客户经理信息
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm">客户经理类别：{caseData.manager.type}</div>
                  </div>
                  <div>
                    <div className="text-sm">营销客户经理：{caseData.manager.name}</div>
                  </div>
                  <div>
                    <div className="text-sm">营销客户经理联系方式：{caseData.manager.contact}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-sm">营销客户经理编号：{caseData.manager.code}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 影像信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg">
                影像信息
              </div>
              <div className="p-4">
                {caseData.images ? (
                  <div className="grid grid-cols-4 gap-4">
                    {caseData.images.idCardFront && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                          <UserRound className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">身份证正面</span>
                        </div>
                        <div className="border rounded-md overflow-hidden h-36 bg-gray-50 flex items-center justify-center">
                          <img 
                            src={caseData.images.idCardFront} 
                            alt="身份证正面" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    {caseData.images.idCardBack && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                          <UserRound className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">身份证反面</span>
                        </div>
                        <div className="border rounded-md overflow-hidden h-36 bg-gray-50 flex items-center justify-center">
                          <img 
                            src={caseData.images.idCardBack} 
                            alt="身份证反面" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    {caseData.images.bankCard && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">银行卡</span>
                        </div>
                        <div className="border rounded-md overflow-hidden h-36 bg-gray-50 flex items-center justify-center">
                          <img 
                            src={caseData.images.bankCard} 
                            alt="银行卡" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    {caseData.images.other && caseData.images.other.map((img, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center space-x-1">
                          <FileImage className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">其他文件 {index + 1}</span>
                        </div>
                        <div className="border rounded-md overflow-hidden h-36 bg-gray-50 flex items-center justify-center">
                          <img 
                            src={img} 
                            alt={`其他文件 ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 text-gray-500">
                    <FileImage className="h-5 w-5 mr-2" />
                    <span>暂无影像信息</span>
                  </div>
                )}
              </div>
            </div>

            {/* 合同协议 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg">
                合同协议
              </div>
              <div className="p-4">
                {caseData.contract ? (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">{caseData.contract.content}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 text-gray-500">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>暂无合同协议信息</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 反欺诈信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                反欺诈信息
              </div>
              <div className="p-4">
                {caseData.antifraud ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <span className="text-sm font-medium">反欺诈方数: {caseData.antifraud.score}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 mr-2">后续操作:</span>
                        <span className="text-green-600 font-medium">{caseData.antifraud.lastOperation}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-gray-500 mr-2">上一步反欺诈结果:</span>
                        <span className="text-blue-600 font-medium">{caseData.antifraud.lastDecision}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-3">规则信息</h4>
                      {caseData.antifraud.rules && caseData.antifraud.rules.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-sm font-medium text-gray-500">规则代码</div>
                          <div className="text-sm font-medium text-gray-500">规则名称</div>
                          {caseData.antifraud.rules.map((rule, index) => (
                            <>
                              <div key={`code-${index}`} className="text-sm">{rule.code}</div>
                              <div key={`name-${index}`} className="text-sm">{rule.name}</div>
                            </>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          <span>暂无规则信息</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 text-gray-500">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span>暂无反欺诈信息</span>
                  </div>
                )}
              </div>
            </div>

            {/* 模型分数 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                <ChartBar className="h-4 w-4 mr-2" />
                模型分数
              </div>
              <div className="p-4">
                {caseData.modelScores ? (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm">支付模型类型：{caseData.modelScores.paymentModelType}</div>
                    </div>
                    <div>
                      <div className="text-sm">信用质量模型类型：{caseData.modelScores.creditQualityModelType}</div>
                    </div>
                    <div>
                      <div className="text-sm">信用价格类型：{caseData.modelScores.creditPriceType}</div>
                    </div>
                    <div>
                      <div className="text-sm">资产质量模型类型：{caseData.modelScores.assetQualityModelType}</div>
                    </div>
                    <div>
                      <div className="text-sm">资产价格模型类型：{caseData.modelScores.assetPriceModelType}</div>
                    </div>
                    <div>
                      <div className="text-sm">适当性目标类型A：{caseData.modelScores.appropriateTargetTypeA}</div>
                    </div>
                    <div>
                      <div className="text-sm">适当性目标类型B：{caseData.modelScores.appropriateTargetTypeB}</div>
                    </div>
                    <div>
                      <div className="text-sm">反欺诈模型类型：{caseData.modelScores.fraudPreventionModelType}</div>
                    </div>
                    <div>
                      <div className="text-sm">适当性目标类型C：{caseData.modelScores.appropriateTargetTypeC}</div>
                    </div>
                    <div>
                      <div className="text-sm">信贷申请类型A：{caseData.modelScores.creditApplicationTypeA}</div>
                    </div>
                    <div>
                      <div className="text-sm">信贷申请类型B：{caseData.modelScores.creditApplicationTypeB}</div>
                    </div>
                    <div>
                      <div className="text-sm">目标自身模型评分V1：{caseData.modelScores.targetSelfModelScoreV1}</div>
                    </div>
                    <div>
                      <div className="text-sm">目标自身信用评分：{caseData.modelScores.targetSelfCreditScore}</div>
                    </div>
                    <div>
                      <div className="text-sm">目标自身信用评分模型分数：{caseData.modelScores.targetSelfCreditScoreModelScore}</div>
                    </div>
                    <div>
                      <div className="text-sm">消费者信用风险模型分数：{caseData.modelScores.consumerCreditRiskModelScore}</div>
                    </div>
                    <div>
                      <div className="text-sm">信用风险等级评分：{caseData.modelScores.creditRiskLevelScore}</div>
                    </div>
                    <div>
                      <div className="text-sm">总风控KV2模型分数：{caseData.modelScores.totalRiskControlKv2ModelScore}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 text-gray-500">
                    <ChartBar className="h-5 w-5 mr-2" />
                    <span>暂无模型分数信息</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 授信信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                <CreditCardIcon className="h-4 w-4 mr-2" />
                授信信息
              </div>
              <div className="p-4">
                {caseData.creditInfo ? (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm">授信结果：
                        <span className={`font-medium ${caseData.creditInfo.result === '通过' ? 'text-green-600' : 'text-red-600'}`}>
                          {caseData.creditInfo.result}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">产品等级：{caseData.creditInfo.productLevel}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 text-gray-500">
                    <CreditCardIcon className="h-5 w-5 mr-2" />
                    <span>暂无授信信息</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 额度信息 */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                <Banknote className="h-4 w-4 mr-2" />
                额度信息
              </div>
              <div className="p-4">
                {caseData.limitInfo ? (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm">产品名称：{caseData.limitInfo.productName}</div>
                    </div>
                    <div>
                      <div className="text-sm">产品ID：{caseData.limitInfo.productId}</div>
                    </div>
                    <div>
                      <div className="text-sm">批准金额：
                        <span className="font-medium text-orange-500">
                          {caseData.limitInfo.approvalAmount.toLocaleString()} 元
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">标准利率：{caseData.limitInfo.standardRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm">优惠利率：{caseData.limitInfo.preferentialRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm">实际利率：
                        <span className="font-medium text-blue-600">
                          {caseData.limitInfo.actualRate}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">申请日期：{caseData.limitInfo.applicationDate}</div>
                    </div>
                    <div>
                      <div className="text-sm">到期日期：{caseData.limitInfo.expiryDate}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 text-gray-500">
                    <Banknote className="h-5 w-5 mr-2" />
                    <span>暂无额度信息</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 决策流5 */}
            {caseData.decisionFlows?.flow5 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  决策流5
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow5.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow5.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow5.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* 决策流4 */}
            {caseData.decisionFlows?.flow4 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  决策流4
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow4.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow4.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow4.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* 决策流3 */}
            {caseData.decisionFlows?.flow3 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  决策流3
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow3.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow3.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow3.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* 决策流2 */}
            {caseData.decisionFlows?.flow2 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  决策流2
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow2.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow2.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow2.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* 决策流1 */}
            {caseData.decisionFlows?.flow1 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  决策流1
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow1.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow1.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow1.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* 决策流0 */}
            {caseData.decisionFlows?.flow0 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  决策流0
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow0.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow0.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow0.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="antifraud">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-t-lg flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              反欺诈信息
            </div>
            <div className="p-4">
              {caseData.antifraud ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium">反欺诈方数: {caseData.antifraud.score}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">后续操作:</span>
                      <span className="text-green-600 font-medium">{caseData.antifraud.lastOperation}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">上一步反欺诈结果:</span>
                      <span className="text-blue-600 font-medium">{caseData.antifraud.lastDecision}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">规则信息</h4>
                    {caseData.antifraud.rules && caseData.antifraud.rules.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm font-medium text-gray-500">规则代码</div>
                        <div className="text-sm font-medium text-gray-500">规则名称</div>
                        {caseData.antifraud.rules.map((rule, index) => (
                          <>
                            <div key={`code-${index}`} className="text-sm">{rule.code}</div>
                            <div key={`name-${index}`} className="text-sm">{rule.name}</div>
                          </>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <span>暂无规则信息</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 text-gray-500">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>暂无反欺诈信息</span>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="datasource">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="space-y-6">
              {/* 决策流5 */}
              {caseData.decisionFlows?.flow5 && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBar className="h-4 w-4 text-blue-500" />
                    <h3 className="text-md font-medium">决策流5</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow5.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow5.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow5.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              )}
              
              {/* 决策流4 */}
              {caseData.decisionFlows?.flow4 && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBar className="h-4 w-4 text-blue-500" />
                    <h3 className="text-md font-medium">决策流4</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow4.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow4.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow4.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              )}
              
              {/* 决策流3 */}
              {caseData.decisionFlows?.flow3 && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBar className="h-4 w-4 text-blue-500" />
                    <h3 className="text-md font-medium">决策流3</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow3.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow3.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow3.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              )}
              
              {/* 决策流2 */}
              {caseData.decisionFlows?.flow2 && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBar className="h-4 w-4 text-blue-500" />
                    <h3 className="text-md font-medium">决策流2</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow2.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow2.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow2.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              )}
              
              {/* 决策流1 */}
              {caseData.decisionFlows?.flow1 && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBar className="h-4 w-4 text-blue-500" />
                    <h3 className="text-md font-medium">决策流1</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow1.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow1.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow1.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              )}
              
              {/* 决策流0 */}
              {caseData.decisionFlows?.flow0 && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBar className="h-4 w-4 text-blue-500" />
                    <h3 className="text-md font-medium">决策流0</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500 mr-2">决策节点：</span>
                      <span className="font-medium">{caseData.decisionFlows.flow0.point}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 mr-2">数据调用信息：</span>
                    {parseDecisionFlowInfo(caseData.decisionFlows.flow0.info).length > 0 ? (
                      <div className="mt-1">
                        {parseDecisionFlowInfo(caseData.decisionFlows.flow0.info).map((item, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded mb-1">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <span>无</span>
                    )}
                  </div>
                </div>
              )}
              
              {!caseData.decisionFlows && (
                <p className="text-gray-500 text-center py-4">暂无数据源信息</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 