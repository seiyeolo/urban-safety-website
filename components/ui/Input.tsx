'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

/* label↔input 연결(htmlFor)을 컴포넌트가 강제한다.
   기존 코드의 label 34개가 htmlFor 없이 방치돼 스크린리더에서
   입력 필드와 연결되지 않던 문제를 구조적으로 차단하기 위함. */

const FIELD_BASE =
  'w-full px-4 py-3 bg-white border border-neutral-300 rounded-md text-base text-neutral-900 placeholder:text-neutral-500 transition-colors focus:border-brand-600 focus:outline-none'

const FIELD_ERROR = 'border-danger-600 focus:border-danger-600'

interface FieldShellProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  id: string
  children: React.ReactNode
}

function FieldShell({ label, error, hint, required, id, children }: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 font-semibold text-neutral-800">
        {label}
        {required && (
          <span className="text-danger-600 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {hint && (
        <p id={hintId} className="text-sm text-neutral-600 mb-2">
          {hint}
        </p>
      )}

      {children}

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-danger-600">
          {error}
        </p>
      )}
    </div>
  )
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, required, className, ...rest }: InputProps) {
  const id = useId()
  return (
    <FieldShell label={label} error={error} hint={hint} required={required} id={id}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        className={cn(FIELD_BASE, error && FIELD_ERROR, className)}
        {...rest}
      />
    </FieldShell>
  )
}

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string
  error?: string
  hint?: string
}

export function Textarea({ label, error, hint, required, className, ...rest }: TextareaProps) {
  const id = useId()
  return (
    <FieldShell label={label} error={error} hint={hint} required={required} id={id}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        className={cn(FIELD_BASE, 'min-h-32 resize-y', error && FIELD_ERROR, className)}
        {...rest}
      />
    </FieldShell>
  )
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string
  error?: string
  hint?: string
}

export function Select({ label, error, hint, required, className, children, ...rest }: SelectProps) {
  const id = useId()
  return (
    <FieldShell label={label} error={error} hint={hint} required={required} id={id}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        className={cn(FIELD_BASE, 'cursor-pointer', error && FIELD_ERROR, className)}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  )
}
