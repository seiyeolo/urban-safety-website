'use client'

import { useState } from 'react'
import Link from 'next/link'

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

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = (await response.json().catch(() => ({}))) as { error?: string }

    if (!response.ok) {
      setError(data.error ?? '문의 접수에 실패했습니다.')
      setSubmitting(false)
      return
    }

    setForm(INITIAL_FORM)
    setMessage('제휴 문의가 접수되었습니다. 담당자가 검토 후 연락드리겠습니다.')
    setSubmitting(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="홍길동"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="example@email.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">소속 기관·단체</label>
          <input
            type="text"
            value={form.organization}
            onChange={(event) => updateField('organization', event.target.value)}
            placeholder="소속 기관명을 입력해주세요"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            제휴 유형 <span className="text-red-500">*</span>
          </label>
          <select
            value={form.inquiryType}
            onChange={(event) => updateField('inquiryType', event.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] bg-white"
            required
          >
            <option value="기관 협력 제안">기관 협력 제안</option>
            <option value="강사 파트너 등록">강사 파트너 등록</option>
            <option value="기타 제휴 제안">기타 제휴 제안</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            제안 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            placeholder="협력 목적, 희망 협력 내용, 기대 효과 등을 작성해주세요."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] resize-none"
            required
          />
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="partner-privacy"
            checked={form.privacyConsent}
            onChange={(event) => updateField('privacyConsent', event.target.checked)}
            className="mt-1"
            required
          />
          <label htmlFor="partner-privacy" className="text-sm text-gray-600">
            <Link href="/privacy" className="text-[#0f2d5e] underline">
              개인정보처리방침
            </Link>
            에 동의합니다. <span className="text-red-500">*</span>
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}

        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-4 disabled:opacity-60">
          {submitting ? '전송 중...' : '제휴 문의 보내기'}
        </button>
      </form>
    </>
  )
}
