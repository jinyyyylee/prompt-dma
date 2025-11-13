'use client';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { useTheme } from 'next-themes';

interface PromptCardProps {
  title: string;
  thumbnail: string;
  priceLabel: string;
  likes: number;
  downloads: number;
  rating: number;
  summary: string;
  keywords: string[];
  level: '입문' | '중급' | '고급';
}

interface CategoryCardProps {
  key: string;
  icon: string;
  title: string;
  items: string[];
  total: number;
  isNew?: boolean;
}

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const TRENDING_PROMPTS: PromptCardProps[] = [
  {
    title: 'ChatGPT 블로그 초안 생성 프롬프트',
    thumbnail: '/window.svg',
    priceLabel: '무료',
    likes: 324,
    downloads: 1089,
    rating: 4.7,
    summary: '키워드만 입력하면 SEO 맞춤 블로그 초안을 5분 만에 생성합니다.',
    keywords: ['블로그', 'SEO', '콘텐츠'],
    level: '입문',
  },
  {
    title: 'Midjourney 8K 제품 렌더 템플릿',
    thumbnail: '/globe.svg',
    priceLabel: '₩4,900',
    likes: 210,
    downloads: 742,
    rating: 4.6,
    summary: '프리미엄 전자제품 목업을 8K 해상도로 안정적으로 생성합니다.',
    keywords: ['이미지', '제품', '8K'],
    level: '고급',
  },
  {
    title: 'Claude 회의록 요약/액션아이템 추출',
    thumbnail: '/file.svg',
    priceLabel: '무료',
    likes: 189,
    downloads: 680,
    rating: 4.5,
    summary: '회의 대화를 요약하고 실행해야 할 항목을 자동으로 정리합니다.',
    keywords: ['업무', '요약', '액션아이템'],
    level: '중급',
  },
  {
    title: '코드 리뷰 자동화 프롬프트 (TS/React)',
    thumbnail: '/vercel.svg',
    priceLabel: '₩2,900',
    likes: 132,
    downloads: 401,
    rating: 4.4,
    summary: 'PR 설명을 분석해 테스트 누락과 코드 스멜을 진단합니다.',
    keywords: ['개발', '리뷰', '테스트'],
    level: '고급',
  },
];

const CATEGORY_CARDS: CategoryCardProps[] = [
  {
    key: 'image',
    icon: '🎨',
    title: '이미지 생성',
    items: ['제품 목업', '브랜딩 일러스트', '콘셉트 아트'],
    total: 1240,
    isNew: false,
  },
  {
    key: 'writing',
    icon: '✍️',
    title: '글쓰기 / 블로그',
    items: ['SEO 블로그', '소셜 캡션', '뉴스레터'],
    total: 980,
  },
  {
    key: 'dev',
    icon: '👩‍💻',
    title: '개발 / 코드',
    items: ['코드 리뷰', '테스트 생성', '리팩터 가이드'],
    total: 860,
    isNew: true,
  },
  {
    key: 'marketing',
    icon: '📈',
    title: '마케팅 / 광고',
    items: ['랜딩 카피', '키워드 리서치', 'A/B 카피'],
    total: 1120,
  },
  {
    key: 'learn',
    icon: '🧠',
    title: '학습 / 교육',
    items: ['요약/퀴즈', '튜터 프롬프트', '개념 확장'],
    total: 540,
  },
];

const PLATFORM_PROMPTS: Record<string, PromptCardProps[]> = {
  ChatGPT: TRENDING_PROMPTS,
  Midjourney: TRENDING_PROMPTS,
  Claude: TRENDING_PROMPTS,
};

const HERO_TAGS = [
  { label: '🔥 트렌드', value: 'trend' },
  { label: '무료 프롬프트', value: 'free' },
  { label: '노코드 자동화', value: 'nocode' },
  { label: '이미지 생성', value: 'image' },
  { label: '마케팅 카피', value: 'marketing' },
];

const HERO_MODELS = [
  { name: 'ChatGPT', badge: 'GPT-4' },
  { name: 'Claude', badge: '3.5 Sonnet' },
  { name: 'Midjourney', badge: 'V6' },
  { name: 'Stable Diffusion', badge: 'XL' },
];

const FILTER_OPTIONS = [
  '최신 등록',
  '판매량 높은 순',
  '평점 높은 순',
  '무료 프롬프트',
  '프리미엄',
];

function PromptCard(props: PromptCardProps) {
  const {
    title,
    thumbnail,
    priceLabel,
    likes,
    downloads,
    rating,
    summary,
    keywords,
    level,
  } = props;
  return (
    <article className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {priceLabel}
            </span>
            <span className="rounded-full bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              {level}
            </span>
          </div>
        </div>
        <dl className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div>
            <dt className="sr-only">좋아요 수</dt>
            <dd>❤️ {likes}</dd>
          </div>
          <div>
            <dt className="sr-only">다운로드 수</dt>
            <dd>⬇️ {downloads}</dd>
          </div>
          <div>
            <dt className="sr-only">평점</dt>
            <dd>⭐ {rating.toFixed(1)}</dd>
          </div>
        </dl>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">{summary}</p>
        <div className="flex flex-wrap gap-1">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              #{keyword}
            </span>
          ))}
        </div>
        <button className="mt-2 inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
          상세 보기
        </button>
      </div>
    </article>
  );
}

