import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { Header } from "./src/components/Header";
import { UserForm } from "./src/components/UserForm";
import { UsersList } from "./src/components/UsersList";
import { queryClient } from "./app/libs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./src/components/ui/toaster";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className=" max-w-[500px] mx-auto mt-20">
          <Header />
          <main className="mt-10 space-y-3">
            <UserForm />
            <UsersList />
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
