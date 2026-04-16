import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        // 모든 페이지에 보안 헤더 적용
        source: '/(.*)',
        headers: [
          // Content Security Policy - XSS 공격 방어
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.tailwindcss.com",
              "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'"
            ].join('; ')
          },
          // 클릭재킹 공격 방어
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // MIME 타입 스니핑 방어
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // 리퍼러 정보 제어
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // XSS 필터링 (레거시 지원)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // 브라우저 기능 제어
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()'
            ].join(', ')
          },
          // HTTPS 강제 (프로덕션용)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          // DNS 프리펫칭 제어
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ]
  }
};

export default withBundleAnalyzer(nextConfig);
