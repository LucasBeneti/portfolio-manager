import { LayoutWrapper } from './components/Layout';
import { MainTabs } from './components/main-tabs';

function App() {
  return (
    <LayoutWrapper>
      <section className='flex min-h-svh flex-col items-center'>
        <MainTabs />
      </section>
    </LayoutWrapper>
  );
}

export default App;
