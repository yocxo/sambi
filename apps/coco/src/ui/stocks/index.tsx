'use client';

import dynamic from 'next/dynamic';

import { EventsSkeleton } from './events-skeleton';
import { StockSkeleton } from './stock-skeleton';
import { StocksSkeleton } from './stocks-skeleton';

export { BotCard, BotMessage, SystemMessage } from './message';

const Stock = dynamic(() => import('./stock').then((mod) => mod.Stock), {
  ssr: false,
  loading: () => <StockSkeleton />,
});

const Purchase = dynamic(
  () => import('./stock-purchase').then((mod) => mod.Purchase),
  {
    ssr: false,
    loading: () => (
      <div className="h-[375px] rounded-xl border bg-card p-4 text-primary sm:h-[314px]" />
    ),
  },
);

const Stocks = dynamic(() => import('./stocks').then((mod) => mod.Stocks), {
  ssr: false,
  loading: () => <StocksSkeleton />,
});

const Events = dynamic(() => import('./events').then((mod) => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />,
});

export { Stock, Purchase, Stocks, Events };