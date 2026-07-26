'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Textarea } from '@/components/ui'

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

  const privacyId = `${formId}-privacy`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="담당자 이름"
          required
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="홍길동"
        />
        <Input
          label="연락처"
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="010-0000-0000"
        />
      </div>

      <Input
        label="기관·단체명"
        required
        name="organization"
        type="text"
        autoComplete="organization"
        value={form.organization}
        onChange={(e) => updateField('organization', e.target.value)}
        placeholder="○○복지관"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Select
          label="예상 참여 인원"
          name="participants"
          value={form.participants}
          onChange={(e) => updateField('participants', e.target.value)}
        >
          <option value="">선택해주세요</option>
          <option value="10~30명">10~30명</option>
          <option value="30~50명">30~50명</option>
          <option value="50~100명">50~100명</option>
          <option value="100명 이상">100명 이상</option>
        </Select>
        <Select
          label="희망 교육 주제"
          name="topic"
          value={form.topic}
          onChange={(e) => updateField('topic', e.target.value)}
        >
          <option value="">선택해주세요</option>
          <option value="보이스피싱 예방">보이스피싱 예방</option>
          <option value="생활안전">생활안전</option>
          <option value="두 주제 모두">두 주제 모두</option>
          <option value="기타 협의">기타 협의</option>
        </Select>
      </div>

      <Input
        label="교육 희망 일정"
        name="schedule"
        type="text"
        value={form.schedule}
        onChange={(e) => updateField('schedule', e.target.value)}
        placeholder="예) 2026년 6월 중, 매주 화요일 오후 등"
      />

      <Textarea
        label="요청 사항"
        name="notes"
        rows={4}
        value={form.notes}
        onChange={(e) => updateField('notes', e.target.value)}
        placeholder="교육 대상, 목적, 특이사항 등을 자유롭게 적어주세요"
      />

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id={privacyId}
          name="privacyConsent"
          checked={form.privacyConsent}
          onChange={(e) => updateField('privacyConsent', e.target.checked)}
          className="mt-1.5"
          required
        />
        <label htmlFor={privacyId} className="text-sm text-neutral-700">
          <Link href="/privacy" className="text-brand-600 underline">
            개인정보처리방침
          </Link>
          에 동의합니다. <span className="text-danger-600">*</span>
        </label>
      </div>

      {error && (
        <p role="alert" aria-live="assertive" className="text-sm text-danger-600">
          {error}
        </p>
      )}
      {message && (
        <p role="status" aria-live="polite" className="text-sm text-success-600">
          {message}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? '전송 중…' : '단체교육 문의 보내기'}
      </Button>
    </form>
  )
}
