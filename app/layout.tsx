import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from './components/Nav';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Hydrate from './components/Hydrate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nextpc - Best PC Marketplace',
  description: 'Created using Next.js, Prisma and Tailwind CSS',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the user
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' data-theme='light'>
      <body
        className={`${inter.className} bg-white flex flex-col mx-auto max-w-7xl min-h-screen px-4 lg:px-8`}
      >
        <Hydrate>
          <Nav />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
