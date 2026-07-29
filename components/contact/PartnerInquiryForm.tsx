'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Textarea } from '@/components/ui'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  organization: '',
  inquiryType: '기관 협력 제안',
  message: '',
  privacyConsent: false,
}

export default function PartnerInquiryForm() {
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

    const body = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      inquiryType: form.inquiryType,
      title: `[제휴 문의] ${form.organization || form.name}`,
      message: `소속 기관·단체: ${form.organization || '미입력'}\n\n${form.message}`,
      privacyConsent: form.privacyConsent,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        setError(data.error ?? '문의 접수에 실패했습니다.')
        return
      }

      setForm(INITIAL_FORM)
      setMessage('제휴 문의가 접수되었습니다. 담당자가 검토 후 연락드리겠습니다.')
    } catch {
      setError('네트워크 오류로 제휴 문의를 접수하지 못했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            label="이름"
            required
            type="text"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="홍길동"
          />
          <Input
            label="연락처"
            required
            type="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            placeholder="010-0000-0000"
          />
        </div>

        <Input
          label="이메일"
          type="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          placeholder="example@email.com"
        />

        <Input
          label="소속 기관·단체"
          type="text"
          value={form.organization}
          onChange={(event) => updateField('organization', event.target.value)}
          placeholder="소속 기관명을 입력해주세요"
        />

        <Select
          label="제휴 유형"
          required
          value={form.inquiryType}
          onChange={(event) => updateField('inquiryType', event.target.value)}
        >
          <option value="기관 협력 제안">기관 협력 제안</option>
          <option value="강사 파트너 등록">강사 파트너 등록</option>
          <option value="기타 제휴 제안">기타 제휴 제안</option>
        </Select>

        <Textarea
          label="제안 내용"
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="협력 목적, 희망 협력 내용, 기대 효과 등을 작성해주세요."
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="partner-privacy"
            checked={form.privacyConsent}
            onChange={(event) => updateField('privacyConsent', event.target.checked)}
            className="mt-1.5"
            required
          />
          <label htmlFor="partner-privacy" className="text-sm text-neutral-700">
            <Link href="/privacy" className="text-brand-600 underline">
              개인정보처리방침
            </Link>
            에 동의합니다. <span className="text-danger-600">*</span>
          </label>
        </div>

        <div aria-live="polite">
          {error && <p className="text-sm text-danger-600">{error}</p>}
          {message && <p className="text-sm text-success-600">{message}</p>}
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? '전송 중...' : '제휴 문의 보내기'}
        </Button>
      </form>
    </>
  )
}
