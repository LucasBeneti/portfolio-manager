import type { Category } from '@/components/interfaces/category';
export type ObjectContent = {
  key: Category;
  title: string;
  percentage: number;
};

export type ObjectiveValue = Array<ObjectContent>;
