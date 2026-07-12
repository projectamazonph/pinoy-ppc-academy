import Link from "next/link";
import { Brand } from "@/components/brand/Brand";
export default function SigninPage(){return <main className="simple-page"><section><Brand/><p className="eyebrow">Student sign in</p><h1>Continue your learning route.</h1><p>The frontend alpha uses a demo entry while secure authentication is built and tested.</p><form><label>Email<input type="email" placeholder="you@example.com"/></label><label>Password<input type="password"/></label><Link className="btn btn-primary" href="/app">Enter learner demo</Link></form></section></main>}
