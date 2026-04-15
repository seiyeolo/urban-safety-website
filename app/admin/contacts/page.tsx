import AdminContentManager from '@/components/admin/AdminContentManager'

export default function AdminContactsPage() {
  return (
    <AdminContentManager
      section="contacts"
      title="문의 내역"
      description="홈페이지에서 접수된 문의를 확인하고 처리 상태를 관리합니다."
      emptyMessage="접수된 문의가 없습니다."
      createInitial={{
        name: '',
        phone: '',
        email: '',
        inquiryType: '기타',
        title: '',
        message: '',
        privacyConsent: true,
        submittedAt: new Date().toISOString(),
        status: 'new',
      }}
      fields={[
        { key: 'name', label: '이름' },
        { key: 'phone', label: '연락처' },
        { key: 'email', label: '이메일' },
        { key: 'inquiryType', label: '문의 유형', type: 'select', options: ['교육 및 자격증 문의', '단체교육 문의', '제휴 문의', '기타'] },
        { key: 'title', label: '제목' },
        { key: 'message', label: '내용', type: 'textarea' },
        { key: 'submittedAt', label: '접수 시각', placeholder: '예: 2026-04-15T09:00:00.000Z' },
        {
          key: 'status',
          label: '처리 상태',
          type: 'select',
          options: ['new', 'in_progress', 'done'],
          displayMap: {
            new: '신규',
            in_progress: '처리 중',
            done: '완료',
          },
        },
        { key: 'privacyConsent', label: '개인정보 동의', type: 'checkbox' },
      ]}
    />
  )
}
