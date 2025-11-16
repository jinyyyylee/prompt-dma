'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthHeader } from '../../../components/common/AuthHeader';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50">
      <AuthHeader />
      <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">로그인</h1>
          <p className="text-sm text-zinc-400">프롬프트 마켓에 오신 것을 환영합니다</p>
        </div>

        {/* 로그인 폼 컨테이너 */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
             {/* 소셜 로그인 버튼들 */}
             <div className="space-y-3">
              {/* Google */}
              <button
                type="button"
                className="w-full rounded-lg bg-white border border-zinc-200 px-4 py-3 text-sm font-medium text-black hover:bg-zinc-50 transition-colors flex items-center justify-center gap-3"
              >
                <span className="w-5 h-5">
                  {/* Google 아이콘 */}
                </span>
                <span>Google로 계속하기</span>
              </button>

              {/* Naver */}
              <button
                type="button"
                className="w-full rounded-lg bg-[#03C75A] px-4 py-3 text-sm font-medium text-white hover:bg-[#02B350] transition-colors flex items-center justify-center gap-3"
              >
                <span className="w-5 h-5">
                  {/* Naver 아이콘 */}
                </span>
                <span>네이버로 계속하기</span>
              </button>

              {/* Kakao */}
              <button
                type="button"
                className="w-full rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-medium text-black hover:bg-[#FDD835] transition-colors flex items-center justify-center gap-3"
              >
                <span className="w-5 h-5">
                  {/* Kakao 아이콘 */}
                </span>
                <span>카카오로 계속하기</span>
              </button>

              {/* Apple */}
              <button
                type="button"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-700 transition-colors flex items-center justify-center gap-3"
              >
                <span className="w-5 h-5">
                  {/* Apple 아이콘 */}
                </span>
                <span>Apple로 계속하기</span>
              </button>
            </div>

            {/* 구분선 */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative bg-zinc-900 px-4">
                <span className="text-sm text-zinc-500">또는</span>
              </div>
            </div>

            {/* 이메일 입력 폼 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  비밀번호
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 active:scale-[0.98]"
            >
              로그인
            </button>
          </form>
        </div>

        {/* 푸터 */}
        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            아직 계정이 없으신가요?{' '}
            <Link
              href="/auth/signup"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

