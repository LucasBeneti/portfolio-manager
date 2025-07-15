import { LayoutWrapper } from './components/Layout';
import { MainTabs } from './components/main-tabs';
import { UserInformationProvider } from './context/user-information';
import { DialogProvider } from './context/dialog/DialogContext';
function App() {
  return (
    <LayoutWrapper>
      <UserInformationProvider>
        <DialogProvider>
          <section className='flex min-h-svh flex-col items-center'>
            <MainTabs />
          </section>
        </DialogProvider>
      </UserInformationProvider>
    </LayoutWrapper>
  );
}

export default App;
