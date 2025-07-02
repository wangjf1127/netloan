import { redirect } from 'next/navigation'

export default function IdentityRecordPage() {
  // 重定向到身份证OCR认证记录页面
  redirect('/identity-record/id-card-ocr')
}
