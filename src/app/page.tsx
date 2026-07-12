import Link from "next/link";
import { AudienceSelector } from "@/components/marketing/AudienceSelector";
import { Faq } from "@/components/marketing/Faq";
import { Header } from "@/components/marketing/Header";
import { ProductPreview } from "@/components/marketing/ProductPreview";
import { learningPath, practiceTools, tiers } from "@/data/content";

const diagnostics = ["Tracking and date range", "Inventory and Buy Box", "Price, offer, reviews, and listing", "Traffic quality", "Campaign structure", "Bids, placements, and budgets", "Search terms and targets"];
const proof = ["Campaign architecture sample", "Search-term analysis", "Listing-readiness audit", "Bid and budget recommendation", "Client performance summary", "Timed capstone result", "Public certificate verification page"];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Amazon PPC training for Filipinos starting or shifting into VA work</p>
              <h1>Start your VA career with proof you can do the work.</h1>
              <p className="hero-lead">Learn Amazon from the beginning, practice PPC in realistic simulators, and build scored work samples before you apply for a role or speak to a client.</p>
              <div className="hero-actions"><Link className="btn btn-primary btn-large" href="/signup?path=va-career-starter">Start the free VA Career Starter <span aria-hidden="true">→</span></Link><Link className="text-link" href="#path">See the full learning path</Link></div>
              <p className="trust-copy">No Amazon account required. No AI-generated lessons. Built for beginners.</p>
            </div>
            <ProductPreview />
          </div>
        </section>

        <div className="commitments"><div className="shell">{["Beginner-first route", "Practice before access", "Deterministic scoring", "Honest proof of skill"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div></div>

        <section className="section" id="starting-point"><div className="shell"><div className="section-head"><div><p className="eyebrow">Route selector</p><h2>Choose your starting point.</h2></div><p>You do not need to pretend you already understand Amazon. Start where you are and close the right gaps.</p></div><AudienceSelector /></div></section>

        <section className="section dark" id="path"><div className="shell"><div className="section-head light-head"><div><p className="eyebrow light">Training sequence</p><h2>From first lesson to client-ready proof.</h2></div><p>Each stage ends with something observable you can do, not a vague promise that you feel ready.</p></div><ol className="path-grid">{learningPath.map(([number, title, outcome, access]) => <li key={number}><div><span>{number}</span><small>{access}</small></div><h3>{title}</h3><p>{outcome}</p></li>)}</ol></div></section>

        <section className="section" id="practice"><div className="shell"><div className="section-head"><div><p className="eyebrow">Practice lab</p><h2>Practice without risking a client account.</h2></div><p>The labs teach the clicks, decisions, checks, and explanations clients expect. Every score points to a written rule.</p></div><div className="tool-list">{practiceTools.map(([code, title, task], index) => <article key={code}><span className="tool-number">{String(index + 1).padStart(2, "0")}</span><div><small>{code}</small><h3>{title}</h3></div><p>{task}</p><Link href={index === 0 ? "/app/practice/metrics-lab" : index === 1 ? "/app/practice/search-term-triage" : "/app"}>{index < 2 ? "Open lab" : "View roadmap"} ↗</Link></article>)}</div></div></section>

        <section className="section diagnostic"><div className="shell diagnostic-grid"><div><p className="eyebrow orange">Core diagnostic method</p><h2>Learn when PPC is not the real problem.</h2><p>Strong operators check the business conditions that make advertising succeed or fail before spending a client&apos;s budget.</p><aside><small>RULE 01</small><strong>Do not optimize an advertising problem you have not proven exists.</strong></aside></div><ol>{diagnostics.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></div></section>

        <section className="section proof"><div className="shell proof-grid"><div><p className="eyebrow">Portfolio evidence</p><h2>Finish with work you can show.</h2><p>These are clearly labeled training simulations, not fabricated client work. Each item keeps the brief, submission, score, and grading rule together.</p></div><ul>{proof.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><small>TRAINING EVIDENCE</small></li>)}</ul></div></section>

        <section className="section founder"><div className="shell founder-grid"><div className="founder-card"><span>BUILT FOR</span><strong>PINOY<br />OPERATORS</strong><small>PROJECTAMAZON.PH / 2026</small></div><div><p className="eyebrow light">Built by Ryan Dabao</p><h2>Built from the work, not from a generic course template.</h2><p>Ryan has worked remotely since 2009 and has spent more than six years focused on Amazon PPC. He built Pinoy PPC Academy for Filipinos who need a clear first step, realistic practice, and honest proof of skill before a client gives them account access.</p><small className="claim-note">No invented learner counts, ad-spend claims, or income outcomes.</small></div></div></section>

        <section className="section" id="curriculum"><div className="shell"><div className="section-head"><div><p className="eyebrow">Curriculum preview</p><h2>Start free. Specialize when the foundation is solid.</h2></div><p>The complete documentation defines twenty modules, mastery gates, remediation, and capstone rules.</p></div><div className="curriculum-list">{[
          ["VA Career Starter", "Free", "4 modules · 3 missions", "Remote work, communication, Amazon roles, career assessment"],
          ["Amazon + PPC Foundations", "₱2,999", "8 modules · 12 missions", "Marketplace, listings, metrics, diagnostics, SP operations"],
          ["Operator + Strategist", "₱5,999", "14 modules · 28 missions", "SP, SB, SD, research, structure, bids, budgets, audits, reporting"],
          ["Client-Ready Specialist", "₱9,999", "Full route + review", "Trial tasks, portfolio, interviews, first 30 days, live support"],
        ].map(([title, price, scope, body], index) => <details key={title} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{scope}</small><b>{price}</b><i>+</i></summary><p>{body}</p></details>)}</div></div></section>

        <section className="section pricing" id="pricing"><div className="shell"><div className="section-head"><div><p className="eyebrow">Straightforward pricing</p><h2>Choose the training and review you need.</h2></div><p>One-time Philippine peso pricing. No countdown timer, fake discount, or surprise renewal.</p></div><div className="pricing-grid">{tiers.map((tier) => <article key={tier.slug} data-featured={tier.featured || undefined}><span>{tier.featured ? "RECOMMENDED" : "TRACK"}</span><h3>{tier.name}</h3><strong>{tier.price}</strong><small>{tier.note}</small><ul>{tier.features.map((item) => <li key={item}>{item}</li>)}</ul><Link className={`btn ${tier.featured ? "btn-primary" : "btn-secondary"}`} href={`/signup?tier=${tier.slug}`}>{tier.price === "Free" ? "Start free" : `Choose ${tier.name}`}</Link></article>)}</div><p className="pricing-note">Training and certificates improve preparation but do not promise employment, clients, or a specific income.</p></div></section>

        <section className="section"><div className="shell faq-grid"><div><p className="eyebrow">Before you enroll</p><h2>Questions beginners ask before spending money.</h2><p>Clear answers now are better than support tickets and regret later.</p></div><Faq /></div></section>

        <section className="final-cta"><div className="shell"><div><p className="eyebrow light">Free first route</p><h2>Start with the part most courses skip.</h2><p>Learn what VA work requires, understand how Amazon works, and complete your first PPC practice mission before deciding whether to enroll.</p></div><Link className="btn btn-primary btn-large" href="/signup?path=va-career-starter">Start free →</Link></div></section>
      </main>
      <footer><div className="shell footer-grid"><div><strong>Pinoy PPC Academy</strong><p>Career-first Amazon advertising training for Filipino virtual assistants.</p><small>© 2026 ProjectAmazon.PH</small></div><div><span>PLATFORM</span><Link href="#curriculum">Curriculum</Link><Link href="#practice">Practice tools</Link><Link href="#pricing">Pricing</Link><Link href="/app">Learner demo</Link></div><div><span>INFORMATION</span><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refunds</Link><Link href="/accessibility">Accessibility</Link></div><div><span>PROJECT</span><a href="https://github.com/projectamazonph/pinoy-ppc-academy">GitHub repository</a><a href="mailto:projectamazonph@gmail.com">projectamazonph@gmail.com</a></div></div></footer>
    </>
  );
}
