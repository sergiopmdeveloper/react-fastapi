import { SidebarTrigger } from '../ui/sidebar';
import { Section } from './section-layout';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <Section>
      <header className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Logo</h1>
        </div>

        <ThemeToggle />
      </header>
    </Section>
  );
}
