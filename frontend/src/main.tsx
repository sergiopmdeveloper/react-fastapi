import '@/index.css';
import { router } from '@/router';
import { SidebarProvider } from '@/shared/components/ui/sidebar';
import { ThemeProvider } from '@/shared/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppSidebar } from './shared/components/app/app-sidebar';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />

          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
