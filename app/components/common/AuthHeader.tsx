'use client';

import Link from 'next/link';
import { Logo } from './Logo';

export function AuthHeader() {
  return (
    <header className="border-b border-zinc-800 bg-black">
      <div className="mx-auto max-w px-4 sm:px-10 py-3">
        <div className="flex items-center justify-between">
          {/* 뒤로가기 */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors"
          >
            <span>←</span>
            <span className="text-sm">뒤로가기</span>
          </Link>

          {/* 로고 */}
          <Logo />

          {/* 오른쪽 공간 (균형을 위해) */}
          <div className="w-20"></div>
        </div>
      </div>
    </header>
  );
}

