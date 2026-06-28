import AdminContentManager from '@/components/admin/AdminContentManager'

export default function AdminFilesPage() {
  return (
    <AdminContentManager
      section="downloads"
      title="자료실 관리"
      description="자료실 목록과 다운로드 정보를 관리합니다."
      emptyMessage="등록된 자료가 없습니다."
      createInitial={{
        category: '교육 자료',
        title: '',
        type: 'PDF',
        size: '',
        date: new Date().toISOString().slice(0, 10),
        href: '#',
      }}
      fields={[
        { key: 'category', label: '분류', type: 'select', options: ['교육 자료', '홍보 자료', '서식', '기타'] },
        { key: 'title', label: '자료명', placeholder: '자료 제목을 입력하세요.' },
        { key: 'type', label: '파일 형식', type: 'select', options: ['PDF', 'HWP', 'PPT', 'XLSX'] },
        { key: 'size', label: '파일 크기', placeholder: '예: 1.2MB' },
        { key: 'date', label: '등록일', type: 'date' },
        { key: 'href', label: '다운로드 링크', placeholder: '예: /files/guide.pdf 또는 외부 링크' },
      ]}
    />
  )
}
