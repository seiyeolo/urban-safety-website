'use client'

import { useId, useState } from 'react'
import Link from 'next/link'

const INITIAL_FORM = {
  name: '',
  phone: '',
  organization: '',
  participants: '',
  topic: '',
  schedule: '',
  notes: '',
  privacyConsent: false,
}

export default function GroupInquiryForm() {
  const formId = useId()
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function updateField<K extends keyof typeof INITIAL_FORM>(
    key: K,
    value: (typeof INITIAL_FORM)[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setMessage('')
    setError('')

    // /api/contact 스키마에 맞춰 단체문의 필드를 통합
    const messageBody = [
      `[기관/단체명] ${form.organization}`,
      form.participants && `[예상 참여 인원] ${form.participants}`,
      form.topic && `[희망 교육 주제] ${form.topic}`,
      form.schedule && `[희망 일정] ${form.schedule}`,
      form.notes && `[요청 사항]\n${form.notes}`,
    ]
      .filter(Boolean)
      .join('\n\n')

    const payload = {
      name: form.name,
      phone: form.phone,
      email: '',
      inquiryType: '단체교육 문의',
      title: `[단체교육] ${form.organization || form.name} 문의`,
      message: messageBody,
      privacyConsent: form.privacyConsent,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        setError(data.error ?? '문의 접수에 실패했습니다.')
        setSubmitting(false)
        return
      }

      setForm(INITIAL_FORM)
      setMessage('단체교육 문의가 접수되었습니다. 담당자가 1~2 영업일 내에 연락드리겠습니다.')
    } catch {
      setError('네트워크 오류로 문의를 접수하지 못했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  const ids = {
    name: `${formId}-name`,
    phone: `${formId}-phone`,
    organization: `${formId}-organization`,
    participants: `${formId}-participants`,
    topic: `${formId}-topic`,
    schedule: `${formId}-schedule`,
    notes: `${formId}-notes`,
    privacy: `${formId}-privacy`,
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={ids.name} className="block text-sm font-medium text-gray-700 mb-1.5">
            담당자 이름 <span className="text-red-500">*</span>
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="홍길동"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
          />
        </div>
        <div>
          <label htmlFor={ids.phone} className="block text-sm font-medium text-gray-700 mb-1.5">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="010-0000-0000"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
          />
        </div>
      </div>

      <div>
        <label htmlFor={ids.organization} className="block text-sm font-medium text-gray-700 mb-1.5">
          기관·단체명 <span className="text-red-500">*</span>
        </label>
        <input
          id={ids.organization}
          name="organization"
          type="text"
          autoComplete="organization"
          value={form.organization}
          onChange={(e) => updateField('organization', e.target.value)}
          placeholder="○○복지관"
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={ids.participants} className="block text-sm font-medium text-gray-700 mb-1.5">
            예상 참여 인원
          </label>
          <select
            id={ids.participants}
            name="participants"
            value={form.participants}
            onChange={(e) => updateField('participants', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] bg-white"
          >
            <option value="">선택해주세요</option>
            <option value="10~30명">10~30명</option>
            <option value="30~50명">30~50명</option>
            <option value="50~100명">50~100명</option>
            <option value="100명 이상">100명 이상</option>
          </select>
        </div>
        <div>
          <label htmlFor={ids.topic} className="block text-sm font-medium text-gray-700 mb-1.5">
            희망 교육 주제
          </label>
          <select
            id={ids.topic}
            name="topic"
            value={form.topic}
            onChange={(e) => updateField('topic', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] bg-white"
          >
            <option value="">선택해주세요</option>
            <option value="보이스피싱 예방">보이스피싱 예방</option>
            <option value="생활안전">생활안전</option>
            <option value="두 주제 모두">두 주제 모두</option>
            <option value="기타 협의">기타 협의</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={ids.schedule} className="block text-sm font-medium text-gray-700 mb-1.5">
          교육 희망 일정
        </label>
        <input
          id={ids.schedule}
          name="schedule"
          type="text"
          value={form.schedule}
          onChange={(e) => updateField('schedule', e.target.value)}
          placeholder="예) 2026년 6월 중, 매주 화요일 오후 등"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
        />
      </div>

      <div>
        <label htmlFor={ids.notes} className="block text-sm font-medium text-gray-700 mb-1.5">
          요청 사항
        </label>
        <textarea
          id={ids.notes}
          name="notes"
          rows={4}
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="교육 대상, 목적, 특이사항 등을 자유롭게 적어주세요"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] resize-none"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id={ids.privacy}
          name="privacyConsent"
          checked={form.privacyConsent}
          onChange={(e) => updateField('privacyConsent', e.target.checked)}
          className="mt-1"
          required
        />
        <label htmlFor={ids.privacy} className="text-sm text-gray-600">
          <Link href="/privacy" className="text-[#0f2d5e] underline">
            개인정보처리방침
          </Link>
          에 동의합니다. <span className="text-red-500">*</span>
        </label>
      </div>

      {error && (
        <p role="alert" aria-live="assertive" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {message && (
        <p role="status" aria-live="polite" className="text-sm text-emerald-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full justify-center py-4 disabled:opacity-60"
      >
        {submitting ? '전송 중…' : '단체교육 문의 보내기'}
      </button>
    </form>
  )
}
