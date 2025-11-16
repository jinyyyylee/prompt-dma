'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AuthHeader } from '../../../app/components/common/AuthHeader';

type AuthMode = 'signin' | 'signup';

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
  verificationCode: string;
}

export default function SignInPage() {
  const [mode, setMode] = useState<AuthMode>('signin');
  
  // 로그인 폼 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // 회원가입 폼 상태
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
    verificationCode: '',
  });
  const [signUpErrors, setSignUpErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
  
  // 이메일 인증 관련 상태
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('Login attempt:', { email, password });
  };

  const validatePassword = useCallback((password: string): boolean => {
    // 최소 8자 이상, 숫자와 영문자 포함
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return hasMinLength && hasNumber && hasLetter;
  }, []);

  const validateEmail = useCallback((email: string): boolean => {
    // 기본 이메일 형식 검증
    if (!email.trim()) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleSignUpInputChange = useCallback(
    (field: keyof SignUpFormData, value: string | boolean) => {
      setSignUpData((prev) => {
        const newData = { ...prev, [field]: value };
        
        // 이메일 필드 변경 시 실시간 유효성 검사
        if (field === 'email') {
          const emailValue = typeof value === 'string' ? value : '';
          if (emailValue.trim() && !validateEmail(emailValue)) {
            setSignUpErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
          } else {
            setSignUpErrors((prev) => ({ ...prev, email: undefined }));
          }
        }
        
        // 비밀번호 또는 비밀번호 확인 필드가 변경될 때 실시간으로 일치 여부 체크
        if (field === 'password' || field === 'confirmPassword') {
          if (newData.confirmPassword && newData.password) {
            if (newData.password !== newData.confirmPassword) {
              setSignUpErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
            } else {
              setSignUpErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
          } else if (newData.confirmPassword && !newData.password) {
            setSignUpErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }
        }
        
        return newData;
      });
      
      // 다른 필드의 에러 초기화 (이메일과 비밀번호 관련 필드는 제외)
      if (
        signUpErrors[field] && 
        field !== 'email' && 
        field !== 'password' && 
        field !== 'confirmPassword'
      ) {
        setSignUpErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [signUpErrors, validateEmail]
  );

  const handleSignUpSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errors: Partial<Record<keyof SignUpFormData, string>> = {};

      if (!signUpData.email.trim()) {
        errors.email = '이메일을 입력해주세요.';
      } else if (!validateEmail(signUpData.email)) {
        errors.email = '올바른 이메일 형식이 아닙니다.';
      }

      if (!signUpData.nickname.trim()) {
        errors.nickname = '닉네임을 입력해주세요.';
      }

      if (!signUpData.password) {
        errors.password = '비밀번호를 입력해주세요.';
      } else if (!validatePassword(signUpData.password)) {
        errors.password = '비밀번호는 최소 8자 이상, 숫자와 영문자를 포함해야 합니다.';
      }

      if (!signUpData.confirmPassword) {
        errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      } else if (signUpData.password !== signUpData.confirmPassword) {
        errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      }

      if (!signUpData.termsAgreed) {
        errors.termsAgreed = '이용약관에 동의해주세요.';
      }

      if (!signUpData.privacyAgreed) {
        errors.privacyAgreed = '개인정보 처리방침에 동의해주세요.';
      }

      if (!isEmailVerified) {
        errors.verificationCode = '이메일 인증을 완료해주세요.';
      }

      setSignUpErrors(errors);

      if (Object.keys(errors).length === 0) {
        // TODO: 회원가입 로직 구현
        console.log('Sign up attempt:', signUpData);
      }
    },
    [signUpData, validatePassword, validateEmail, isEmailVerified]
  );

  const handleAgreeAll = useCallback(() => {
    const allAgreed = signUpData.termsAgreed && signUpData.privacyAgreed && signUpData.marketingAgreed;
    setSignUpData((prev) => ({
      ...prev,
      termsAgreed: !allAgreed,
      privacyAgreed: !allAgreed,
      marketingAgreed: !allAgreed,
    }));
  }, [signUpData]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    // 모드 전환 시 에러 및 인증 상태 초기화
    setSignUpErrors({});
    setIsEmailAvailable(null);
    setIsEmailChecked(false);
    setIsCodeSent(false);
    setIsEmailVerified(false);
    setTimerSeconds(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 이메일 중복 체크
  const handleCheckEmail = useCallback(async () => {
    if (!signUpData.email.trim()) {
      setSignUpErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }));
      return;
    }

    if (!validateEmail(signUpData.email)) {
      setSignUpErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
      return;
    }

    setIsCheckingEmail(true);
    // 이메일 유효성 검사 통과 시 email 에러 제거
    setSignUpErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.email;
      return newErrors;
    });

    try {
      // TODO: 서버 API 호출
      // const response = await fetch('/api/auth/check-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: signUpData.email }),
      // });
      // const data = await response.json();
      
      // 임시: 서버 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isAvailable = true; // 서버 응답으로 교체 필요
      
      setIsEmailAvailable(isAvailable);
      setIsEmailChecked(true);
      
      if (!isAvailable) {
        setSignUpErrors((prev) => ({ ...prev, email: '이미 사용 중인 이메일입니다.' }));
      }
    } catch (error) {
      console.error('이메일 중복 체크 실패:', error);
      setSignUpErrors((prev) => ({ ...prev, email: '이메일 중복 체크 중 오류가 발생했습니다.' }));
    } finally {
      setIsCheckingEmail(false);
    }
  }, [signUpData.email, validateEmail]);

  // 인증 코드 발송
  const handleSendVerificationCode = useCallback(async () => {
    if (!isEmailAvailable || !isEmailChecked) {
      return;
    }

    setSignUpData((current) => {
      setIsSendingCode(true);
      setSignUpErrors((prev) => ({ ...prev, verificationCode: undefined }));

      // 비동기 작업 시작
      (async () => {
        try {
          // TODO: 서버 API 호출
          // const email = current.email;
          // const response = await fetch('/api/auth/send-verification-code', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email: email }),
          // });
          // const data = await response.json();
          
          // TODO: 서버 API 호출 (실제 구현 시 주석 제거)
          // const email = current.email;
          // const response = await fetch('/api/auth/send-verification-code', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email: email }),
          // });
          
          // if (!response.ok) {
          //   const errorData = await response.json();
          //   throw new Error(errorData.message || '인증 코드 발송에 실패했습니다.');
          // }
          
          // const data = await response.json();
          // if (!data.success) {
          //   throw new Error(data.message || '인증 코드 발송에 실패했습니다.');
          // }
          
          // 임시: 서버 호출 시뮬레이션 (실제 구현 시 제거)
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // 임시: 발송 실패 시뮬레이션 (실제 구현 시 제거)
          // throw new Error('인증 코드 발송에 실패했습니다.');
          
          setIsCodeSent(true);
          setIsEmailVerified(false);
          setTimerSeconds(180); // 3분 = 180초
          
          // 타이머 시작
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          timerRef.current = setInterval(() => {
            setTimerSeconds((prev) => {
              if (prev <= 1) {
                if (timerRef.current) {
                  clearInterval(timerRef.current);
                  timerRef.current = null;
                }
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } catch (error) {
          console.error('인증 코드 발송 실패:', error);
          const errorMessage = error instanceof Error 
            ? error.message 
            : '인증 코드 발송에 실패했습니다. 이메일 주소를 확인하고 다시 시도해주세요.';
          setSignUpErrors((prev) => ({ ...prev, verificationCode: errorMessage }));
          setIsCodeSent(false);
        } finally {
          setIsSendingCode(false);
        }
      })();

      return current;
    });
  }, [isEmailAvailable, isEmailChecked]);

  // 인증 코드 검증
  const handleVerifyCode = useCallback(async () => {
    setSignUpData((current) => {
      const code = current.verificationCode;
      
      if (!code.trim()) {
        setSignUpErrors((prev) => ({ ...prev, verificationCode: '인증 코드를 입력해주세요.' }));
        return current;
      }

      if (timerSeconds === 0) {
        setSignUpErrors((prev) => ({ ...prev, verificationCode: '인증 시간이 만료되었습니다. 다시 발송해주세요.' }));
        return current;
      }

      setIsVerifyingCode(true);
      setSignUpErrors((prev) => ({ ...prev, verificationCode: undefined }));

      // 비동기 작업 시작
      (async () => {
        try {
          // TODO: 서버 API 호출
          // const email = current.email;
          // const response = await fetch('/api/auth/verify-code', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ 
          //     email: email,
          //     code: code 
          //   }),
          // });
          // const data = await response.json();
          
          // 임시: 서버 호출 시뮬레이션
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const isValid = true; // 서버 응답으로 교체 필요
          
          if (isValid) {
            setIsEmailVerified(true);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
          } else {
            setSignUpErrors((prev) => ({ ...prev, verificationCode: '인증 코드가 일치하지 않습니다.' }));
          }
        } catch (error) {
          console.error('인증 코드 검증 실패:', error);
          setSignUpErrors((prev) => ({ ...prev, verificationCode: '인증 코드 검증 중 오류가 발생했습니다.' }));
        } finally {
          setIsVerifyingCode(false);
        }
      })();

      return current;
    });
  }, [timerSeconds]);

  // 타이머 포맷팅
  const formatTimer = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, []);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 이메일 변경 시 인증 상태 초기화
  useEffect(() => {
    if (signUpData.email) {
      setIsEmailChecked(false);
      setIsEmailAvailable(null);
      setIsCodeSent(false);
      setIsEmailVerified(false);
      setTimerSeconds(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setSignUpData((prev) => ({ ...prev, verificationCode: '' }));
    }
  }, [signUpData.email]);

  return (
    <div className="min-h-screen bg-black text-zinc-50">
      <AuthHeader />
      <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">
            {mode === 'signin' ? '로그인' : '회원가입'}
          </h1>
          <p className="text-sm text-zinc-400">PromptSpot에 오신 것을 환영합니다</p>
        </div>

        {/* 로그인 폼 */}
        {mode === 'signin' && (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8">
            <form onSubmit={handleSignInSubmit} className="space-y-6">
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
                maxLength={50}
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
                  href="/signin/forgot-password"
                  className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <div className="relative">
              <input
                  type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                required
              />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
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
        )}

        {/* 회원가입 폼 */}
        {mode === 'signup' && (
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8">
            <form onSubmit={handleSignUpSubmit} className="space-y-6">

              {/* 이메일 입력 */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-white mb-2">
                  이메일
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    id="signup-email"
                    value={signUpData.email}
                    maxLength={50}
                    onChange={(e) => handleSignUpInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                    required
                    disabled={isEmailVerified}
                  />
                  <button
                    type="button"
                    onClick={handleCheckEmail}
                    disabled={
                      isCheckingEmail || 
                      isEmailVerified || 
                      !signUpData.email.trim() || 
                      !!signUpErrors.email
                    }
                    className="px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-sm font-medium text-white hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isCheckingEmail ? '확인 중...' : '중복 확인'}
                  </button>
                </div>
                {signUpErrors.email && (
                  <p className="mt-1 text-xs text-red-500">{signUpErrors.email}</p>
                )}
                {!signUpErrors.email && isEmailChecked && isEmailAvailable && (
                  <p className="mt-1 text-xs text-green-500">사용 가능한 이메일입니다.</p>
                )}
                {!signUpErrors.email && isEmailChecked && isEmailAvailable === false && (
                  <p className="mt-1 text-xs text-red-500">이미 사용 중인 이메일입니다.</p>
                )}
              </div>

              {/* 인증 코드 발송 */}
              {isEmailChecked && isEmailAvailable && !isEmailVerified && (
                <div>
                  <button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={isSendingCode}
                    className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-sm font-medium text-white transition-colors"
                  >
                    {isSendingCode
                      ? '발송 중...'
                      : isCodeSent
                      ? '인증 코드 재발송'
                      : '인증 코드 발송'}
                  </button>
                  {isCodeSent && !signUpErrors.verificationCode && (
                    <p className="mt-2 text-xs text-zinc-400 text-center">
                      인증 코드가 발송되었습니다. 이메일을 확인해주세요.
                    </p>
                  )}
                  {signUpErrors.verificationCode && !isCodeSent && (
                    <p className="mt-2 text-xs text-red-500 text-center">
                      {signUpErrors.verificationCode}
                    </p>
                  )}
                </div>
              )}

              {/* 인증 코드 입력 */}
              {isCodeSent && !isEmailVerified && (
                <div>
                  <label htmlFor="verification-code" className="block text-sm font-medium text-white mb-2">
                    인증 코드
                    {timerSeconds > 0 && (
                      <span className="ml-2 text-xs text-zinc-400">
                        ({formatTimer(timerSeconds)})
                      </span>
                    )}
                    {timerSeconds === 0 && (
                      <span className="ml-2 text-xs text-red-500">(만료됨)</span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="verification-code"
                      value={signUpData.verificationCode}
                      onChange={(e) => handleSignUpInputChange('verificationCode', e.target.value)}
                      placeholder="인증 코드를 입력하세요"
                      maxLength={6}
                      className="flex-1 rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                      disabled={timerSeconds === 0 || isVerifyingCode}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={isVerifyingCode || timerSeconds === 0 || !signUpData.verificationCode.trim()}
                      className="px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-white transition-colors whitespace-nowrap"
                    >
                      {isVerifyingCode ? '확인 중...' : '인증 확인'}
                    </button>
                  </div>
                  {isEmailVerified && (
                    <p className="mt-1 text-xs text-green-500">이메일 인증이 완료되었습니다.</p>
                  )}
                  {signUpErrors.verificationCode && (
                    <p className="mt-1 text-xs text-red-500">{signUpErrors.verificationCode}</p>
                  )}
                </div>
              )}

              {/* 인증 완료 상태 */}
              {isEmailVerified && (
                <div className="rounded-lg bg-green-900/20 border border-green-700/50 px-4 py-3">
                  <div className="flex items-center gap-2 text-green-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">이메일 인증이 완료되었습니다.</span>
                  </div>
                </div>
              )}

              {/* 닉네임 입력 */}
              <div>
                <label htmlFor="signup-nickname" className="block text-sm font-medium text-white mb-2">
                  닉네임
                </label>
                <input
                  type="text"
                  id="signup-nickname"
                  value={signUpData.nickname}
                  maxLength={20}
                  onChange={(e) => handleSignUpInputChange('nickname', e.target.value)}
                  placeholder="프롬프트마스터"
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                  required
                />
                {signUpErrors.nickname && (
                  <p className="mt-1 text-xs text-red-500">{signUpErrors.nickname}</p>
                )}
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-white mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    id="signup-password"
                    value={signUpData.password}
                    maxLength={20}
                    onChange={(e) => handleSignUpInputChange('password', e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                    aria-label={showSignUpPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    {showSignUpPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {signUpErrors.password && (
                  <p className="mt-1 text-xs text-red-500">{signUpErrors.password}</p>
                )}
                {!signUpErrors.password && signUpData.password && !validatePassword(signUpData.password) && (
                  <p className="mt-1 text-xs text-red-500">
                    비밀번호는 최소 8자 이상, 숫자와 영문자를 포함해야 합니다.
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-white mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    type={showSignUpConfirmPassword ? 'text' : 'password'}
                    id="signup-confirm-password"
                    value={signUpData.confirmPassword}
                    maxLength={20}
                    onChange={(e) => handleSignUpInputChange('confirmPassword', e.target.value)}
                    placeholder="비밀번호를 다시 입력해주세요"
                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                    aria-label={showSignUpConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    {showSignUpConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {signUpErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{signUpErrors.confirmPassword}</p>
                )}
                {!signUpErrors.confirmPassword && 
                 signUpData.confirmPassword && 
                 signUpData.password && 
                 signUpData.password === signUpData.confirmPassword && (
                  <p className="mt-1 text-xs text-green-500">비밀번호가 일치합니다.</p>
                )}
              </div>

              {/* 약관 동의 */}
              <div className="space-y-3">
                {/* 전체 동의 */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={signUpData.termsAgreed && signUpData.privacyAgreed && signUpData.marketingAgreed}
                      onChange={handleAgreeAll}
                      className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-0 focus:ring-offset-zinc-900"
                    />
                    <span className="text-sm font-medium text-white">전체 동의</span>
                  </label>
                </div>

                <div className="border-t border-zinc-700 pt-3 space-y-3">
                  {/* 이용약관 동의 */}
                  <div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={signUpData.termsAgreed}
                          onChange={(e) => handleSignUpInputChange('termsAgreed', e.target.checked)}
                          className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-0 focus:ring-offset-zinc-900"
                          required
                        />
                        <span className="text-sm text-white">
                          [필수] 이용약관 동의
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          // TODO: 이용약관 모달 열기
                        }}
                      >
                        보기
                      </button>
                    </label>
                    {signUpErrors.termsAgreed && (
                      <p className="mt-1 text-xs text-red-500">{signUpErrors.termsAgreed}</p>
                    )}
                  </div>

                  {/* 개인정보 처리방침 동의 */}
                  <div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={signUpData.privacyAgreed}
                          onChange={(e) => handleSignUpInputChange('privacyAgreed', e.target.checked)}
                          className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-0 focus:ring-offset-zinc-900"
                          required
                        />
                        <span className="text-sm text-white">
                          [필수] 개인정보 처리방침 동의
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          // TODO: 개인정보 처리방침 모달 열기
                        }}
                      >
                        보기
                      </button>
                    </label>
                    {signUpErrors.privacyAgreed && (
                      <p className="mt-1 text-xs text-red-500">{signUpErrors.privacyAgreed}</p>
                    )}
                  </div>

                  {/* 마케팅 정보 수신 동의 */}
                  <div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={signUpData.marketingAgreed}
                          onChange={(e) => handleSignUpInputChange('marketingAgreed', e.target.checked)}
                          className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-0 focus:ring-offset-zinc-900"
                        />
                        <span className="text-sm text-white">
                          [선택] 마케팅 정보 수신 동의
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          // TODO: 마케팅 정보 수신 모달 열기
                        }}
                      >
                        보기
                      </button>
                    </label>
                  </div>
                </div>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 active:scale-[0.98]"
              >
                회원가입
              </button>
            </form>
          </div>
        )}

        {/* 모드 전환 버튼 */}
        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            {mode === 'signin' ? (
              <>
            아직 계정이 없으신가요?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              이메일로 가입하기
                </button>
              </>
            ) : (
              <>
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  로그인
                </button>
              </>
            )}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

