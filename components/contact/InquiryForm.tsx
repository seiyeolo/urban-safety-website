'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Textarea } from '@/components/ui'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  inquiryType: '',
  title: '',
  message: '',
  privacyConsent: false,
}

export default function InquiryForm() {
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

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = (await response.json().catch(() => ({}))) as { error?: string }

    if (!response.ok) {
      setError(data.error ?? '문의 접수에 실패했습니다.')
      setSubmitting(false)
      return
    }

    setForm(INITIAL_FORM)
    setMessage('문의가 접수되었습니다. 1~2 영업일 내에 답변드리겠습니다.')
    setSubmitting(false)
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

        <Select
          label="문의 유형"
          required
          value={form.inquiryType}
          onChange={(event) => updateField('inquiryType', event.target.value)}
        >
          <option value="">선택해주세요</option>
          <option value="교육 및 자격증 문의">교육 및 자격증 문의</option>
          <option value="단체교육 문의">단체교육 문의</option>
          <option value="제휴 문의">제휴 문의</option>
          <option value="기타">기타</option>
        </Select>

        <Input
          label="제목"
          required
          type="text"
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="문의 제목을 입력해주세요"
        />

        <Textarea
          label="내용"
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="문의 내용을 자세히 입력해주세요"
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="privacy"
            checked={form.privacyConsent}
            onChange={(event) => updateField('privacyConsent', event.target.checked)}
            className="mt-1.5"
            required
          />
          <label htmlFor="privacy" className="text-sm text-neutral-700">
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
          {submitting ? '전송 중...' : '문의 보내기'}
        </Button>
      </form>
      <p className="text-xs text-neutral-600 mt-3 text-center">
        문의 접수 후 1~2 영업일 내 답변 드립니다.
      </p>
    </>
  )
}
