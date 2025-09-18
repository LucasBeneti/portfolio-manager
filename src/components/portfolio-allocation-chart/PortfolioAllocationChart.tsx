'use client';

import * as React from 'react';
import { LucideArrowBigUp, LucideArrowBigDown } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
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

  const totalInvested = React.useMemo(() => {
    return formattedData.reduce((acc, curr) => acc + curr.amountInvested, 0);
  }, [formattedData]);
  return (
    <Card className='flex flex-col bg-gray-950'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-2xl text-center'>
          Total investido da carteira
        </CardTitle>
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
              innerRadius={75}
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
                          className='fill-foreground text-lg font-bold'
                        >
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(totalInvested)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Investidos
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
        <ChartFooterCategoryData
          formattedData={formattedData}
          totalInvested={totalInvested}
        />
        <div className='text-muted-foreground leading-none hover:cursor-default'>
          Mostrando total de investimentos
        </div>
      </CardFooter>
    </Card>
  );
}

type ChartFooterCategoryDataProps = {
  formattedData: any;
  totalInvested: number;
};
function ChartFooterCategoryData(props: ChartFooterCategoryDataProps) {
  const { formattedData, totalInvested } = props;
  const { objectives } = useUserInformation();

  return (
    <section className='flex flex-col items-start w-full gap-2'>
      {formattedData.map((i: any) => {
        const percentInvested = (i.amountInvested / totalInvested) * 100;
        const isOverObjective =
          objectives && objectives[i.investment] > percentInvested;
        return (
          <span className='flex gap-1 items-center hover:scale-105 transition-all'>
            <p>
              {chartConfig?.[i.investment as keyof typeof chartConfig].label}:
            </p>
            <p
              className={`font-bold ${isOverObjective ? 'text-green-400' : 'text-red-400'}`}
            >
              {percentInvested.toFixed(2)}%
            </p>
            <p>
              {isOverObjective ? (
                <LucideArrowBigUp
                  stroke='oklch(79.2% 0.209 151.711)'
                  fill='oklch(79.2% 0.209 151.711)'
                />
              ) : (
                <LucideArrowBigDown
                  stroke='oklch(70.4% 0.191 22.216)'
                  fill='oklch(70.4% 0.191 22.216)'
                />
              )}
            </p>
          </span>
        );
      })}
    </section>
  );
}
