import { useState } from 'react';

export function useConvertMarkDownToText(filepath: string) {
  const [mdText, setMdText] = useState<string>('');

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

  return {
    text: mdText,
  };
}
