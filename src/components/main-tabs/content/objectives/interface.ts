import type { Category } from '@/interfaces/category';
export type ObjectContent = {
  key: Category;
  title: string;
  percentage: number;
};

export type ObjectiveValue = Array<ObjectContent>;
