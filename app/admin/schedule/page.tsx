import AdminContentManager from '@/components/admin/AdminContentManager'

export default function AdminSchedulePage() {
  return (
    <AdminContentManager
      section="schedules"
      title="교육 일정 관리"
      description="개강, 특강, 단체교육 일정을 관리합니다."
      emptyMessage="등록된 교육 일정이 없습니다."
      createInitial={{
        month: '2026년 4월',
        date: '',
        type: '온라인',
        title: '',
        seats: '모집 중',
        href: '',
      }}
      fields={[
        { key: 'month', label: '월 구분', placeholder: '예: 2026년 4월' },
        { key: 'date', label: '일정 표기', placeholder: '예: 04.25 (금)' },
        { key: 'type', label: '유형', type: 'select', options: ['온라인', '오프라인'] },
        { key: 'title', label: '일정명', placeholder: '예: 보이스피싱 예방지도사 3기 개강' },
        { key: 'seats', label: '상태', placeholder: '예: 모집 중 / 예정 / 잔여 5석' },
        { key: 'href', label: '연결 경로', placeholder: '예: /certificates/voice-phishing' },
      ]}
    />
  )
}
