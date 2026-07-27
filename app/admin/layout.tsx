import StorageStatusBanner from '@/components/admin/StorageStatusBanner'

/**
 * 관리자 전용 레이아웃.
 *
 * 저장소 상태 배너를 모든 관리 화면 상단에 한 번에 붙인다.
 * (공개 사이트의 헤더·푸터는 LayoutWrapper가 /admin 경로를 이미 제외한다)
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StorageStatusBanner />
      {children}
    </>
  )
}
