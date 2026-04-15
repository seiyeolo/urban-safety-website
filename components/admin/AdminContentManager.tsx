'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Loader2, Pencil, Plus, Save, Trash2, X } from 'lucide-react'

import type { ContentItemMap, ContentSection } from '@/lib/content-types'

type InputType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox'

interface FieldConfig<TItem> {
  key: keyof TItem
  label: string
  type?: InputType
  placeholder?: string
  options?: string[]
  displayMap?: Record<string, string>
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

              return (
                <div key={String(field.key)} className={isWide ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    {field.label}
                  </label>

                  {fieldType === 'textarea' && (
                    <textarea
                      value={String(value ?? '')}
                      onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.value as Draft[keyof Draft])}
                      placeholder={field.placeholder}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0f2d5e]"
                    />
                  )}

                  {fieldType === 'select' && (
                    <select
                      value={String(value ?? '')}
                      onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.value as Draft[keyof Draft])}
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#0f2d5e]"
                    >
                      {(field.options ?? []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {fieldType === 'checkbox' && (
                    <label className="flex items-center gap-3 px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white">
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.checked as Draft[keyof Draft])}
                        className="w-4 h-4"
                      />
                      사용
                    </label>
                  )}

                  {(fieldType === 'text' || fieldType === 'date') && (
                    <input
                      type={fieldType}
                      value={String(value ?? '')}
                      onChange={(event) => setDraftValue(field.key as keyof Draft, event.target.value as Draft[keyof Draft])}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0f2d5e]"
                    />
                  )}
                </div>
              )
            })}
          </div>

          {message && <p className="text-sm text-emerald-400">{message}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-4 py-3 bg-[#0f2d5e] text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50"
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
