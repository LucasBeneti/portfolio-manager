import type { PropsWithChildren } from 'react';

type ContentLayoutProps = PropsWithChildren<{
  isTextOnly?: boolean;
}>;

export function ContentLayout(props: ContentLayoutProps) {
  const { children, isTextOnly = false } = props;
  return (
    <section
      className={`flex flex-col flex-1 min-h-svh items-center px-16 py-8 dark:text-white`}
    >
      {children}
    </section>
  );
}