export default function MainPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const currentTheme = useMemo(
    () => (mounted ? resolvedTheme ?? 'light' : undefined),
    [mounted, resolvedTheme]
  );

  const themeIcon = useMemo(() => {
    if (!mounted || !currentTheme) {
      return '🌗';
    }
    return currentTheme === 'dark' ? '☀️' : '🌙';
  }, [currentTheme, mounted]);

  const themeLabel = useMemo(() => {
    if (!mounted || !currentTheme) {
      return '테마 전환';
    }
    return currentTheme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환';
  }, [currentTheme, mounted]);

  const handleToggleTheme = useCallback(() => {
    if (!mounted) {
      return;
    }
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [currentTheme, mounted, setTheme]);

  const heroCards = TRENDING_PROMPTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-black dark:text-zinc-50">
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link href="/main" className="flex items-center gap-2">
                <Image
                  src="/next.svg"
                  alt="PromptHub 로고"
                  width={28}
                  height={28}
                  className="dark:invert"
                  priority
                />
                <span className="text-base font-semibold tracking-tight">PromptHub</span>
              </Link>
            </div>
            <div className="order-3 w-full md:order-2 md:flex md:flex-1 md:justify-center">
              <label className="relative w-full max-w-2xl">
                <span className="sr-only">프롬프트 검색</span>
                <input
                  type="search"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pr-10 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder="예) 이미지 생성 / 코드 리뷰 / 마케팅 카피"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  ⌕
                </span>
              </label>
            </div>
            <nav className="hidden items-center gap-4 lg:flex" aria-label="AI 카테고리">
              <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
                ChatGPT
              </Link>
              <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
                Claude
              </Link>
              <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
                Midjourney
              </Link>
              <Link href="#" className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
                기타
              </Link>
            </nav>
            <div className="order-2 flex items-center gap-2 md:order-4">
              <Link
                href="#"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:block"
              >
                로그인
              </Link>
              <Link
                href="#"
                className="hidden rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 md:block"
              >
                회원가입
              </Link>
              <Link
                href="#"
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                프롬프트 등록
              </Link>
              <Link
                href="#"
                className="hidden rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 md:block"
              >
                내 프롬프트
              </Link>
              <button
                type="button"
                aria-label={themeLabel}
                aria-pressed={currentTheme === 'dark'}
                onClick={handleToggleTheme}
                className="rounded-lg border border-zinc-200 p-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                title={themeLabel}
              >
                {themeIcon}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-500 dark:text-zinc-300">빠른 필터</span>
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter}
                type="button"
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium transition hover:border-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
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

        <section id="trending" className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">🔥 이번 주 인기 프롬프트</h2>
            <Link
              href="#"
              className="text-sm text-zinc-600 transition hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              더보기
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRENDING_PROMPTS.map((prompt) => (
              <PromptCard key={prompt.title} {...prompt} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <h2 className="mb-6 text-xl font-semibold">카테고리 탐색</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORY_CARDS.map((category) => (
              <article
                key={category.key}
                className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <header className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <h3 className="text-sm font-semibold">{category.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {category.total.toLocaleString()}개
                    </span>
                    {category.isNew ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-400/20 dark:text-amber-200">
                        NEW 🚀
                      </span>
                    ) : null}
                  </div>
                </header>
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-zinc-600 transition hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      <Link href="#">{item}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">AI별 추천</h2>
          </div>
          <Tab.Group>
            <Tab.List className="flex gap-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900/60">
              {Object.keys(PLATFORM_PROMPTS).map((name) => (
                <Tab key={name} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        'w-full rounded-lg px-4 py-2 text-sm font-medium transition',
                        selected
                          ? 'bg-white text-zinc-900 shadow dark:bg-zinc-800 dark:text-zinc-100'
                          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                      )}
                      type="button"
                    >
                      {name}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-4">
              {Object.entries(PLATFORM_PROMPTS).map(([name, prompts]) => (
                <Tab.Panel key={name}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {prompts.map((prompt) => (
                      <PromptCard key={`${name}-${prompt.title}`} {...prompt} />
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </section>

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

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
            <h3 className="text-lg font-semibold">나만의 프롬프트를 세상과 공유하세요.</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              지금 바로 프롬프트를 등록하고 크리에이터가 되어보세요.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href="#"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
              >
                프롬프트 등록하기
              </Link>
              <Link
                href="#"
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                회원가입
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Image
                src="/next.svg"
                alt="PromptHub 로고"
                width={22}
                height={22}
                className="dark:invert"
              />
              <span className="text-sm font-semibold">PromptHub</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">모든 AI 프롬프트의 허브.</p>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">회사</h4>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="#">팀 소개</Link>
              </li>
              <li>
                <Link href="#">문의 / 제휴</Link>
              </li>
              <li>
                <Link href="#">피드백</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">정책</h4>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="#">이용약관</Link>
              </li>
              <li>
                <Link href="#">개인정보처리방침</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">SNS</h4>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="#">X</Link>
              </li>
              <li>
                <Link href="#">Discord</Link>
              </li>
              <li>
                <Link href="#">GitHub</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} PromptHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}