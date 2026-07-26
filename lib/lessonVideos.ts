/**
 * 강의 영상 연결 설정
 * ─────────────────────────────────────────────
 * YouTube에 "일부공개(Unlisted)"로 업로드한 뒤,
 * 영상 주소에서 ID만 복사해 아래에 붙여넣으세요.
 *
 * 예) https://youtu.be/AbCdEf12345  →  'AbCdEf12345'
 * 예) https://www.youtube.com/watch?v=AbCdEf12345  →  'AbCdEf12345'
 *
 * ID가 비어 있으면('') 해당 차시는 "영상 준비 중" 화면이 표시됩니다.
 * 파일 수정 후 저장 → 재배포하면 즉시 반영됩니다.
 */
export const lessonVideoIds: Record<string, string> = {
  'lesson-01': 's6seQtnwMlU', // 1강 — 김창호교수 보이스피싱피해 1
  'lesson-02': 'C3e5vKuF-8w', // 2강 — 김창호교수 보이스피싱피해 2
  'lesson-03': 'Gcln7KApPRo', // 3강 — 김창호교수 보이스피싱피해 3
  'lesson-04': 'JHkuysQWuCE', // 4강 — 보이스피싱 심화과정 (49분)
  'lesson-05': '',
  'lesson-06': '',
}

/** 개인정보 보호를 위해 nocookie 도메인 사용 */
export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`
}

/**
 * 강의 목록용 썸네일. 일부공개(Unlisted) 영상도 접근 가능하다.
 * mq: 320x180(16:9) — 목록용 / hq: 480x360(4:3, 상하 레터박스 포함)
 */
export function youtubeThumbnailUrl(videoId: string, quality: 'mq' | 'sd' = 'mq'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`
}

export function getLessonVideoId(lessonId: string): string {
  return lessonVideoIds[lessonId] ?? ''
}
