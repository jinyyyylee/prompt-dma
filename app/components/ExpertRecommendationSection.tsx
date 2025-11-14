import Link from 'next/link';
import { TRENDING_PROMPTS } from '../libs/constants';
import { PromptCard } from './PromptCard';

export function ExpertRecommendationSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">💰 전문가가 만든 프리미엄 프롬프트</h2>
        <Link
          href="#"
          className="text-sm text-zinc-600 transition hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          더보기
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRENDING_PROMPTS.slice(0, 3).map((prompt) => (
          <PromptCard key={`premium-${prompt.title}`} {...prompt} />
        ))}
      </div>
    </section>
  );
}

