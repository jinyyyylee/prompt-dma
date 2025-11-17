import Link from 'next/link';
import { TRENDING_PROMPTS } from '../libs/constants';
import { PromptCard } from './PromptCard';

export function ExpertRecommendationSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-white sm:py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">💰 전문가가 만든 프리미엄 프롬프트</h2>
          <Link href="#" className="text-sm text-white/70 transition hover:text-white hover:underline">
            더보기
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRENDING_PROMPTS.slice(0, 3).map((prompt) => (
            <PromptCard key={`premium-${prompt.title}`} {...prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}


