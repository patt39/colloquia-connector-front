import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useCanonicalUrl = () => {
  const router = useRouter();
  const [canonicalUrl, setCanonicalUrl] = useState('');

  useEffect(() => {
    const origin = window.location.origin;
    const path = window.location.pathname.split('#')[0];
    setCanonicalUrl(origin + path);
  }, [router.asPath]);

  return canonicalUrl;
};
