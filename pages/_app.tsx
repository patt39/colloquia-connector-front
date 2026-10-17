import "@/styles/globals.css";
import { Toaster } from "sonner";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { ClientOnly } from "@/components/util/client-only";
import { LoadingFile } from "@/components/ui-setting/loading-file";
import { ThemeProvider } from "@/components/util/theme-provider";
import { ContextProvider } from "@/components/util/context-user";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Toaster richColors />
        <ClientOnly fallback={<LoadingFile />}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
                <ReactQueryDevtools
                  buttonPosition="bottom-right"
                  initialIsOpen={false}
                />
              )}
            </HydrationBoundary>
          </ThemeProvider>
        </ClientOnly>
      </ContextProvider>
    </QueryClientProvider>
  );
}
