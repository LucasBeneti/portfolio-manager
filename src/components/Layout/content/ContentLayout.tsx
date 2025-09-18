import type { PropsWithChildren } from 'react';

type ContentLayoutProps = PropsWithChildren<{
  isTextOnly?: boolean;
}>;

export function ContentLayout(props: ContentLayoutProps) {
  const { children } = props;
  return (
    <section
      className={`flex flex-col flex-1 min-h-svh items-center px-2 w-full md:px-8 py-0 md:py-8 dark:text-white`}
    >
      {children}
    </section>
  );
}
