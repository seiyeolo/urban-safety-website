'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Textarea } from '@/components/ui'
import type { ScheduleItem } from '@/lib/content-types'

interface EducationInquiryFormProps {
  schedules?: ScheduleItem[]
}

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  course: '보이스피싱 예방지도사',
  mode: '온라인 교육',
  schedule: '',
  message: '',
  privacyConsent: false,
}

export default function EducationInquiryForm({ schedules = [] }: EducationInquiryFormProps) {
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    schedule: schedules[0] ? `${schedules[0].date} - ${schedules[0].title}` : '',
  })
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

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      inquiryType: '교육 신청',
      title: `[교육 신청] ${form.course} / ${form.mode}`,
      message: [
        `[선택 교육과정] ${form.course}`,
        `[수강 방식] ${form.mode}`,
        `[희망 기수/일정] ${form.schedule || '미선택'}`,
        form.message && `[특이사항/질문]\n${form.message}`,
      ]
        .filter(Boolean)
        .join('\n\n'),
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
        setError(data.error ?? '수강 신청 접수에 실패했습니다.')
        return
      }

      setForm({
        ...INITIAL_FORM,
        schedule: schedules[0] ? `${schedules[0].date} - ${schedules[0].title}` : '',
      })
      setMessage('수강 신청이 접수되었습니다. 1~2 영업일 내에 확인 연락드리겠습니다.')
    } catch {
      setError('네트워크 오류로 수강 신청을 접수하지 못했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="이름"
        required
        type="text"
        autoComplete="name"
        value={form.name}
        onChange={(event) => updateField('name', event.target.value)}
        placeholder="성명을 입력하세요"
      />
      <Input
        label="연락처"
        required
        type="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={(event) => updateField('phone', event.target.value)}
        placeholder="010-0000-0000"
      />
      <Input
        label="이메일"
        required
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(event) => updateField('email', event.target.value)}
        placeholder="name@example.com"
      />

      <Select
        label="선택한 교육과정"
        value={form.course}
        onChange={(event) => updateField('course', event.target.value)}
      >
        <option>보이스피싱 예방지도사</option>
        <option>생활안전지도사</option>
      </Select>

      <Select
        label="수강 방식"
        value={form.mode}
        onChange={(event) => updateField('mode', event.target.value)}
      >
        <option>온라인 교육</option>
        <option>오프라인 교육</option>
        <option>기관·단체 교육</option>
      </Select>

      <Select
        label="희망 기수/일정"
        value={form.schedule}
        onChange={(event) => updateField('schedule', event.target.value)}
      >
        {schedules.length > 0 ? (
          schedules.map((item) => (
            <option key={item.id} value={`${item.date} - ${item.title}`}>
              {item.date} - {item.title}
            </option>
          ))
        ) : (
          <option value="">현재 모집 중인 기수가 없습니다 — 전화로 문의해주세요</option>
        )}
      </Select>

      <div className="md:col-span-2">
        <Textarea
          label="특이사항/질문 (선택사항)"
          rows={4}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="궁금한 사항이나 요청사항을 입력하세요"
        />
      </div>

      <div className="md:col-span-2">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.privacyConsent}
            onChange={(event) => updateField('privacyConsent', event.target.checked)}
            className="w-5 h-5 text-cta-700 border-gray-300 rounded focus:ring-cta-700"
            required
          />
          <span className="text-sm text-gray-700">
            <Link href="/privacy" className="text-cta-700 underline">개인정보처리방침</Link>에 동의합니다 *
          </span>
        </label>
      </div>

      <div className="md:col-span-2" aria-live="polite">
        {error && <p role="alert" className="mb-3 text-sm text-danger-600">{error}</p>}
        {message && <p role="status" className="mb-3 text-sm text-success-600">{message}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? '접수 중...' : '수강 신청하기'}
        </Button>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>1-2 영업일 내 확인 연락 | <Link href="/refund" className="text-cta-700 hover:underline">취소/환불 규정 보기</Link></p>
        </div>
      </div>
    </form>
  )
}
