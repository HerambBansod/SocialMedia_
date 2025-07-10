'use client';

import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

const firebaseConfig = {
  apiKey: 'AIzaSyDnx1GGUCpfWw0du21mzRuC074N_ed0jcg',
  authDomain: 'chattingbase-68c94.firebaseapp.com',
  projectId: 'chattingbase-68c94',
  storageBucket: 'chattingbase-68c94.appspot.com',
  messagingSenderId: '452470680119',
  appId: '1:452470680119:web:dda140c5effe96cc012db2',
  measurementId: 'G-5NPPDYZZBC',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
        router.push('/chat');
      } else {
        if (password !== confirmPassword) {
          setError("Passwords don't match.");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
        setIsLogin(true);
        router.push('/chat');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('Signed in with Google!');
      router.push('/chat');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <section className='bg-[#fb8500] min-h-screen flex items-center justify-center px-4 py-10'>
        <div className='bg-white rounded-xl shadow-2xl w-full max-w-[1000px] flex flex-col md:flex-row overflow-hidden'>
          <div
            className='w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-10'
            style={{
              backgroundImage: "url('/LoginBG.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg text-center w-full max-w-sm'>
              <h2 className='text-2xl font-semibold mb-4 text-white'>
                {isLogin ? 'New Here?' : 'Already have an account?'}
              </h2>
              <p className='text-white font-medium text-base sm:text-lg mb-6'>
                {isLogin
                  ? 'Create your account and start your journey with us.'
                  : 'Login to continue your journey with us.'}
              </p>
              <button
                type='button'
                onClick={() => setIsLogin(!isLogin)}
                className='w-full bg-transparent border border-white text-white py-2.5 rounded-lg hover:bg-white hover:text-[#fb8500] transition-all duration-300 font-semibold text-lg'
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </div>

          <div className='w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center'>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>

            {error && (
              <p className='text-red-600 text-center font-medium mb-4'>{error}</p>
            )}

            <form className='space-y-5' onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className='block text-gray-700 mb-1' htmlFor='name'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb8500] placeholder:text-gray-500'
                    placeholder='Enter your name'
                  />
                </div>
              )}

              <div>
                <label className='block text-gray-700 mb-1' htmlFor='email'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb8500] placeholder:text-gray-500'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='block text-gray-700 mb-1' htmlFor='password'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb8500] placeholder:text-gray-500'
                  placeholder='Enter your password'
                />
              </div>

              {!isLogin && (
                <div>
                  <label
                    className='block text-gray-700 mb-1'
                    htmlFor='confirmPassword'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb8500] placeholder:text-gray-500'
                    placeholder='Confirm your password'
                  />
                </div>
              )}

              <button
                type='submit'
                className='w-full bg-transparent border border-[#fb8500] text-[#fb8500] py-3 rounded-lg hover:bg-[#fb8500] hover:text-white transition-all duration-300 font-semibold text-lg'
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>

              <div className='relative my-4'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='bg-white px-2 text-gray-500'>or</span>
                </div>
              </div>

              <button
                type='button'
                onClick={handleGoogleSignIn}
                className='w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2'
              >
                <img
                  src='https://www.svgrepo.com/show/475656/google-color.svg'
                  alt='Google'
                  className='h-6 w-6'
                />
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
