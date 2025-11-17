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
    <article className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/5 text-white shadow-sm transition hover:border-white/30">
      <div className="relative h-40 w-full overflow-hidden bg-black/30">
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
          <h3 className="line-clamp-1 text-sm font-semibold text-white">
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white/90">
              {priceLabel}
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/70">
              {level}
            </span>
          </div>
        </div>
        <dl className="flex items-center gap-3 text-xs text-white/70">
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
        <p className="line-clamp-2 text-xs text-white/70">{summary}</p>
        <div className="flex flex-wrap gap-1">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80"
            >
              #{keyword}
            </span>
          ))}
        </div>
        <button className="mt-2 inline-flex items-center justify-center rounded-lg border border-white/30 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10">
          상세 보기
        </button>
      </div>
    </article>
  );
}


