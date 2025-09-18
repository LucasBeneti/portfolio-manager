'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useUserInformation } from '@/context/user-information';
import {
  computedUserAssets,
  convertComputedAssetsToChart,
} from '@/utils/assets-computation';

export const description = 'A donut chart with text';

const chartConfig = {
  investment: {
    label: 'Categoria',
  },
  'fixed-income-br': {
    label: 'Renda fixa',
    color: 'var(--chart-fixed-income-br)',
  },
  'stocks-br': {
    label: 'Ações Brasileiras',
    color: 'var(--chart-stocks-br)',
  },
  'stocks-us': {
    label: 'Ações Americanas',
    color: 'var(--chart-stocks-us)',
  },
  fii: {
    label: 'Fundos Imobiliários',
    color: 'var(--chart-fii)',
  },
  crypto: {
    label: 'Crypto',
    color: 'var(--chart-crypto)',
  },
} satisfies ChartConfig;

export function PortfolioAllocationChart() {
  const { assets } = useUserInformation();
  const compAssets = computedUserAssets(assets);
  const formattedData = convertComputedAssetsToChart(compAssets);

  const totalVisitors = React.useMemo(() => {
    return formattedData.reduce((acc, curr) => acc + curr.amountInvested, 0);
  }, [formattedData]);
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={formattedData}
              dataKey='amountInvested'
              nameKey='investment'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        {formattedData.map((i) => {
          return (
            <p>
              {i.investment}:{' '}
              {((i.amountInvested / totalVisitors) * 100).toFixed(2)}%
            </p>
          );
        })}
        <div className='flex items-center gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
