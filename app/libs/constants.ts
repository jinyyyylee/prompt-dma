import type { PromptCardProps, CategoryCardProps } from '../libs/types';

export const TRENDING_PROMPTS: PromptCardProps[] = [
  {
    title: 'ChatGPT 블로그 초안 생성 프롬프트',
    thumbnail: '/window.svg',
    priceLabel: '무료',
    likes: 324,
    downloads: 1089,
    rating: 4.7,
    summary: '키워드만 입력하면 SEO 맞춤 블로그 초안을 5분 만에 생성합니다.',
    keywords: ['블로그', 'SEO', '콘텐츠'],
    level: '입문',
  },
  {
    title: 'Midjourney 8K 제품 렌더 템플릿',
    thumbnail: '/globe.svg',
    priceLabel: '₩4,900',
    likes: 210,
    downloads: 742,
    rating: 4.6,
    summary: '프리미엄 전자제품 목업을 8K 해상도로 안정적으로 생성합니다.',
    keywords: ['이미지', '제품', '8K'],
    level: '고급',
  },
  {
    title: 'Claude 회의록 요약/액션아이템 추출',
    thumbnail: '/file.svg',
    priceLabel: '무료',
    likes: 189,
    downloads: 680,
    rating: 4.5,
    summary: '회의 대화를 요약하고 실행해야 할 항목을 자동으로 정리합니다.',
    keywords: ['업무', '요약', '액션아이템'],
    level: '중급',
  },
  {
    title: '코드 리뷰 자동화 프롬프트 (TS/React)',
    thumbnail: '/vercel.svg',
    priceLabel: '₩2,900',
    likes: 132,
    downloads: 401,
    rating: 4.4,
    summary: 'PR 설명을 분석해 테스트 누락과 코드 스멜을 진단합니다.',
    keywords: ['개발', '리뷰', '테스트'],
    level: '고급',
  },
];

export const CATEGORY_CARDS: CategoryCardProps[] = [
  {
    key: 'image',
    icon: '🎨',
    title: '이미지 생성',
    items: ['제품 목업', '브랜딩 일러스트', '콘셉트 아트'],
    total: 1240,
    isNew: false,
  },
  {
    key: 'writing',
    icon: '✍️',
    title: '글쓰기 / 블로그',
    items: ['SEO 블로그', '소셜 캡션', '뉴스레터'],
    total: 980,
  },
  {
    key: 'dev',
    icon: '👩‍💻',
    title: '개발 / 코드',
    items: ['코드 리뷰', '테스트 생성', '리팩터 가이드'],
    total: 860,
    isNew: true,
  },
  {
    key: 'marketing',
    icon: '📈',
    title: '마케팅 / 광고',
    items: ['랜딩 카피', '키워드 리서치', 'A/B 카피'],
    total: 1120,
  },
  {
    key: 'learn',
    icon: '🧠',
    title: '학습 / 교육',
    items: ['요약/퀴즈', '튜터 프롬프트', '개념 확장'],
    total: 540,
  },
];

export const PLATFORM_PROMPTS: Record<string, PromptCardProps[]> = {
  ChatGPT: TRENDING_PROMPTS,
  Midjourney: TRENDING_PROMPTS,
  Claude: TRENDING_PROMPTS,
};

export const HERO_TAGS = [
  { label: '🔥 트렌드', value: 'trend' },
  { label: '무료 프롬프트', value: 'free' },
  { label: '노코드 자동화', value: 'nocode' },
  { label: '이미지 생성', value: 'image' },
  { label: '마케팅 카피', value: 'marketing' },
];

export const HERO_MODELS = [
  { name: 'ChatGPT', badge: 'GPT-4' },
  { name: 'Claude', badge: '3.5 Sonnet' },
  { name: 'Midjourney', badge: 'V6' },
  { name: 'Stable Diffusion', badge: 'XL' },
];

export const FILTER_OPTIONS = [
  '최신 등록',
  '판매량 높은 순',
  '평점 높은 순',
  '무료 프롬프트',
  '프리미엄',
];

// 프롬프트 등록 폼 관련 상수
export const AI_VIDEO_TOOLS = [
  'Runway Gen-3',
  'Adobe Firefly',
  'Pika',
  'Stable Video Diffusion',
  'Kling AI',
  'Luma AI',
  '기타',
];

export const AI_IMAGE_TOOLS = [
  'Midjourney',
  'DALL-E',
  'Stable Diffusion',
  'Adobe Firefly',
  'Leonardo AI',
  'Ideogram',
  '기타',
];

export const VIDEO_SUBJECTS = [
  '풍경',
  '인물',
  '판타지',
  '제품',
  '애니메이션',
  '도시',
  '자연',
  '추상',
  '기타',
];

export const IMAGE_SUBJECTS = [
  '풍경',
  '인물',
  '판타지',
  '제품',
  '일러스트',
  '사진',
  '아트',
  '로고',
  '기타',
];

export const ASPECT_RATIOS = [
  { label: '16:9 (가로)', value: '16:9' },
  { label: '9:16 (세로)', value: '9:16' },
  { label: '1:1 (정사각형)', value: '1:1' },
  { label: '4:3', value: '4:3' },
  { label: '21:9 (울트라와이드)', value: '21:9' },
];

