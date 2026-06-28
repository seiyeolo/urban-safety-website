'use client'

import { useState } from 'react'
import Link from 'next/link'

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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
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
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            문의 유형 <span className="text-red-500">*</span>
          </label>
          <select
            value={form.inquiryType}
            onChange={(event) => updateField('inquiryType', event.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] transition-colors bg-white"
            required
          >
            <option value="">선택해주세요</option>
            <option value="교육 및 자격증 문의">교육 및 자격증 문의</option>
            <option value="단체교육 문의">단체교육 문의</option>
            <option value="제휴 문의">제휴 문의</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="문의 제목을 입력해주세요"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            placeholder="문의 내용을 자세히 입력해주세요"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors resize-none"
            required
          />
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="privacy"
            checked={form.privacyConsent}
            onChange={(event) => updateField('privacyConsent', event.target.checked)}
            className="mt-1"
            required
          />
          <label htmlFor="privacy" className="text-sm text-gray-600">
            <Link href="/privacy" className="text-[#0f2d5e] underline">
              개인정보처리방침
            </Link>
            에 동의합니다. <span className="text-red-500">*</span>
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full justify-center py-4 disabled:opacity-60"
        >
          {submitting ? '전송 중...' : '문의 보내기'}
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-3 text-center">
        문의 접수 후 1~2 영업일 내 답변 드립니다.
      </p>
    </>
  )
}
