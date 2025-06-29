import { MainLayout } from "@/features/layout/components/main-layout"
import { ProductDetail } from "@/features/product-management/components/product-detail"

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
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
