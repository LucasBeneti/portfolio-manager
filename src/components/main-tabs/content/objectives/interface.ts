import type { Category } from '@/interfaces';
export type ObjectContent = {
  key: Category;
  title: string;
  percentage: number;
};

export type ObjectiveValue = Array<ObjectContent>;
