'use client';

import { Header } from '../components/common/Header';
import { HeroSection } from '../components/HeroSection';
import { TrendingPromptsSection } from '../components/TrendingPromptsSection';
import { CategorySection } from '../components/CategorySection';
import { ModelRecommendationSection } from '../components/ModelRecommendationSection';
import { StatsSection } from '../components/StatsSection';
import { ExpertRecommendationSection } from '../components/ExpertRecommendationSection';
import { Footer } from '../components/common/Footer';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-black dark:text-zinc-50">
      <Header />
      <main>
        <HeroSection />
        <TrendingPromptsSection />
        <CategorySection />
        <ModelRecommendationSection />
        <StatsSection />
        <ExpertRecommendationSection />
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
            <h3 className="text-lg font-semibold">나만의 프롬프트를 세상과 공유하세요.</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              지금 바로 프롬프트를 등록하고 크리에이터가 되어보세요.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href="#"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
              >
                프롬프트 등록하기
              </a>
              <a
                href="#"
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                회원가입
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
