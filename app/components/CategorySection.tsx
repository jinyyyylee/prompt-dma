import Link from 'next/link';
import { CATEGORY_CARDS } from '../libs/constants';

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-white sm:py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-white">카테고리 탐색</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORY_CARDS.map((category) => (
            <article
              key={category.key}
              className="rounded-xl border border-white/20 bg-white/10 p-4 text-white transition hover:border-white/40"
            >
              <header className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <h3 className="text-sm font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/80">
                    {category.total.toLocaleString()}개
                  </span>
                  {category.isNew ? (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      NEW 🚀
                    </span>
                  ) : null}
                </div>
              </header>
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-white/80 transition hover:text-white hover:underline"
                  >
                    <Link href="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


