"use client";
import { useEffect, useState } from "react";
export default function Itinerary({ city }) {
  const key = `atlas.plan.${city.slug}.v1`;
  const [selected, setSelected] = useState(city.places.map((_, i) => i));
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(key));
      if (Array.isArray(s))
        setSelected([
          ...new Set(
            s.filter(
              (x) => Number.isInteger(x) && x >= 0 && x < city.places.length,
            ),
          ),
        ]);
    } catch {}
  }, [key, city.places.length]);
  function toggle(i) {
    const next = selected.includes(i)
      ? selected.filter((x) => x !== i)
      : [...selected, i];
    setSelected(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setMessage("Plan saved in this browser.");
    } catch {
      setMessage("Storage unavailable. Changes last until this tab closes.");
    }
  }
  const total = selected.reduce((sum, i) => sum + city.places[i][3], 0);
  function download() {
    const text =
      `A day in ${city.name} — Atlas
Fictional demo itinerary

` +
      city.places
        .filter((_, i) => selected.includes(i))
        .map((p) => `${p[0]} ${p[1]} — $${p[3]}`)
        .join("\n") +
      `

Estimated demo budget: $${total} USD`;
    const u = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = u;
    a.download = `atlas-${city.slug}.txt`;
    a.click();
    URL.revokeObjectURL(u);
    setMessage("Itinerary downloaded.");
  }
  return (
    <section className="itinerary">
      <div>
        <p className="kicker">YOUR DAY, YOUR WAY</p>
        <h2>
          A little plan.
          <br />
          Room for surprises.
        </h2>
        <p>Pick the moments you want to make time for.</p>
        <div className="budget">
          <span>Estimated day budget</span>
          <strong data-testid="budget">
            ${total}
            <small> demo USD</small>
          </strong>
          <p>
            {selected.length} of {city.places.length} moments selected
          </p>
          <button
            className="cta"
            disabled={!selected.length}
            onClick={download}
          >
            Download your day ↓
          </button>
          <p role="status">{message}</p>
        </div>
      </div>
      <div className="moments">
        {city.places.map((p, i) => (
          <label
            className={"moment " + (selected.includes(i) ? "chosen" : "")}
            key={p[0]}
          >
            <input
              type="checkbox"
              checked={selected.includes(i)}
              onChange={() => toggle(i)}
            />
            <time>{p[0]}</time>
            <div>
              <span className="kicker">{p[2]}</span>
              <h3>{p[1]}</h3>
            </div>
            <strong>${p[3]}</strong>
          </label>
        ))}
      </div>
    </section>
  );
}
