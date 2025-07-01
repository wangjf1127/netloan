import { MainLayout } from "@/features/layout/components/main-layout"
import { ProductDetail } from "@/features/product-management/components/product-detail"

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// 为静态导出生成静态参数
export async function generateStaticParams() {
  // 生成产品ID 1-129 的静态参数
  const productIds = []
  for (let i = 1; i <= 129; i++) {
    productIds.push({ id: i.toString() })
  }
  // 添加一些常用的测试ID
  productIds.push(
    { id: 'demo' },
    { id: '123' },
    { id: '456' }
  )
  return productIds
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // 在异步组件中需要先await params
  const { id } = await params;
  
  return (
    <MainLayout>
      <ProductDetail productId={id} />
    </MainLayout>
  )
}
