import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { getSectionItems } from '@/lib/content-store'
import { scheduleStatusClass, scheduleTypeClass } from '@/lib/schedule-status'
import { PageHero } from '@/components/ui'

// 관리자 수정이 공개 페이지에 반영되도록 60초 ISR (정적 박제 방지)
export const revalidate = 60

export const metadata: Metadata = {
  title: '교육 일정',
  description: '대전경실련 도시안전디자인센터 교육 일정 안내입니다.',
}

export default async function SchedulePage() {
  const scheduleItems = await getSectionItems('schedules')
  const groupedSchedule = Object.entries(
    scheduleItems.reduce<Record<string, typeof scheduleItems>>((accumulator, item) => {
      const month = item.month || '기타'
      accumulator[month] = accumulator[month] ? [...accumulator[month], item] : [item]
      return accumulator
    }, {})
  )

  return (
    <>
      <PageHero
        title="교육 일정"
        description="개강·특강 일정을 확인하세요"
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '공지·자료실', href: '/notice' },
          { label: '교육 일정' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">
          <div className="space-y-10">
            {groupedSchedule.length === 0 && (
              <p className="py-12 text-center text-sm text-gray-400">
                등록된 교육 일정이 없습니다. 일정이 확정되면 이곳에 공지됩니다.
              </p>
            )}
            {groupedSchedule.map(([month, items]) => (
              <div key={month}>
                <div className="flex items-center gap-3 mb-5">
                  <Calendar size={20} className="text-brand-600" />
                  <h2 className="text-xl font-bold text-brand-600">{month}</h2>
                </div>
                <div className="space-y-3">
                  {items.map(({ id, date, type, title, seats, href }) => (
                    <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-sm text-gray-500 w-24 shrink-0">{date}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${scheduleTypeClass(type)}`}>{type}</span>
                      <p className="flex-1 font-medium text-gray-800 text-sm">{title}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${scheduleStatusClass(seats)}`}>{seats || '안내 예정'}</span>
                      {href && (
                        <Link href={href} className="text-brand-600 hover:text-brand-700 shrink-0">
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-brand-50 rounded-2xl p-8">
            <p className="text-gray-700 mb-2">교육 일정 및 신청 관련 문의</p>
            <a href="tel:042-254-8060" className="text-brand-600 font-bold text-lg hover:underline">
              042-254-8060
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
