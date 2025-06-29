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
                计算信息
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center text-gray-500 py-8">
              放款信息功能开发中...
            </div>
          </div>
        </TabsContent>

        {/* 还款信息标签页 */}
        <TabsContent value="repayment-info" className="mt-0">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center text-gray-500 py-8">
              还款信息功能开发中...
            </div>
          </div>
        </TabsContent>

        {/* 计算信息标签页 */}
        <TabsContent value="calculation-info" className="mt-0">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center text-gray-500 py-8">
              计算信息功能开发中...
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
