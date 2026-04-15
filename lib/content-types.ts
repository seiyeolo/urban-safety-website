export type ContentSection = 'notices' | 'schedules' | 'downloads' | 'contacts'

export interface NoticeItem {
  id: string
  category: string
  title: string
  date: string
  isNew: boolean
}

export interface ScheduleItem {
  id: string
  month: string
  date: string
  type: string
  title: string
  seats: string
  href: string
}

export interface DownloadItem {
  id: string
  category: string
  title: string
  type: string
  size: string
  date: string
  href: string
}

export interface ContactItem {
  id: string
  name: string
  phone: string
  email: string
  inquiryType: string
  title: string
  message: string
  privacyConsent: boolean
  submittedAt: string
  status: 'new' | 'in_progress' | 'done'
}

export interface ContentStore {
  notices: NoticeItem[]
  schedules: ScheduleItem[]
  downloads: DownloadItem[]
  contacts: ContactItem[]
}

export type ContentItemMap = {
  notices: NoticeItem
  schedules: ScheduleItem
  downloads: DownloadItem
  contacts: ContactItem
}
