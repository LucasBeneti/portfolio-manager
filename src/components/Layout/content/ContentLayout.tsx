import type { PropsWithChildren } from 'react';

type ContentLayoutProps = PropsWithChildren<{
  isTextOnly?: boolean;
}>;

export function ContentLayout(props: ContentLayoutProps) {
  const { children } = props;
  return (
    <section
      className={`flex flex-col flex-1 items-center px-4 md:px-8 w-full py-4 md:py-8 text-foreground`}
    >
      {children}
    </section>
  );
}
