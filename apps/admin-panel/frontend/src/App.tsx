import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

import Page from './Page';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}
