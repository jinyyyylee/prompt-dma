'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FILTER_OPTIONS } from '../../libs/constants';

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const currentTheme = useMemo(
    () => (mounted ? resolvedTheme ?? 'light' : undefined),
    [mounted, resolvedTheme]
  );

  const themeIcon = useMemo(() => {
    if (!mounted || !currentTheme) {
      return '🌗';
    }
    return currentTheme === 'dark' ? '☀️' : '🌙';
  }, [currentTheme, mounted]);

  const themeLabel = useMemo(() => {
    if (!mounted || !currentTheme) {
      return '테마 전환';
    }
    return currentTheme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환';
  }, [currentTheme, mounted]);

  const handleToggleTheme = useCallback(() => {
    if (!mounted) {
      return;
    }
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [currentTheme, mounted, setTheme]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto max-w-7xl space-y-3 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight">PromptSpot</span>
            </Link>
          </div>
          <div className="order-3 w-full md:order-2 md:flex md:flex-1 md:justify-center">
            <label className="relative w-full max-w-2xl">
              <span className="sr-only">프롬프트 검색</span>
              <input
                type="search"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pr-10 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="예) 이미지 생성 / 코드 리뷰 / 마케팅 카피"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                ⌕
              </span>
            </label>
          </div>
          {/* <nav className="hidden items-center gap-4 lg:flex" aria-label="AI 카테고리">
            <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
              ChatGPT
            </Link>
            <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
              Claude
            </Link>
            <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
              Midjourney
            </Link>
            <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
              기타
            </Link>
          </nav> */}
          <div className="order-2 flex items-center gap-2 md:order-4">
            <Link
              href="/auth/signin"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:block"
            >
              로그인
            </Link>
            <Link
              href="#"
              className="hidden rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 md:block"
            >
              회원가입
            </Link>
            <Link
              href="/regist"
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              프롬프트 등록
            </Link>
            <Link
              href="#"
              className="hidden rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 md:block"
            >
              내 프롬프트
            </Link>
          </div>
        </div>
        {/* <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-500 dark:text-zinc-300">빠른 필터</span>
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter}
              type="button"
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium transition hover:border-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {filter}
            </button>
          ))}
        </div> */}
      </div>
    </header>
  );
}

