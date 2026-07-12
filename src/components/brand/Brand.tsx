import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? "brand-inverse" : ""}`} href="/" aria-label="Pinoy PPC Academy home">
      <span className="brand-icon" aria-hidden="true"><i>P</i><i>P</i><i>C</i></span>
      <span className="brand-name"><strong>Pinoy PPC</strong><small>Academy</small></span>
    </Link>
  );
}
