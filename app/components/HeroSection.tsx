import Image from 'next/image';
import Link from 'next/link';
import { TRENDING_PROMPTS, HERO_TAGS, HERO_MODELS } from '../libs/constants';

export function HeroSection() {
  const heroCards = TRENDING_PROMPTS.slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 dark:border-zinc-800 dark:from-black dark:to-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-4 lg:max-w-2xl lg:pr-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              세상 모든 AI 프롬프트를 한곳에서
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
                href="#"
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
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 -z-10 blur-3xl">
              <div className="h-full w-full bg-gradient-to-tr from-fuchsia-500/20 via-cyan-400/20 to-blue-500/20" />
            </div>
            <div className="mx-auto grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-none">
              {heroCards.map((prompt) => (
                <div
                  key={prompt.title}
                  className="flex aspect-[4/5] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={prompt.thumbnail}
                      alt={prompt.title}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 25vw, 40vw"
                      className="object-contain"
                      loading="lazy"
                    />
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

