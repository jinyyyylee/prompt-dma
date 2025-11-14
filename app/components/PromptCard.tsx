import Image from 'next/image';
import type { PromptCardProps } from '../libs/types';

export function PromptCard(props: PromptCardProps) {
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

