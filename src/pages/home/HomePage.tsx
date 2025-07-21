import { useEffect, useState } from 'react';
import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import Markdown from 'react-markdown';
import { readMarkdownFileToString } from '@/utils/content/readMarkdownFileToString';

export function HomePage() {
  const textContent = readMarkdownFileToString('./text.md');
  console.log('textContent', textContent);
  const filepath = '/home-content.md';
  const [mdText, setMdText] = useState('');
  useEffect(() => {
    fetch(filepath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ERROR! Status: ${response?.status}`);
        }

        return response.text();
      })
      .then((text) => {
        setMdText(text);
      })
      .catch((error) => {
        console.error('something went wrong!', error);
      });
  }, [filepath]);

  return (
    <ContentLayout>
      <section className='max-w-prose self-center story-markdown-content'>
        {mdText ? <Markdown>{mdText}</Markdown> : null}
      </section>
    </ContentLayout>
  );
}
