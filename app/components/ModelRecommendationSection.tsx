import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { PLATFORM_PROMPTS } from '../libs/constants';
import { PromptCard } from './PromptCard';

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function ModelRecommendationSection() {
  return (
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
  );
}

