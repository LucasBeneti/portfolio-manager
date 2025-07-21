import { HomePage } from '@/pages/home/HomePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <h3 className='dark dark:text-white'>Welcome Home!</h3>
      <HomePage />
    </div>
  );
}
