import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "@/errors/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import BaseRouter from "./Router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        useErrorBoundary: true,
        retry: false,
      },
    },
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <BaseRouter />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
