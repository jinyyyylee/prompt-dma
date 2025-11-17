'use client';

import Link from 'next/link';
import { HERO_TAGS, HERO_MODELS, HERO_FLOATING_PROMPTS } from '../libs/constants';

export function HeroSection() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#04040a] via-[#0f0a1c] to-[#160721] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-4 lg:max-w-2xl lg:pr-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              세상 모든 AI 프롬프트를 한곳에서
            </h1>
            <p className="text-base text-zinc-300">
              창의적인 프롬프트를 검색, 공유, 판매하세요.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="#trending"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                인기 프롬프트 보기
              </Link>
              <Link
                href="/regist"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                프롬프트 등록하기
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag.value}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:bg-white/15"
                >
                  #{tag.label}
                </span>
              ))}
            </div>
            <div className="mt-6 grid w-full max-w-xl gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 sm:w-auto">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-200">
                지원하는 AI 모델
              </span>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {HERO_MODELS.map((model) => (
                  <div
                    key={model.name}
                    className="flex flex-col items-start gap-1 rounded-xl border border-white/15 bg-white/10 p-3 text-left text-xs transition hover:bg-white/20"
                  >
                    <span className="font-semibold text-white">
                      {model.name}
                    </span>
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
                      {model.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute -inset-10 -z-10 blur-3xl">
              <div className="h-full w-full bg-gradient-to-tr from-purple-500/50 via-pink-500/40 to-fuchsia-500/50" />
            </div>
            <div className="relative h-[600px] w-full rounded-2xl">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(147, 51, 234, 0.35) 3%, rgba(88, 28, 135, 0) 70%, rgba(5, 5, 5, 0.2) 100%)',
                }}
              />
              {/* 상단 중앙 원형 그라데이션 */}
              <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-purple-500/60 blur-3xl" />
              {/* 하단 우측 원형 그라데이션 */}
              <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-blue-500/20 blur-3xl" />
              {HERO_FLOATING_PROMPTS.map((card, index) => (
                <div
                  key={card.title}
                  className={`absolute w-[300px] rounded-2xl border border-white/20 bg-white/5 p-4 shadow-2xl backdrop-blur-md float-card-${index + 1}`}
                  style={{
                    ...card.position,
                    zIndex: index + 1,
                  }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-60`} />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/40 text-xl">
                        {card.icon}
                      </div>
                      <h3 className="text-m font-semibold text-white">{card.title}</h3>
                    </div>
                    <p className="line-clamp-4 text-sm leading-relaxed text-white/90">
                      {card.prompt}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {card.model && (
                          <span className="rounded-full bg-zinc-800/80 px-2 py-1 text-[10px] font-medium text-zinc-300">
                            {card.model}
                          </span>
                        )}
                      </div>
                      {card.price && (
                        <span className="text-sm font-bold text-white">{card.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


