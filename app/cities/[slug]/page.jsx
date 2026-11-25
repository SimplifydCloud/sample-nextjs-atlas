import { notFound } from "next/navigation";
import Link from "next/link";
import { cities } from "../../../lib/cities";
import Itinerary from "../../../components/Itinerary";
export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = cities.find((c) => c.slug === slug);
  return { title: c ? `${c.name} — Atlas` : "City not found — Atlas" };
}
export default async function CityPage({ params }) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);
  if (!city) notFound();
  return (
    <>
      <nav className="topbar">
        <Link className="logo" href="/">
          atlas<span>✳</span>
        </Link>
        <Link className="back" href="/">
          ← Back to the collection
        </Link>
      </nav>
      <main className="detail">
        <div className="detail-heading">
          <div>
            <p className="kicker">
              {city.country.toUpperCase()} / {city.region.toUpperCase()}
            </p>
            <h1>
              Hello,
              <br />
              <em>{city.name}.</em>
            </h1>
            <p>{city.line}</p>
          </div>
          <img
            src={`/cities/${city.slug}.svg`}
            alt={`Original illustration of ${city.name}`}
          />
        </div>
        <Itinerary city={city} />
      </main>
      <footer>
        <Link href="/">← Explore another city</Link>
        <p>
          Fictional activities and demo USD estimates.
          <br />
          No bookings or payments are made.
        </p>
      </footer>
    </>
  );
}
