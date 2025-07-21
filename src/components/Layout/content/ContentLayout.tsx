import type { PropsWithChildren } from 'react';

export function ContentLayout({ children }: PropsWithChildren) {
  return (
    <section className='flex flex-col px-16 py-8 dark:text-white'>
      {children}
    </section>
  );
}
