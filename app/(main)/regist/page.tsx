'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import {
  AI_VIDEO_TOOLS,
  AI_IMAGE_TOOLS,
  VIDEO_SUBJECTS,
  IMAGE_SUBJECTS,
  ASPECT_RATIOS,
} from '../../libs/constants';

type PromptType = 'image' | 'video' | null;

interface FormData {
  promptType: PromptType;
  title: string;
  pricingType: 'free' | 'paid';
  price: string;
  aiTool: string;
  subjects: string[];
  prompt: string;
  negativePrompt: string;
  videoUrl: string;
  videoFile: File | null;
  imageUrl: string;
  imageFile: File | null;
  previewImage: File | null;
  description: string;
  advancedSettings: string;
  aspectRatio: string;
}

export default function RegistPage() {
  const [formData, setFormData] = useState<FormData>({
    promptType: null,
    title: '',
    pricingType: 'free',
    price: '',
    aiTool: '',
    subjects: [],
    prompt: '',
    negativePrompt: '',
    videoUrl: '',
    videoFile: null,
    imageUrl: '',
    imageFile: null,
    previewImage: null,
    description: '',
    advancedSettings: '',
    aspectRatio: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | File | null | string[] | PromptType) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };
        // 타입 변경 시 관련 필드 초기화
        if (field === 'promptType') {
          newData.aiTool = '';
          newData.subjects = [];
          newData.videoUrl = '';
          newData.videoFile = null;
          newData.imageUrl = '';
          newData.imageFile = null;
        }
        return newData;
      });
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleSubjectToggle = useCallback(
    (subject: string) => {
      setFormData((prev) => {
        const subjects = prev.subjects.includes(subject)
          ? prev.subjects.filter((s) => s !== subject)
          : [...prev.subjects, subject];
        return { ...prev, subjects };
      });
    },
    []
  );

  const handleFileChange = useCallback(
    (field: 'videoFile' | 'imageFile' | 'previewImage', file: File | null) => {
      handleInputChange(field, file);
    },
    [handleInputChange]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.promptType) {
      newErrors.promptType = '프롬프트 타입을 선택해주세요.';
    }

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    } else if (formData.title.length > 50) {
      newErrors.title = '제목은 50자 이하로 입력해주세요.';
    }

    if (formData.pricingType === 'paid' && !formData.price.trim()) {
      newErrors.price = '가격을 입력해주세요.';
    }

    if (!formData.aiTool) {
      newErrors.aiTool = 'AI 도구를 선택해주세요.';
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = '최소 1개 이상의 주제를 선택해주세요.';
    }

    if (!formData.prompt.trim()) {
      newErrors.prompt = '원본 프롬프트를 입력해주세요.';
    }

    // 타입별 필수 필드 검증
    if (formData.promptType === 'video') {
      if (!formData.videoUrl.trim() && !formData.videoFile) {
        newErrors.videoUrl = '영상 파일을 업로드하거나 링크를 입력해주세요.';
      }
    } else if (formData.promptType === 'image') {
      if (!formData.imageUrl.trim() && !formData.imageFile) {
        newErrors.imageUrl = '이미지 파일을 업로드하거나 링크를 입력해주세요.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        // TODO: API 호출로 데이터 전송
        console.log('Form submitted:', formData);
        alert('프롬프트가 성공적으로 등록되었습니다!');
      }
    },
    [formData, validateForm]
  );

  const aiTools = formData.promptType === 'image' ? AI_IMAGE_TOOLS : AI_VIDEO_TOOLS;
  const subjects = formData.promptType === 'image' ? IMAGE_SUBJECTS : VIDEO_SUBJECTS;

  return (
    <div className="regist-page min-h-screen bg-[#050505] text-white transition-colors">
      <Header />
      <main
        className={`mx-auto max-w-4xl px-4 transition-all duration-500 ${
          formData.promptType
            ? 'py-8 sm:py-12'
            : 'flex min-h-[calc(100vh-200px)] items-center justify-center py-8 sm:py-12'
        }`}
      >
        {!formData.promptType ? (
          <div className="w-full max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold sm:text-3xl">AI 프롬프트 등록</h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                프롬프트의 품질과 재현 가능성을 명확하게 전달해주세요.
              </p>
            </div>

            {/* 0. 프롬프트 타입 선택 (중앙 배치) */}
            <section className="form-card rounded-xl border border-zinc-200 bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-center text-lg font-semibold">프롬프트 타입 선택</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleInputChange('promptType', 'image')}
                  className="group relative rounded-xl border-2 border-zinc-200 bg-white p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:border-zinc-300 hover:shadow-md active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 pointer-events-auto cursor-pointer"
                >
                  <div className="mb-3 text-3xl transition-transform duration-200">
                    🖼️
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">이미지 프롬프트</h3>
                  <p className="text-sm opacity-80">
                    이미지 생성 AI 도구를 위한 프롬프트를 등록합니다.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('promptType', 'video')}
                  className="group relative rounded-xl border-2 border-zinc-200 bg-white p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:border-zinc-300 hover:shadow-md active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 pointer-events-auto cursor-pointer"
                >
                  <div className="mb-3 text-3xl transition-transform duration-200">
                    🎬
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">동영상 프롬프트</h3>
                  <p className="text-sm opacity-80">
                    동영상 생성 AI 도구를 위한 프롬프트를 등록합니다.
                  </p>
                </button>
              </div>
              {errors.promptType && (
                <p className="mt-2 text-center text-xs text-red-500">{errors.promptType}</p>
              )}
            </section>
          </div>
        ) : (
          <div className="w-full animate-[fadeIn_0.5s_ease-in-out] space-y-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold sm:text-3xl">AI 프롬프트 등록</h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                프롬프트의 품질과 재현 가능성을 명확하게 전달해주세요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 0. 프롬프트 타입 선택 (위로 올라간 상태) */}
              <section className="form-card rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-500">
                <h2 className="mb-6 text-lg font-semibold">프롬프트 타입 선택</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('promptType', 'image')}
                    className={`group relative rounded-xl border-2 p-6 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      formData.promptType === 'image'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg dark:border-zinc-100 dark:bg-zinc-100 dark:text-black'
                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="mb-3 text-3xl transition-transform duration-200 group-hover:scale-110">
                      🖼️
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">이미지 프롬프트</h3>
                    <p className="text-sm opacity-80">
                      이미지 생성 AI 도구를 위한 프롬프트를 등록합니다.
                    </p>
                    {formData.promptType === 'image' && (
                      <div className="absolute right-4 top-4">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-white dark:bg-black" />
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('promptType', 'video')}
                    className={`group relative rounded-xl border-2 p-6 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      formData.promptType === 'video'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg dark:border-zinc-100 dark:bg-zinc-100 dark:text-black'
                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="mb-3 text-3xl transition-transform duration-200 group-hover:scale-110">
                      🎬
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">동영상 프롬프트</h3>
                    <p className="text-sm opacity-80">
                      동영상 생성 AI 도구를 위한 프롬프트를 등록합니다.
                    </p>
                    {formData.promptType === 'video' && (
                      <div className="absolute right-4 top-4">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-white dark:bg-black" />
                      </div>
                    )}
                  </button>
                </div>
                {errors.promptType && (
                  <p className="mt-2 text-xs text-red-500">{errors.promptType}</p>
                )}
              </section>

              {/* 1. 기본 정보 섹션 */}
              <section className="form-card rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold">1. 기본 정보 (필수)</h2>
                <div className="space-y-6">
                  {/* 제목 */}
                  <div>
                    <label htmlFor="title" className="mb-2 block text-sm font-medium">
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder={
                        formData.promptType === 'image'
                          ? '예: 고품질 제품 사진 스타일 프롬프트'
                          : '예: 시네마틱한 새벽 사막 질주'
                      }
                      maxLength={50}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                    />
                    <p className="mt-1 text-xs text-zinc-500">
                      {formData.title.length}/50자 (20자 내외 권장)
                    </p>
                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                  </div>

                  {/* 가격 / 공유 여부 */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      가격 / 공유 여부 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pricingType"
                          value="free"
                          checked={formData.pricingType === 'free'}
                          onChange={(e) =>
                            handleInputChange('pricingType', e.target.value as 'free' | 'paid')
                          }
                          className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-200 dark:border-zinc-600 dark:text-zinc-100"
                        />
                        <span className="text-sm">무료 공유</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pricingType"
                          value="paid"
                          checked={formData.pricingType === 'paid'}
                          onChange={(e) =>
                            handleInputChange('pricingType', e.target.value as 'free' | 'paid')
                          }
                          className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-200 dark:border-zinc-600 dark:text-zinc-100"
                        />
                        <span className="text-sm">판매</span>
                      </label>
                    </div>
                    {formData.pricingType === 'paid' && (
                      <div className="mt-3">
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="가격을 입력하세요 (원)"
                          min="0"
                          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                        />
                        {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                      </div>
                    )}
                  </div>

                  {/* AI 도구 선택 */}
                  <div>
                    <label htmlFor="aiTool" className="mb-2 block text-sm font-medium">
                      AI 도구 선택 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="aiTool"
                        value={formData.aiTool}
                        onChange={(e) => handleInputChange('aiTool', e.target.value)}
                        className="w-full appearance-none rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 pr-10 text-sm text-white outline-none focus:border-white/40 focus:ring-0"
                      >
                        <option value="">선택하세요</option>
                        {aiTools.map((tool) => (
                          <option key={tool} value={tool}>
                            {tool}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                    {errors.aiTool && <p className="mt-1 text-xs text-red-500">{errors.aiTool}</p>}
                  </div>

                  {/* 주제 선택 */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {formData.promptType === 'image' ? '이미지' : '영상'}의 주제{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => handleSubjectToggle(subject)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-150 active:scale-95 ${
                            formData.subjects.includes(subject)
                              ? 'border-zinc-900 bg-zinc-900 text-white shadow-md dark:border-zinc-100 dark:bg-zinc-100 dark:text-black'
                              : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600'
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                    {errors.subjects && (
                      <p className="mt-1 text-xs text-red-500">{errors.subjects}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* 2. 프롬프트 및 결과물 섹션 */}
              <section className="form-card rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold">2. 프롬프트 및 결과물 (핵심)</h2>
                <div className="space-y-6">
                  {/* 원본 프롬프트 */}
                  <div>
                    <label htmlFor="prompt" className="mb-2 block text-sm font-medium">
                      원본 프롬프트 (Prompt) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="prompt"
                      value={formData.prompt}
                      onChange={(e) => handleInputChange('prompt', e.target.value)}
                      placeholder={`${formData.promptType === 'image' ? '이미지' : '영상'} 생성에 실제로 사용된 전체 텍스트 프롬프트를 입력하세요`}
                      rows={6}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                    />
                    {errors.prompt && <p className="mt-1 text-xs text-red-500">{errors.prompt}</p>}
                  </div>

                  {/* 네거티브 프롬프트 */}
                  <div>
                    <label htmlFor="negativePrompt" className="mb-2 block text-sm font-medium">
                      네거티브 프롬프트 (Negative Prompt){' '}
                      <span className="text-zinc-400">(선택)</span>
                    </label>
                    <textarea
                      id="negativePrompt"
                      value={formData.negativePrompt}
                      onChange={(e) => handleInputChange('negativePrompt', e.target.value)}
                      placeholder="제외하거나 원하지 않는 요소를 명시하세요"
                      rows={4}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                    />
                  </div>

                  {/* 생성된 결과물 (타입별) */}
                  {formData.promptType === 'video' ? (
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        생성된 영상 <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor="videoUrl"
                            className="mb-2 block text-xs text-zinc-600 dark:text-zinc-400"
                          >
                            YouTube 또는 외부 링크
                          </label>
                          <input
                            type="url"
                            id="videoUrl"
                            value={formData.videoUrl}
                            onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                            placeholder="https://youtube.com/watch?v=... 또는 외부 링크"
                            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                          />
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2">
                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                            <span className="text-xs text-zinc-500">또는</span>
                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="videoFile"
                            className="mb-2 block text-xs text-zinc-600 dark:text-zinc-400"
                          >
                            파일 업로드 (MP4, GIF 등)
                          </label>
                          <input
                            type="file"
                            id="videoFile"
                            accept="video/*,.gif"
                            onChange={(e) => handleFileChange('videoFile', e.target.files?.[0] || null)}
                            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                          />
                          {formData.videoFile && (
                            <p className="mt-1 text-xs text-zinc-500">{formData.videoFile.name}</p>
                          )}
                        </div>
                      </div>
                      {errors.videoUrl && (
                        <p className="mt-1 text-xs text-red-500">{errors.videoUrl}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        생성된 이미지 <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor="imageUrl"
                            className="mb-2 block text-xs text-zinc-600 dark:text-zinc-400"
                          >
                            이미지 링크 (Imgur, 외부 링크 등)
                          </label>
                          <input
                            type="url"
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                            placeholder="https://imgur.com/... 또는 외부 링크"
                            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                          />
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2">
                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                            <span className="text-xs text-zinc-500">또는</span>
                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="imageFile"
                            className="mb-2 block text-xs text-zinc-600 dark:text-zinc-400"
                          >
                            파일 업로드 (JPEG, PNG 등)
                          </label>
                          <input
                            type="file"
                            id="imageFile"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => handleFileChange('imageFile', e.target.files?.[0] || null)}
                            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                          />
                          {formData.imageFile && (
                            <p className="mt-1 text-xs text-zinc-500">{formData.imageFile.name}</p>
                          )}
                        </div>
                      </div>
                      {errors.imageUrl && (
                        <p className="mt-1 text-xs text-red-500">{errors.imageUrl}</p>
                      )}
                    </div>
                  )}

                  {/* 결과물 미리보기 */}
                  <div>
                    <label htmlFor="previewImage" className="mb-2 block text-sm font-medium">
                      결과물 미리보기 <span className="text-zinc-400">(선택)</span>
                    </label>
                    <input
                      type="file"
                      id="previewImage"
                      accept="image/jpeg,image/png"
                      onChange={(e) => handleFileChange('previewImage', e.target.files?.[0] || null)}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                    />
                    {formData.previewImage && (
                      <p className="mt-1 text-xs text-zinc-500">{formData.previewImage.name}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* 3. 세부 설정 및 팁 섹션 */}
              <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="mb-6 text-lg font-semibold">3. 세부 설정 및 팁 (전문성 강화)</h2>
                <div className="space-y-6">
                  {/* 설명 / 제작 팁 */}
                  <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                      {formData.promptType === 'image' ? '이미지' : '영상'} 설명 / 제작 팁{' '}
                      <span className="text-zinc-400">(선택)</span>
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="프롬프트의 배경 설명, 제작 의도, 프롬프트가 잘 작동하는 조건 등을 자유롭게 기술하세요"
                      rows={6}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                    />
                  </div>

                  {/* 추가 설정값 */}
                  <div>
                    <label htmlFor="advancedSettings" className="mb-2 block text-sm font-medium">
                      추가 설정값 (Advanced Settings){' '}
                      <span className="text-zinc-400">(선택)</span>
                    </label>
                    <textarea
                      id="advancedSettings"
                      value={formData.advancedSettings}
                      onChange={(e) => handleInputChange('advancedSettings', e.target.value)}
                      placeholder="예: 카메라 모션 강도: 0.8, 시드값: 12345, 스타일 가중치: 0.7"
                      rows={4}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
                    />
                  </div>

                  {/* 종횡비 */}
                  <div>
                    <label htmlFor="aspectRatio" className="mb-2 block text-sm font-medium">
                      종횡비 <span className="text-zinc-400">(선택)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="aspectRatio"
                        value={formData.aspectRatio}
                        onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                        className="w-full appearance-none rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 pr-10 text-sm text-white outline-none focus:border-white/40 focus:ring-0"
                      >
                        <option value="">선택하세요</option>
                        {ASPECT_RATIOS.map((ratio) => (
                          <option key={ratio.value} value={ratio.value}>
                            {ratio.label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 제출 버튼 */}
              <div className="flex items-center justify-end gap-3">
                <Link
                  href="/"
                  className="rounded-lg border border-zinc-200 px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-zinc-100 hover:scale-105 active:scale-95 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
                >
                  프롬프트 등록하기
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
      <style jsx>{`
        .regist-page {
          color: #f8fafc;
        }
        .regist-page .form-card {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          backdrop-filter: blur(12px);
        }
        .regist-page input:not([type='radio']),
        .regist-page textarea,
        .regist-page select {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #fff;
        }
        .regist-page input:not([type='radio']):focus,
        .regist-page textarea:focus,
        .regist-page select:focus {
          border-color: rgba(255, 255, 255, 0.45);
          box-shadow: none;
          outline: none;
        }
        .regist-page input::placeholder,
        .regist-page textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .regist-page select option {
          color: #111;
        }
        :global(.regist-page .text-zinc-600) {
          color: rgba(248, 250, 252, 0.7) !important;
        }
        :global(.regist-page .text-zinc-500),
        :global(.regist-page .text-zinc-400) {
          color: rgba(248, 250, 252, 0.6) !important;
        }
        :global(.regist-page .form-card .border-zinc-200) {
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
