import AdminContentManager from '@/components/admin/AdminContentManager'

export default function AdminFilesPage() {
  return (
    <AdminContentManager
      section="downloads"
      title="자료실 관리"
      description="파일을 올리면 자료명·형식·크기가 자동으로 채워집니다."
      emptyMessage="등록된 자료가 없습니다."
      createInitial={{
        category: '교육 자료',
        title: '',
        type: 'PDF',
        size: '',
        date: new Date().toISOString().slice(0, 10),
        // '#'이 기본값이면 새 항목마다 검증에서 막힌다 — 파일을 올리면 자동으로 채워진다
        href: '',
      }}
      fields={[
        // 파일부터 고르게 맨 위에 둔다 — 나머지 칸이 자동으로 채워진다
        {
          key: 'href',
          label: '파일',
          type: 'file',
          placeholder: '파일을 올리거나 외부 주소를 직접 입력',
          autoFill: { size: 'size', type: 'type', title: 'title' },
        },
        { key: 'title', label: '자료명', placeholder: '자료 제목을 입력하세요.' },
        { key: 'category', label: '분류', type: 'select', options: ['교육 자료', '홍보 자료', '서식', '기타'] },
        { key: 'type', label: '파일 형식', type: 'select', options: ['PDF', 'HWP', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'ZIP', 'JPG', 'PNG'] },
        { key: 'size', label: '파일 크기', placeholder: '업로드하면 자동 입력' },
        { key: 'date', label: '등록일', type: 'date' },
      ]}
    />
  )
}
