import { ThemeProvider } from "./app/contexts/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
      <ThemeSwitcher/>
      </div>
    </ThemeProvider>
  );
}
