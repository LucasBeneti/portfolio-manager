import { LayoutWrapper } from "./components/Layout";
import { MainTabs } from "./components/main-tabs";
import { UserInformationProvider } from "./context/UserInformationContext";

function App() {
  return (
    <LayoutWrapper>
      <UserInformationProvider>
        <section className="flex min-h-svh flex-col items-center">
          <MainTabs />
        </section>
      </UserInformationProvider>
    </LayoutWrapper>
  );
}

export default App;
