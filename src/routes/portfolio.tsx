import { createFileRoute } from '@tanstack/react-router';
import { PortfolioPage } from '@/pages/portifolio';

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
});

function Portfolio() {
  return <PortfolioPage />;
}
