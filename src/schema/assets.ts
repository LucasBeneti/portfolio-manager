import { z } from 'zod';

export const categorySchema = z.enum(
  [
    'fixed-income-br',
    'fixed-income-us',
    'stocks-br',
    'stocks-us',
    'fii',
    'crypto',
  ],
  { message: 'Selecione uma categoria válida.' }
);
