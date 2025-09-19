import type { PropsWithChildren } from 'react';

type ContentLayoutProps = PropsWithChildren<{
  isTextOnly?: boolean;
}>;

export function ContentLayout(props: ContentLayoutProps) {
  const { children } = props;
  return (
    <section
      className={`flex flex-col flex-1 min-h-svh items-center px-8 w-full py-0 md:py-8 text-gray-200`}
    >
      {children}
    </section>
  );
}
