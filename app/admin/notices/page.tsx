import AdminContentManager from '@/components/admin/AdminContentManager'

export default function AdminNoticesPage() {
  return (
    <AdminContentManager
      section="notices"
      title="공지사항 관리"
      description="공지 목록을 등록, 수정, 삭제할 수 있습니다."
      emptyMessage="등록된 공지사항이 없습니다."
      createInitial={{
        category: '공지',
        title: '',
        date: new Date().toISOString().slice(0, 10),
        isNew: true,
      }}
      fields={[
        { key: 'category', label: '카테고리', type: 'select', options: ['공지', '합격자 발표', '안내'] },
        { key: 'title', label: '제목', placeholder: '공지 제목을 입력하세요.' },
        { key: 'date', label: '등록일', type: 'date' },
        { key: 'isNew', label: 'NEW 표시', type: 'checkbox' },
      ]}
    />
  )
}
