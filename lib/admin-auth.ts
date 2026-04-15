import type { NextRequest } from 'next/server'

export function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  const secret = process.env.ADMIN_SECRET
  return Boolean(token && secret && token === secret)
}
