"use client";

import type {Route} from "next";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOutAction} from "@/app/actions/auth";
import {Brand} from "@/components/brand/Brand";
import type {PublicUser} from "@/modules/auth/domain/auth";

const nav=[
  ["Home","/app"],
  ["Learn","/app/courses"],
  ["Metrics Lab","/app/practice/metrics-lab"],
  ["TACoS Lab","/app/practice/tacos-calculator"],
  ["Campaign Builder","/app/practice/campaign-builder"],
  ["Triage Lab","/app/practice/search-term-triage"],
  ["Readiness","/app/readiness"],
] as const;

export function AppShell({children,user}:{children:React.ReactNode;user:PublicUser}){
  const pathname=usePathname();
  return <div className="app-layout">
    <aside className="app-sidebar">
      <Brand inverse/>
      <nav aria-label="Learner navigation">{nav.map(([label,href])=><Link key={href} data-active={pathname===href||undefined} href={href as Route}>{label}</Link>)}</nav>
      <div className="sidebar-note"><span className="mono">SIGNED IN</span><p>{user.displayName}<br/>{user.email}</p><form action={signOutAction}><button className="sidebar-signout">Sign out</button></form></div>
    </aside>
    <main className="app-main">{children}</main>
  </div>;
}
