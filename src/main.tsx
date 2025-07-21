import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
// import App from './App.tsx';

// Register the router instance for type safety

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
