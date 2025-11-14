export interface PromptCardProps {
  title: string;
  thumbnail: string;
  priceLabel: string;
  likes: number;
  downloads: number;
  rating: number;
  summary: string;
  keywords: string[];
  level: '입문' | '중급' | '고급';
}

export interface CategoryCardProps {
  key: string;
  icon: string;
  title: string;
  items: string[];
  total: number;
  isNew?: boolean;
}

