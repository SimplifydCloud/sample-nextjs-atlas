import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <p className="kicker">A LITTLE OFF THE MAP</p>
      <h1>
        Another adventure
        <br />
        is waiting.
      </h1>
      <p>We couldn’t find that city.</p>
      <Link className="cta" href="/">
        Back to the collection ↗
      </Link>
    </main>
  );
}
