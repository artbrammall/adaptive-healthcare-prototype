import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Adaptive Preventative Healthcare Prototype</h1>

      <p>
        This prototype shows how healthcare communication could adapt to a
        person&apos;s motivational readiness instead of sending everyone the
        same reminders.
      </p>

      <h2>Example Users</h2>

      <ul>
        <li>
          <Link href="/profile">Sarah Chen — Ambivalent</Link>
        </li>
        <li>Michael Tran — Disengaged</li>
        <li>Emma Patel — Action Ready</li>
      </ul>

      <Link href="/transparency">
        Transparency and Consent
      </Link>
    </main>
  );
}