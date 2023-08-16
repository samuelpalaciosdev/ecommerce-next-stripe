'use client';
import { ReactNode, useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  // Wait till the client is ready
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <SessionProvider>
      {isHydrated ? <>{children}</> : <div>Loading...</div>}
    </SessionProvider>
  );
}
