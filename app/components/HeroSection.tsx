'use client';

import Link from 'next/link';
import { HERO_TAGS, HERO_MODELS, HERO_FLOATING_PROMPTS } from '../libs/constants';

export function HeroSection() {

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 dark:border-zinc-800 dark:from-black dark:to-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-10 py-5 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-4 lg:max-w-2xl lg:pr-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              세상 모든 AI 프롬프트를 한곳에Tj
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              창의적인 프롬프트를 검색, 공유, 판매하세요.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="#trending"
                className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
              >
                인기 프롬프트 보기
              </Link>
              <Link
                href="/regist"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                프롬프트 등록하기
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag.value}
                  className="rounded-full border border-transparent bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-white dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  #{tag.label}
                </span>
              ))}
            </div>
            <div className="mt-6 grid w-full max-w-xl gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:w-auto">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                지원하는 AI 모델
              </span>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {HERO_MODELS.map((model) => (
                  <div
                    key={model.name}
                    className="flex flex-col items-start gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-left text-xs transition hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
                  >
                    <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                      {model.name}
                    </span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
                      {model.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute -inset-10 -z-10 blur-3xl">
              <div className="h-full w-full bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-fuchsia-500/30" />
            </div>
            <div className="relative h-[600px] w-full rounded-2xl bg-black">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.25) 3%, rgba(88, 28, 135, 0) 70%, rgba(0, 0, 0, 0.95) 100%)',
                }}
              />
              {/* 상단 중앙 원형 그라데이션 */}
              <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-purple-500/60 blur-3xl" />
              {/* 하단 우측 원형 그라데이션 */}
              <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-blue-500/20 blur-3xl" />
              {HERO_FLOATING_PROMPTS.map((card, index) => (
                <div
                  key={card.title}
                  className={`absolute w-[300px] rounded-2xl border border-white/20 bg-black/60 p-4 shadow-2xl backdrop-blur-md float-card-${index + 1}`}
                  style={{
                    ...card.position,
                    zIndex: index + 1,
                  }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-60`} />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900/80 text-xl">
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

