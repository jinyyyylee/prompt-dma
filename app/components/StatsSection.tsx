import Link from 'next/link';

export function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold">🗣️ 이번 주 인기 크리에이터</h3>
          <ul className="space-y-2 text-sm">
            {['@neo', '@mira', '@stark', '@june'].map((creator) => (
              <li key={creator} className="flex items-center justify-between">
                <span>{creator}</span>
                <button className="rounded-lg border border-zinc-200 px-2 py-1 text-xs transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                  팔로우
                </button>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold">💡 프롬프트 컬렉션</h3>
          <ul className="space-y-2 text-sm">
            {['스타트업 마케팅 세트', '노션 템플릿 번들', '디자인 스프린트 킷'].map((collection) => (
              <li key={collection} className="flex items-center justify-between">
                <span>{collection}</span>
                <Link
                  href="#"
                  className="text-zinc-600 transition hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  보기
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold">📚 초보자를 위한 베이직 모음</h3>
          <ul className="space-y-2 text-sm">
            {['프롬프트 기본기', '금지어/가이드', '품질 개선 팁'].map((item) => (
              <li key={item} className="flex items-center justify-between">
                <span>{item}</span>
                <Link
                  href="#"
                  className="text-zinc-600 transition hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  보기
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

