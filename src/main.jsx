import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import { App } from '~/app.jsx';
import { InitAuth } from '~/components/init-auth';
import { AuthProvider } from '~/contexts/auth-context';
import { LocaleProvider } from '~/contexts/locale-context';
import { ThemeProvider } from '~/contexts/theme-context';

import '~/styles/index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LocaleProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <InitAuth>
                <App />
              </InitAuth>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
