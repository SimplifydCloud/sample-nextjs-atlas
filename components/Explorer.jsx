"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cities, regions } from "../lib/cities";
export default function Explorer() {
  const [region, setRegion] = useState("Everywhere");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("atlas.saved.v1"));
      if (Array.isArray(s))
        setSaved(s.filter((x) => cities.some((c) => c.slug === x)));
    } catch {}
  }, []);
  function toggle(slug) {
    const next = saved.includes(slug)
      ? saved.filter((x) => x !== slug)
      : [...saved, slug];
    setSaved(next);
    try {
      localStorage.setItem("atlas.saved.v1", JSON.stringify(next));
      setNotice("Your shortlist is saved in this browser.");
    } catch {
      setNotice(
        "Storage unavailable. Your shortlist lasts until this tab closes.",
      );
    }
  }
  const visible = cities.filter(
    (c) =>
      (region === "Everywhere" || c.region === region) &&
      `${c.name} ${c.country}`.toLowerCase().includes(query.toLowerCase()) &&
      (!onlySaved || saved.includes(c.slug)),
  );
  return (
    <>
      <nav className="topbar">
        <Link className="logo" href="/">
          atlas<span>✳</span>
        </Link>
        <a className="nav-link" href="#explore">
          The collection
        </a>
        <button
          className={"shortlist " + (onlySaved ? "active" : "")}
          aria-pressed={onlySaved}
          onClick={() => {
            setOnlySaved(!onlySaved);
            document
              .getElementById("explore")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Your shortlist <span>{saved.length}</span>
        </button>
      </nav>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">LESS PLANNING. MORE POSSIBILITY.</p>
            <h1>
              A weekend
              <br />
              somewhere <em>new.</em>
            </h1>
            <p>
              Follow your curiosity across Africa.
              <br />
              Find a city, make a little plan, go make a memory.
            </p>
            <a className="cta" href="#explore">
              Find your next adventure <span>↘</span>
            </a>
            <div className="hero-note">
              <span>✦</span> Six cities. No ordinary weekends.
            </div>
          </div>
          <div className="hero-art">
            <img
              src="/cities/cape-town.svg"
              alt="Illustrated mountain, city buildings, and ocean in Cape Town"
            />
            <span className="stamp">
              POSTCARDS
              <br />
              FROM
              <br />
              <b>AFRICA</b>
            </span>
            <div className="art-caption">
              <span>01 / A CHANGE OF SCENERY</span>
              <strong>The world is still full of firsts.</strong>
            </div>
          </div>
        </section>
        <section id="explore" className="collection">
          <div className="section-head">
            <div>
              <p className="kicker">THE WEEKEND COLLECTION</p>
              <h2>Where will curiosity take you?</h2>
            </div>
            <p>One continent. So many ways to feel alive.</p>
          </div>
          <div className="filterbar">
            <div className="region-tabs" role="group" aria-label="Region">
              {regions.map((r) => (
                <button
                  key={r}
                  aria-pressed={region === r}
                  className={region === r ? "selected" : ""}
                  onClick={() => setRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <input
              type="search"
              aria-label="Search cities"
              placeholder="Find a city or country"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <p role="status" className="result-count">
            {visible.length} {visible.length === 1 ? "city" : "cities"} to
            explore{onlySaved ? " in your shortlist" : ""}. {notice}
          </p>
          <div className="city-grid">
            {visible.map((c) => (
              <article className="city-card" key={c.slug}>
                <div className="city-image" style={{ background: c.color }}>
                  <Link
                    href={`/cities/${c.slug}/`}
                    aria-label={`Explore ${c.name}`}
                  >
                    <img
                      src={`/cities/${c.slug}.svg`}
                      alt={`Original illustration of ${c.name}`}
                    />
                  </Link>
                  <span className="city-tag">{c.tag}</span>
                  <button
                    aria-label={`${saved.includes(c.slug) ? "Unsave" : "Save"} ${c.name}`}
                    aria-pressed={saved.includes(c.slug)}
                    onClick={() => toggle(c.slug)}
                    className="save"
                  >
                    {saved.includes(c.slug) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="city-meta">
                  <span>
                    {c.country} <b>·</b> {c.region}
                  </span>
                  <span>{c.code}</span>
                </div>
                <div className="city-title">
                  <h3>
                    <Link href={`/cities/${c.slug}/`}>{c.name}</Link>
                  </h3>
                  <Link
                    className="arrow"
                    href={`/cities/${c.slug}/`}
                    aria-label={`Plan a weekend in ${c.name}`}
                  >
                    ↗
                  </Link>
                </div>
                <p>{c.line}</p>
                <div className="city-bottom">
                  A day of possibilities{" "}
                  <span>
                    from ${c.budget} <small>demo USD</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
          {!visible.length && (
            <div className="no-results">
              <h3>No cities in this corner yet.</h3>
              <p>Try another region, search, or shortlist filter.</p>
              <button
                onClick={() => {
                  setRegion("Everywhere");
                  setQuery("");
                  setOnlySaved(false);
                }}
              >
                Explore all cities
              </button>
            </div>
          )}
        </section>
        <section className="closing">
          <span>✳</span>
          <h2>
            The best stories start with
            <br />
            <em>“let’s go somewhere.”</em>
          </h2>
          <p>Make this little corner of the internet your own.</p>
          <a href="https://github.com/SimplifydCloud/sample-nextjs-atlas">
            Get the Next.js template ↗
          </a>
        </section>
      </main>
      <footer>
        <Link className="logo" href="/">
          atlas<span>✳</span>
        </Link>
        <p>
          A Next.js sample by Simplifyd Cloud.
          <br />
          Fictional activities and illustrative budgets for demo purposes.
        </p>
        <a href="https://github.com/SimplifydCloud/sample-nextjs-atlas">
          View source ↗
        </a>
      </footer>
    </>
  );
}
