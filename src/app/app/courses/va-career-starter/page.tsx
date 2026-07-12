import Link from "next/link";
import { AppShell } from "@/components/platform/AppShell";

const modules = [
  ["0.1", "What VA Work Actually Is", "Remote roles, client expectations, schedules, communication, and honest career expectations."],
  ["0.2", "Work Readiness", "Device, connectivity, security, task tracking, documentation, and professional boundaries."],
  ["0.3", "E-commerce and Amazon Roles", "Seller, vendor, agency, listings, inventory, fulfillment, customer service, and advertising."],
  ["0.4", "Career Path Assessment", "Transferable skills, readiness checklist, sample lesson, simulator, and recommended route."],
];

export default function CoursePage() {
  return <AppShell active="/app/courses/va-career-starter"><div className="app-page"><header className="course-hero"><p className="eyebrow light">FREE ROUTE / VA-00</p><h1>VA Career Starter</h1><p>Learn what remote work requires before you spend money on a specialization.</p><div><span>4 modules</span><span>3 practice missions</span><span>Beginner level</span></div></header><section className="module-list"><h2>Course modules</h2>{modules.map(([number, title, copy], index) => <article key={number}><span>{number}</span><div><small>{index === 0 ? "READY" : "LOCKED BY PREREQUISITE"}</small><h3>{title}</h3><p>{copy}</p></div>{index === 0 ? <Link className="btn btn-secondary" href="/app/practice/metrics-lab">Open sample mission</Link> : <b>—</b>}</article>)}</section></div></AppShell>;
}
