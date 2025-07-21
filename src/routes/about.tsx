import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/pages/about';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return <AboutPage />;
}
