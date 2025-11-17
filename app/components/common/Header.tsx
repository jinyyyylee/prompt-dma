'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 text-white backdrop-blur">
      <div className="mx-auto max-w-7xl space-y-3 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight text-white">PromptSpot</span>
            </Link>
          </div>
          <div className="order-3 w-full md:order-2 md:flex md:flex-1 md:justify-center">
            <label className="relative w-full max-w-2xl">
              <span className="sr-only">프롬프트 검색</span>
              <input
                type="search"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 pr-10 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/40 focus:ring-0"
                placeholder="예) 이미지 생성 / 코드 리뷰 / 마케팅 카피"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                ⌕
              </span>
            </label>
          </div>
          <div className="order-2 flex items-center gap-2 md:order-4">
            <Link
              href="/signin"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 sm:block"
            >
              로그인
            </Link>
            <Link
              href="/regist"
              className="hidden rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 md:block"
            >
              회원가입
            </Link>
            <Link
              href="/regist"
              className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              프롬프트 등록
            </Link>
            <Link
              href="#"
              className="hidden rounded-lg border border-white/30 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 md:block"
            >
              내 프롬프트
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
