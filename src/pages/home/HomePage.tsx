import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import { PWAInstallBanner } from '@/components/pwa-install-banner';
import Markdown from 'react-markdown';
import { useConvertMarkDownToText } from '@/hooks/use-convert-markdown-to-text';

export function HomePage() {
  const filepath = '/home-page-content.md';
  const { text } = useConvertMarkDownToText(filepath);

  return (
    <ContentLayout>
      <section className='max-w-prose self-center story-markdown-content'>
        <PWAInstallBanner />
        {text ? <Markdown>{text}</Markdown> : null}
      </section>
    </ContentLayout>
  );
}
