"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "../../../../components/ui/use-mobile";
import { ResponsiveBreadcrumb } from "@/shared/components/ui/responsive-breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ProductDetailSkeleton } from "./product-detail-skeleton";
import { useProductDetail } from "../hooks/use-product-detail";
import type { ProductDetailProps } from "../types";

export function ProductDetail({ productId }: ProductDetailProps) {
  const isMobile = useIsMobile();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic-info");
  
  const { data: product, isLoading, error } = useProductDetail(productId);

  // 初始加载时显示骨架屏
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000); // 显示骨架屏1秒钟，模拟加载过程
    
    return () => clearTimeout(timer);
  }, []);

  // 显示骨架屏
  if (isInitialLoading || isLoading) {
    return <ProductDetailSkeleton />;
  }

  // 错误状态
  if (error) {
    return (
      <div className="flex flex-col h-full">
        <ResponsiveBreadcrumb
          items={[
            { label: "产品管理", href: "/product-management" },
            { label: "产品查询", href: "/product-management/product-query" },
            { label: "产品详情" }
          ]}
          backLink="/product-management/product-query"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-2">加载产品详情失败</div>
            <div className="text-gray-500 text-sm">请稍后重试</div>
          </div>
        </div>
      </div>
    );
  }

  // 数据不存在
  if (!product) {
    return (
      <div className="flex flex-col h-full">
        <ResponsiveBreadcrumb
          items={[
            { label: "产品管理", href: "/product-management" },
            { label: "产品查询", href: "/product-management/product-query" },
            { label: "产品详情" }
          ]}
          backLink="/product-management/product-query"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-2">产品不存在</div>
            <div className="text-gray-400 text-sm">请检查产品ID是否正确</div>
          </div>
        </div>
      </div>
    );
  }

  // 格式化数值显示
  const formatNumber = (value: number) => {
    if (value === 0) return "0";
    return value.toLocaleString();
  };

  // 格式化空值显示
  const formatValue = (value: string | number | undefined) => {
    if (value === undefined || value === null || value === "") return "-";
    return value;
  };

  return (
    <div className="flex flex-col h-full">
      {/* 面包屑导航 */}
      <ResponsiveBreadcrumb
        items={[
          { label: "产品管理", href: "/product-management" },
          { label: "产品查询", href: "/product-management/product-query" },
          { label: "产品详情" }
        ]}
        backLink="/product-management/product-query"
      />

      {/* 标签页 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsContent value="basic-info" className="mt-0">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* 页签导航放在内容区域顶部，替换基本信息标题 */}
            <TabsList className="w-full bg-white border-b border-gray-200 rounded-t-lg rounded-b-none p-1 justify-start">
              <TabsTrigger
                value="basic-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                基本信息
              </TabsTrigger>
              <TabsTrigger
                value="payment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                放款信息
              </TabsTrigger>
              <TabsTrigger
                value="repayment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                还款信息
              </TabsTrigger>
              <TabsTrigger
                value="calculation-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                计息信息
              </TabsTrigger>
            </TabsList>

            {/* 基本信息内容 */}
            {isMobile ? (
              // 移动端卡片布局
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">机构代码</span>
                    <span className="font-medium">{formatValue(product.institutionCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">机构名称</span>
                    <span className="font-medium">{formatValue(product.institutionName)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">分支机构</span>
                    <span className="font-medium">{formatValue(product.branchInstitution)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">产品代码</span>
                    <span className="font-medium">{formatValue(product.productCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">产品名称</span>
                    <span className="font-medium">{formatValue(product.productName)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">产品描述</span>
                    <span className="font-medium">{formatValue(product.productDescription)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">货币代码</span>
                    <span className="font-medium">{formatValue(product.currencyCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">贷款类型</span>
                    <span className="font-medium">{formatValue(product.loanType)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">贷款分类细分1</span>
                    <span className="font-medium">{formatValue(product.loanSubType1)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">贷款分类细分2</span>
                    <span className="font-medium">{formatValue(product.loanSubType2)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">贷款对象</span>
                    <span className="font-medium">{formatValue(product.loanTarget)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">业务分类</span>
                    <span className="font-medium">{formatValue(product.businessCategory)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">对象范围</span>
                    <span className="font-medium">{formatValue(product.targetScope)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">日历类型</span>
                    <span className="font-medium">{formatValue(product.calendarType)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最小正常利率%</span>
                    <span className="font-medium">{product.minNormalRate}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最大正常利率%</span>
                    <span className="font-medium">{product.maxNormalRate}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最小逾期利率%</span>
                    <span className="font-medium">{product.minOverdueRate}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最大逾期利率%</span>
                    <span className="font-medium">{product.maxOverdueRate}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最小复息利率%</span>
                    <span className="font-medium">{product.minCompoundRate}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最大复息利率%</span>
                    <span className="font-medium">{product.maxCompoundRate}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">生效日期</span>
                    <span className="font-medium">{formatValue(product.effectiveDate)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">失效日期</span>
                    <span className="font-medium">{formatValue(product.expiryDate)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">额度类型</span>
                    <span className="font-medium">{formatValue(product.creditType)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">产品最大授信额度</span>
                    <span className="font-medium">{formatNumber(product.productMaxCredit)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">客户产品最大授信额度</span>
                    <span className="font-medium">{formatNumber(product.customerMaxCredit)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">额度有效年份</span>
                    <span className="font-medium">{product.creditValidYears}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">产品状态</span>
                    <span className="font-medium">{formatValue(product.productStatus)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">还款方式方案</span>
                    <span className="font-medium break-all">{formatValue(product.repaymentPlan)}</span>
                  </div>
                </div>
              </div>
            ) : (
              // 桌面端2列布局
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-40 text-gray-500">机构代码:</span>
                      <span className="font-medium">{formatValue(product.institutionCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">机构名称:</span>
                      <span className="font-medium">{formatValue(product.institutionName)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">分支机构:</span>
                      <span className="font-medium">{formatValue(product.branchInstitution)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">产品代码:</span>
                      <span className="font-medium">{formatValue(product.productCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">产品名称:</span>
                      <span className="font-medium">{formatValue(product.productName)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">产品描述:</span>
                      <span className="font-medium">{formatValue(product.productDescription)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">货币代码:</span>
                      <span className="font-medium">{formatValue(product.currencyCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">贷款类型:</span>
                      <span className="font-medium">{formatValue(product.loanType)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">贷款分类细分1:</span>
                      <span className="font-medium">{formatValue(product.loanSubType1)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">贷款分类细分2:</span>
                      <span className="font-medium">{formatValue(product.loanSubType2)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">贷款对象:</span>
                      <span className="font-medium">{formatValue(product.loanTarget)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">业务分类:</span>
                      <span className="font-medium">{formatValue(product.businessCategory)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">对象范围:</span>
                      <span className="font-medium">{formatValue(product.targetScope)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">日历类型:</span>
                      <span className="font-medium">{formatValue(product.calendarType)}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-40 text-gray-500">最小正常利率%:</span>
                      <span className="font-medium">{product.minNormalRate}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">最大正常利率%:</span>
                      <span className="font-medium">{product.maxNormalRate}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">最小逾期利率%:</span>
                      <span className="font-medium">{product.minOverdueRate}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">最大逾期利率%:</span>
                      <span className="font-medium">{product.maxOverdueRate}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">最小复息利率%:</span>
                      <span className="font-medium">{product.minCompoundRate}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">最大复息利率%:</span>
                      <span className="font-medium">{product.maxCompoundRate}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">生效日期:</span>
                      <span className="font-medium">{formatValue(product.effectiveDate)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">失效日期:</span>
                      <span className="font-medium">{formatValue(product.expiryDate)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">额度类型:</span>
                      <span className="font-medium">{formatValue(product.creditType)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">产品最大授信额度:</span>
                      <span className="font-medium">{formatNumber(product.productMaxCredit)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">客户产品最大授信额度:</span>
                      <span className="font-medium">{formatNumber(product.customerMaxCredit)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">额度有效年份:</span>
                      <span className="font-medium">{product.creditValidYears}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">产品状态:</span>
                      <span className="font-medium">{formatValue(product.productStatus)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">还款方式方案:</span>
                      <span className="font-medium break-all">{formatValue(product.repaymentPlan)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* 放款信息标签页 */}
        <TabsContent value="payment-info" className="mt-0">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* 页签导航放在内容区域顶部 */}
            <TabsList className="w-full bg-white border-b border-gray-200 rounded-t-lg rounded-b-none p-1 justify-start">
              <TabsTrigger
                value="basic-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                基本信息
              </TabsTrigger>
              <TabsTrigger
                value="payment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                放款信息
              </TabsTrigger>
              <TabsTrigger
                value="repayment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                还款信息
              </TabsTrigger>
              <TabsTrigger
                value="calculation-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                计息信息
              </TabsTrigger>
            </TabsList>

            {/* 放款信息内容 */}
            {isMobile ? (
              // 移动端卡片布局
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">机构代码</span>
                    <span className="font-medium">{formatValue(product.institutionCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">机构名称</span>
                    <span className="font-medium">{formatValue(product.institutionName)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">分支机构</span>
                    <span className="font-medium">{formatValue(product.branchInstitution)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">部件代码</span>
                    <span className="font-medium">{formatValue(product.componentCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">部件名称</span>
                    <span className="font-medium">{formatValue(product.componentName)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">货币代码</span>
                    <span className="font-medium">{formatValue(product.currencyCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最短贷款期限</span>
                    <span className="font-medium">{formatValue(product.minLoanTerm)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最长贷款期限</span>
                    <span className="font-medium">{formatValue(product.maxLoanTerm)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最大放款次数</span>
                    <span className="font-medium">{formatValue(product.maxLoanCount)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">资金来源</span>
                    <span className="font-medium">{formatValue(product.fundingSource)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">每次最小金额</span>
                    <span className="font-medium">{product.minAmount ? formatNumber(product.minAmount) : '-'}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">每次最大金额</span>
                    <span className="font-medium">{product.maxAmount ? formatNumber(product.maxAmount) : '-'}</span>
                  </div>
                </div>
              </div>
            ) : (
              // 桌面端2列布局
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-40 text-gray-500">机构代码:</span>
                      <span className="font-medium">{formatValue(product.institutionCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">机构名称:</span>
                      <span className="font-medium">{formatValue(product.institutionName)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">分支机构:</span>
                      <span className="font-medium">{formatValue(product.branchInstitution)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">部件代码:</span>
                      <span className="font-medium">{formatValue(product.componentCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">部件名称:</span>
                      <span className="font-medium">{formatValue(product.componentName)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">货币代码:</span>
                      <span className="font-medium">{formatValue(product.currencyCode)}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-40 text-gray-500">最短贷款期限:</span>
                      <span className="font-medium">{formatValue(product.minLoanTerm)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">最长贷款期限:</span>
                      <span className="font-medium">{formatValue(product.maxLoanTerm)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">最大放款次数:</span>
                      <span className="font-medium">{formatValue(product.maxLoanCount)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">资金来源:</span>
                      <span className="font-medium">{formatValue(product.fundingSource)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">每次最小金额:</span>
                      <span className="font-medium">{product.minAmount ? formatNumber(product.minAmount) : '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 text-gray-500">每次最大金额:</span>
                      <span className="font-medium">{product.maxAmount ? formatNumber(product.maxAmount) : '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* 还款信息标签页 */}
        <TabsContent value="repayment-info" className="mt-0">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* 页签导航放在内容区域顶部 */}
            <TabsList className="w-full bg-white border-b border-gray-200 rounded-t-lg rounded-b-none p-1 justify-start">
              <TabsTrigger
                value="basic-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                基本信息
              </TabsTrigger>
              <TabsTrigger
                value="payment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                放款信息
              </TabsTrigger>
              <TabsTrigger
                value="repayment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                还款信息
              </TabsTrigger>
              <TabsTrigger
                value="calculation-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                计息信息
              </TabsTrigger>
            </TabsList>

            {/* 还款信息内容 */}
            {isMobile ? (
              // 移动端卡片布局
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">机构代码</span>
                    <span className="font-medium">{formatValue(product.institutionCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">机构名称</span>
                    <span className="font-medium">{formatValue(product.institutionName)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">分支机构</span>
                    <span className="font-medium">{formatValue(product.branchInstitution)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">部件代码</span>
                    <span className="font-medium">{formatValue(product.componentCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">部件名称</span>
                    <span className="font-medium">{formatValue(product.componentName)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">货币代码</span>
                    <span className="font-medium">{formatValue(product.currencyCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">还息周期</span>
                    <span className="font-medium">{formatValue(product.interestCycle)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">还本周期</span>
                    <span className="font-medium">{formatValue(product.principalCycle)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">按次还款周期</span>
                    <span className="font-medium">{formatValue(product.perPaymentCycle)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">已成直达款顺序</span>
                    <span className="font-medium">{formatValue(product.directPaymentOrder)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">还款顺序</span>
                    <span className="font-medium">{formatValue(product.repaymentOrder)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">还款最小天数</span>
                    <span className="font-medium">{formatValue(product.minRepaymentDays)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">最大还款日</span>
                    <span className="font-medium">{formatValue(product.maxRepaymentDay)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">固定还款日</span>
                    <span className="font-medium">{formatValue(product.fixedRepaymentDay)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">是否同一还款日</span>
                    <span className="font-medium">{formatValue(product.sameRepaymentDay)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">还款日规则</span>
                    <span className="font-medium">{formatValue(product.repaymentDayRule)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">首期与末期是否同日</span>
                    <span className="font-medium">{formatValue(product.firstLastSameDay)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">每期是否落月</span>
                    <span className="font-medium">{formatValue(product.monthlyDue)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">自动扣款规则</span>
                    <span className="font-medium">{formatValue(product.autoDeductRule)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">自动扣款标志</span>
                    <span className="font-medium">{formatValue(product.autoDeductFlag)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">自动结清标志</span>
                    <span className="font-medium">{formatValue(product.autoSettleFlag)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">多还款账户标志</span>
                    <span className="font-medium">{formatValue(product.multiAccountFlag)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">允许提前还当日放款</span>
                    <span className="font-medium">{formatValue(product.allowEarlyRepaymentSameDay)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">允许提前还款</span>
                    <span className="font-medium">{formatValue(product.allowEarlyRepayment)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">提前还款规则</span>
                    <span className="font-medium">{formatValue(product.earlyRepaymentRule)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">提前还款期数</span>
                    <span className="font-medium">{formatValue(product.earlyRepaymentPeriods)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">提前还款可金额号</span>
                    <span className="font-medium">{formatValue(product.earlyRepaymentAmountCode)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">提前还款最低金额规则</span>
                    <span className="font-medium">{formatValue(product.earlyRepaymentMinRule)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">提前还款最低金额取值</span>
                    <span className="font-medium">{formatValue(product.earlyRepaymentMinAmount)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">提前还款最高金额规则</span>
                    <span className="font-medium">{formatValue(product.earlyRepaymentMaxRule)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">提前还款最高金额取值</span>
                    <span className="font-medium">{formatValue(product.earlyRepaymentMaxAmount)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">是否有宽限期</span>
                    <span className="font-medium">{formatValue(product.hasGracePeriod)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">本金宽限期天数</span>
                    <span className="font-medium">{formatValue(product.principalGraceDays)}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">利息宽限期天数</span>
                    <span className="font-medium">{formatValue(product.interestGraceDays)}</span>
                  </div>
                </div>
              </div>
            ) : (
              // 桌面端2列布局
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">机构代码:</span>
                      <span className="font-medium text-left">{formatValue(product.institutionCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">机构名称:</span>
                      <span className="font-medium text-left">{formatValue(product.institutionName)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">分支机构:</span>
                      <span className="font-medium text-left">{formatValue(product.branchInstitution)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">部件代码:</span>
                      <span className="font-medium text-left">{formatValue(product.componentCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">部件名称:</span>
                      <span className="font-medium text-left">{formatValue(product.componentName)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">货币代码:</span>
                      <span className="font-medium text-left">{formatValue(product.currencyCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">还息周期:</span>
                      <span className="font-medium text-left">{formatValue(product.interestCycle)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">还本周期:</span>
                      <span className="font-medium text-left">{formatValue(product.principalCycle)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">按次还款周期:</span>
                      <span className="font-medium text-left">{formatValue(product.perPaymentCycle)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">已成直达款顺序:</span>
                      <span className="font-medium text-left">{formatValue(product.directPaymentOrder)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">还款顺序:</span>
                      <span className="font-medium text-left">{formatValue(product.repaymentOrder)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">还款最小天数:</span>
                      <span className="font-medium text-left">{formatValue(product.minRepaymentDays)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">最大还款日:</span>
                      <span className="font-medium text-left">{formatValue(product.maxRepaymentDay)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">固定还款日:</span>
                      <span className="font-medium text-left">{formatValue(product.fixedRepaymentDay)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">是否同一还款日:</span>
                      <span className="font-medium text-left">{formatValue(product.sameRepaymentDay)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">还款日规则:</span>
                      <span className="font-medium text-left">{formatValue(product.repaymentDayRule)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">首期与末期是否同日:</span>
                      <span className="font-medium text-left">{formatValue(product.firstLastSameDay)}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">每期是否落月:</span>
                      <span className="font-medium text-left">{formatValue(product.monthlyDue)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">自动扣款规则:</span>
                      <span className="font-medium text-left">{formatValue(product.autoDeductRule)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">自动扣款标志:</span>
                      <span className="font-medium text-left">{formatValue(product.autoDeductFlag)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">自动结清标志:</span>
                      <span className="font-medium text-left">{formatValue(product.autoSettleFlag)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">多还款账户标志:</span>
                      <span className="font-medium text-left">{formatValue(product.multiAccountFlag)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">允许提前还当日放款:</span>
                      <span className="font-medium text-left">{formatValue(product.allowEarlyRepaymentSameDay)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">允许提前还款:</span>
                      <span className="font-medium text-left">{formatValue(product.allowEarlyRepayment)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">提前还款规则:</span>
                      <span className="font-medium text-left">{formatValue(product.earlyRepaymentRule)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">提前还款期数:</span>
                      <span className="font-medium text-left">{formatValue(product.earlyRepaymentPeriods)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">提前还款可金额号:</span>
                      <span className="font-medium text-left">{formatValue(product.earlyRepaymentAmountCode)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">提前还款最低金额规则:</span>
                      <span className="font-medium text-left">{formatValue(product.earlyRepaymentMinRule)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">提前还款最低金额取值:</span>
                      <span className="font-medium text-left">{formatValue(product.earlyRepaymentMinAmount)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">提前还款最高金额规则:</span>
                      <span className="font-medium text-left">{formatValue(product.earlyRepaymentMaxRule)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">提前还款最高金额取值:</span>
                      <span className="font-medium text-left">{formatValue(product.earlyRepaymentMaxAmount)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">是否有宽限期:</span>
                      <span className="font-medium text-left">{formatValue(product.hasGracePeriod)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">本金宽限期天数:</span>
                      <span className="font-medium text-left">{formatValue(product.principalGraceDays)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-48 text-gray-500 flex-shrink-0">利息宽限期天数:</span>
                      <span className="font-medium text-left">{formatValue(product.interestGraceDays)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* 计息信息标签页 */}
        <TabsContent value="calculation-info" className="mt-0">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* 页签导航放在内容区域顶部 */}
            <TabsList className="w-full bg-white border-b border-gray-200 rounded-t-lg rounded-b-none p-1 justify-start">
              <TabsTrigger
                value="basic-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                基本信息
              </TabsTrigger>
              <TabsTrigger
                value="payment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                放款信息
              </TabsTrigger>
              <TabsTrigger
                value="repayment-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                还款信息
              </TabsTrigger>
              <TabsTrigger
                value="calculation-info"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                计息信息
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <div className="text-center text-gray-500 py-8">
                计息信息功能开发中...
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
