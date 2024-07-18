import { ThemeSwitcher } from "./ThemeSwitcher";


export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold -tracking-wide">theusers</h1>
        <small className="text-muted-foreground">
          Gerencie os seus usuários
        </small>
      </div>
      <ThemeSwitcher />
    </header>
  );
}
