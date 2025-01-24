import { theme } from '@/config/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache: queryCache,
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
export interface RootProviderProps {
  children: any;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
