import { useEffect } from 'react';
import { useLocale } from './use-locale';

interface PageMeta {
  title: string;
  description: string;
}

/** Sets document title and meta description, plus updates html lang. */
export function usePageMeta({ title, description }: PageMeta): void {
  const locale = useLocale();

  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    document.documentElement.lang = locale;
  }, [title, description, locale]);
}
