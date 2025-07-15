import { categorySchema } from '@/schema/assets';
import { z } from 'zod';

export type Category = z.infer<typeof categorySchema>;

export type Asset = {
  id: string;
  category: string;
  name: string;
  quantity: number;
  currentValue: number;
  grade: number;
};
