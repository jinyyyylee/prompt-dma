import Link from 'next/link';

export function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-white sm:py-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
          <h3 className="mb-3 text-sm font-semibold text-white">🗣️ 이번 주 인기 크리에이터</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {['@neo', '@mira', '@stark', '@june'].map((creator) => (
              <li key={creator} className="flex items-center justify-between">
                <span>{creator}</span>
                <button className="rounded-lg border border-white/30 px-2 py-1 text-xs transition hover:bg-white/10">
                  팔로우
                </button>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
          <h3 className="mb-3 text-sm font-semibold text-white">💡 프롬프트 컬렉션</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {['스타트업 마케팅 세트', '노션 템플릿 번들', '디자인 스프린트 킷'].map((collection) => (
              <li key={collection} className="flex items-center justify-between">
                <span>{collection}</span>
                <Link href="#" className="text-white/70 transition hover:text-white hover:underline">
                  보기
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
          <h3 className="mb-3 text-sm font-semibold text-white">📚 초보자를 위한 베이직 모음</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {['프롬프트 기본기', '금지어/가이드', '품질 개선 팁'].map((item) => (
              <li key={item} className="flex items-center justify-between">
                <span>{item}</span>
                <Link href="#" className="text-white/70 transition hover:text-white hover:underline">
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


