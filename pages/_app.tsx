import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  Hydrate,
} from '@tanstack/react-query';
import RouterGuard from './components/RouterGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RouterGuard>
          <Component {...pageProps} />
        </RouterGuard>
      </Hydrate>
    </QueryClientProvider>
  );
}
