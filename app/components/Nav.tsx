'use client';
import { sign } from 'crypto';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Nav({ user }: Session) {
  return (
    <nav className='flex py-8 justify-between items-center'>
      <h2 className='text-2xl font-semibold text-blue-500'>Nav</h2>
      <ul className='flex items-center gap-12'>
        {!user && (
          <li className='list-none bg-teal-600 text-white py-2 px-4 rounded-md'>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li className='list-none'>
            <Image
              className='rounded-full'
              src={user?.image as string}
              alt={user?.name as string}
              width={48}
              height={48}
            />
          </li>
        )}
      </ul>
    </nav>
  );
}
