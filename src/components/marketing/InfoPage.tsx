import Link from "next/link";
import { Brand } from "@/components/brand/Brand";
export function InfoPage({title,intro,sections}:{title:string;intro:string;sections:Array<[string,string]>}){return <main className="info-page"><header><Brand/><Link className="text-link" href="/">Back home</Link></header><article><h1>{title}</h1><p>{intro}</p>{sections.map(([heading,body])=><section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}</article></main>}
