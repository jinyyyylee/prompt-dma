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
    <div className="min-h-screen bg-[#050505] text-white transition-colors">
      <Header />
      <main>
        <HeroSection />
        <TrendingPromptsSection />
        <CategorySection />
        <ModelRecommendationSection />
        <StatsSection />
        <ExpertRecommendationSection />
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm sm:p-10">
            <h3 className="text-lg font-semibold text-white">나만의 프롬프트를 세상과 공유하세요.</h3>
            <p className="mt-2 text-sm text-white/70">
              지금 바로 프롬프트를 등록하고 크리에이터가 되어보세요.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href="#"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                프롬프트 등록하기
              </a>
              <a
                href="#"
                className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
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

