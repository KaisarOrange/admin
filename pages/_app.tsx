import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  Hydrate,
} from '@tanstack/react-query';
import RouterGuard from './components/RouterGuard';
import { Analytics } from '@vercel/analytics/react';
import { createTheme, ThemeProvider } from '@mui/material';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RouterGuard>
            <Component {...pageProps} />
          </RouterGuard>
        </Hydrate>
        <Analytics />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
