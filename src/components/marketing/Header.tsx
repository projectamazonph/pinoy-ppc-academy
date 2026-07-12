import Link from "next/link";
import { Brand } from "@/components/brand/Brand";

const links = [
  ["Curriculum", "#curriculum"],
  ["Practice Lab", "#practice"],
  ["Pricing", "#pricing"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-row">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/signin">Sign in</Link>
          <Link className="btn btn-primary btn-small" href="/signup?path=va-career-starter">Start free</Link>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/signin">Sign in</Link>
          </nav>
        </details>
        <Link className="btn btn-primary mobile-start" href="/signup?path=va-career-starter">Start free</Link>
      </div>
    </header>
  );
}
