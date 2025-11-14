import Link from 'next/link';
import { CATEGORY_CARDS } from '../libs/constants';

export function CategorySection() {
  return (
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
  );
}

