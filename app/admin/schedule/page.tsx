import AdminContentManager from '@/components/admin/AdminContentManager'

export default function AdminSchedulePage() {
  // 기본 월을 '2026년 4월'로 박아뒀더니 시간이 지나 지난 달이 먼저 뜨고 있었다.
  // 새 일정은 대개 이번 달 이후이므로 현재 월을 기본값으로 준다.
  const now = new Date()
  const currentMonth = `${now.getFullYear()}년 ${now.getMonth() + 1}월`

  return (
    <AdminContentManager
      section="schedules"
      title="교육 일정 관리"
      description="개강, 특강, 단체교육 일정을 관리합니다."
      emptyMessage="등록된 교육 일정이 없습니다."
      createInitial={{
        month: currentMonth,
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
