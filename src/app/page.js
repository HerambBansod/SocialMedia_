'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className='bg-[#fb8500] min-h-screen flex flex-col items-center justify-center px-4 py-10 text-black'>
      <div className='bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl'>
        <div className='text-center md:text-left space-y-6 md:w-1/2'>
          <h1 className='text-4xl sm:text-5xl font-extrabold leading-tight'>
            Connect. Chat. Chill. 💬
          </h1>
          <p className='text-lg sm:text-xl text-gray-800'>
            A simple and secure WhatsApp-style chat room for you and your friends. Fast. Private. Fun.
          </p>
          <button
            onClick={() => router.push('/login')}
            className='bg-white text-[#fb8500] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300'
          >
            Get Started
          </button>
        </div>
        <div className='relative w-full md:w-1/2 h-64 sm:h-80 md:h-96 mb-10 md:mb-0'>
          <Image
            src='/LoginBG.webp'
            alt='Chat Illustration'
            layout='fill'
            objectFit='contain'
            priority
          />
        </div>
      </div>
      <footer className='mt-12 text-center text-sm text-black/60'>
        © {new Date().getFullYear()} ChatConnect — Built for friends, by Heramb.
      </footer>
    </div>
  );
}
