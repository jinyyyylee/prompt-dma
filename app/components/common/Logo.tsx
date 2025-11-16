'use client';

import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
        {/* 로고 아이콘 */}
      </div>
      <span className="text-white font-semibold">PromptSpot</span>
    </Link>
  );
}

