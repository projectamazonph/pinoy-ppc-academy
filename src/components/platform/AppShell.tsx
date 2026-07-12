import Link from "next/link";
import { Brand } from "@/components/brand/Brand";

const nav = [
  ["Home", "/app"],
  ["Learn", "/app/courses/va-career-starter"],
  ["Metrics Lab", "/app/practice/metrics-lab"],
  ["Triage Lab", "/app/practice/search-term-triage"],
] as const;

export function AppShell({ children, active }: { children: React.ReactNode; active: string }) {
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <Brand inverse />
        <nav aria-label="Learner navigation">
          {nav.map(([label, href]) => <Link key={href} data-active={active === href || undefined} href={href}>{label}</Link>)}
        </nav>
        <div className="sidebar-note"><span className="mono">DEMO BUILD</span><p>Progress saves in this browser during the frontend alpha.</p></div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
