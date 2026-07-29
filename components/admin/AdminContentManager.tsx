'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Loader2, Pencil, Plus, Save, Trash2, X } from 'lucide-react'

import type { ContentItemMap, ContentSection } from '@/lib/content-types'

type InputType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox' | 'file'

interface FieldConfig<TItem> {
  key: keyof TItem
  label: string
  type?: InputType
  placeholder?: string
  options?: string[]
  displayMap?: Record<string, string>
  /**
   * type: 'file' 전용 — 업로드가 끝나면 함께 채울 필드.
   * 크기·형식을 관리자가 손으로 적지 않아도 되게 한다.
   */
  autoFill?: { size?: keyof TItem; type?: keyof TItem; title?: keyof TItem }
}

interface UploadResponse {
  href: string
  size: string
  type: string
  originalName: string
}

interface AdminContentManagerProps<TSection extends ContentSection> {
  section: TSection
  title: string
  description: string
  emptyMessage: string
  createInitial: Omit<ContentItemMap[TSection], 'id'>
  fields: FieldConfig<ContentItemMap[TSection]>[]
}

export default function AdminContentManager<TSection extends ContentSection>({
  section,
  title,
  description,
  emptyMessage,
  createInitial,
  fields,
}: AdminContentManagerProps<TSection>) {
  type Item = ContentItemMap[TSection]
  type Draft = Omit<Item, 'id'>

  const [items, setItems] = useState<Item[]>([])
  const [draft, setDraft] = useState<Draft>(createInitial)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const editingItem = useMemo(
    () => items.find((item) => item.id === editingId) ?? null,
    [editingId, items]
  )

  const loadItems = useCallback(async () => {
    setLoading(true)
    setMessage('')

    const response = await fetch(`/api/admin/${section}`, { credentials: 'include' })

    if (!response.ok) {
      setMessage('데이터를 불러오지 못했습니다.')
      setLoading(false)
      return
    }

    const data = (await response.json()) as { items: Item[] }
    setItems(data.items)
    setLoading(false)
  }, [section])

  useEffect(() => {
    let cancelled = false

    async function hydrateItems() {
      const response = await fetch(`/api/admin/${section}`, { credentials: 'include' })

      if (!response.ok) {
        if (!cancelled) {
          setMessage('데이터를 불러오지 못했습니다.')
          setLoading(false)
        }
        return
      }

      const data = (await response.json()) as { items: Item[] }

      if (!cancelled) {
        setItems(data.items)
        setLoading(false)
      }
    }

    void hydrateItems()

    return () => {
      cancelled = true
    }
  }, [section])

  function resetDraft() {
    setDraft(createInitial)
    setEditingId(null)
  }

  function setDraftValue<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function formatValue(field: FieldConfig<Item>, value: Item[keyof Item]) {
    if (typeof value === 'boolean') {
      return value ? '예' : '아니오'
    }

    const normalized = value == null ? '-' : String(value)
    return field.displayMap?.[normalized] ?? normalized
  }

  function handleEdit(item: Item) {
    const { id, ...rest } = item
    setEditingId(id)
    setDraft(rest as Draft)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * 파일을 고르면 곧바로 올리고, 받은 주소·크기·형식을 입력칸에 채운다.
   * 관리자가 크기와 형식을 손으로 적던 일을 없앤다.
   */
  async function handleFileSelect(field: FieldConfig<Item>, file: File) {
    setUploading(true)
    setUploadError('')
    setMessage('')

    try {
      const body = new FormData()
      body.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'include',
        body,
      })

      const data = (await response.json().catch(() => ({}))) as Partial<UploadResponse> & { error?: string }

      if (!response.ok) {
        setUploadError(data.error ?? '파일 업로드에 실패했습니다.')
        return
      }

      setDraft((current) => {
        const next = { ...current, [field.key]: data.href } as Draft
        const { size, type, title } = field.autoFill ?? {}
        if (size && data.size) Object.assign(next, { [size]: data.size })
        if (type && data.type) Object.assign(next, { [type]: data.type })
        // 자료명이 비어 있을 때만 파일명으로 채운다 — 이미 적은 제목을 덮지 않는다
        if (title && data.originalName && !String(current[title as keyof Draft] ?? '').trim()) {
          Object.assign(next, { [title]: data.originalName.replace(/\.[^.]+$/, '') })
        }
        return next
      })
      setMessage(`'${file.name}' 업로드 완료`)
    } catch {
      setUploadError('네트워크 오류로 파일을 올리지 못했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setMessage('')

    const response = await fetch(
      editingId ? `/api/admin/${section}/${editingId}` : `/api/admin/${section}`,
      {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(draft),
      }
    )

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string }
      setMessage(data.error ?? '저장에 실패했습니다.')
      setSubmitting(false)
      return
    }

    setMessage(editingId ? '수정되었습니다.' : '등록되었습니다.')
    resetDraft()
    await loadItems()
    setSubmitting(false)
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('이 항목을 삭제하시겠습니까?')
    if (!confirmed) {
      return
    }

    setMessage('')

    const response = await fetch(`/api/admin/${section}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      setMessage('삭제에 실패했습니다.')
      return
    }

    if (editingId === id) {
      resetDraft()
    }

    setMessage('삭제되었습니다.')
    await loadItems()
  }

  return (
    <div className="space-y-6">
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          </div>
          {editingItem && (
            <button
              type="button"
              onClick={resetDraft}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
            >
              <X size={16} />
              새로 작성
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map((field) => {
              const value = draft[field.key as keyof Draft]
              const fieldType = field.type ?? 'text'
              const isWide = fieldType === 'textarea'
              const fieldId = `admin-field-${String(field.key)}`

              return (
                <div key={String(field.key)} className={isWide ? 'md:col-span-2' : ''}>
                  <label htmlFor={fieldId} className="block text-sm font-medium text-neutral-300 mb-1.5">
                    {field.label}
                  </label>

                  {fieldType === 'textarea' && (
                    <textarea
                      id={fieldId}
                      value={String(value ?? '')}
                      onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.value as Draft[keyof Draft])}
                      placeholder={field.placeholder}
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400"
                    />
                  )}

                  {fieldType === 'select' && (
                    <select
                      id={fieldId}
                      value={String(value ?? '')}
                      onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.value as Draft[keyof Draft])}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-400"
                    >
                      {(field.options ?? []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {fieldType === 'file' && (
                    <div className="space-y-2">
                      <input
                        id={fieldId}
                        type="file"
                        disabled={uploading}
                        onChange={(event) => {
                          const selected = event.target.files?.[0]
                          if (selected) handleFileSelect(field, selected)
                          // 같은 파일을 다시 고를 수 있도록 입력값을 비운다
                          event.target.value = ''
                        }}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-white disabled:opacity-50"
                      />

                      <p className="text-xs text-neutral-400" aria-live="polite">
                        {uploading
                          ? '업로드 중…'
                          : value
                            ? '업로드됨 — 아래 주소로 내려받습니다'
                            : 'PDF · HWP · DOC · XLS · PPT · ZIP · 이미지 (20MB 이하)'}
                      </p>

                      {uploadError && (
                        <p role="alert" className="text-xs text-danger-600">{uploadError}</p>
                      )}

                      {/* 업로드 결과 주소. 외부 링크를 직접 넣고 싶을 때도 쓸 수 있게 열어 둔다 */}
                      <input
                        type="text"
                        value={String(value ?? '')}
                        onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.value as Draft[keyof Draft])}
                        placeholder={field.placeholder}
                        aria-label={`${field.label} 주소`}
                        className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-neutral-300 placeholder-neutral-500 focus:outline-none focus:border-brand-400"
                      />
                    </div>
                  )}

                  {fieldType === 'checkbox' && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white">
                      <input
                        id={fieldId}
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.checked as Draft[keyof Draft])}
                        className="w-4 h-4"
                      />
                      <span>사용</span>
                    </div>
                  )}

                  {(fieldType === 'text' || fieldType === 'date') && (
                    <input
                      id={fieldId}
                      type={fieldType}
                      value={String(value ?? '')}
                      onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.value as Draft[keyof Draft])}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-400"
                    />
                  )}
                </div>
              )
            })}
          </div>

          {message && <p className="text-sm text-accent-400">{message}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-4 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-800 transition-colors disabled:opacity-50"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : editingId ? <Save size={16} /> : <Plus size={16} />}
            {editingId ? '수정 저장' : '항목 추가'}
          </button>
        </form>
      </section>

      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">등록 항목</h2>
          <span className="text-sm text-gray-400">{items.length}건</span>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2 size={16} className="animate-spin" />
            불러오는 중...
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">{emptyMessage}</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-800 rounded-xl p-4 bg-gray-950 flex items-start justify-between gap-4"
              >
                <div className="space-y-1 text-sm min-w-0">
                  {fields.map((field) => (
                    <div key={String(field.key)} className="text-gray-300">
                      <span className="text-gray-500">{field.label}:</span>{' '}
                      {formatValue(field, item[field.key])}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-300 border border-gray-700 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    <Pencil size={14} />
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-red-300 border border-red-900 hover:bg-red-950 transition-colors"
                  >
                    <Trash2 size={14} />
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
