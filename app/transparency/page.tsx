import Link from "next/link";

export default function TransparencyPage() {
  return (
    <main>
      <h1>Transparency and Consent</h1>

      <p>
        This page explains what behavioural signals the system uses, why they
        are used, and how users can control or opt out of personalisation.
      </p>

      <h2>Key Principles</h2>

      <ul>
        <li>Informed consent</li>
        <li>Explainable personalisation</li>
        <li>User control</li>
        <li>No punishment for disengagement</li>
        <li>No fear based messaging</li>
      </ul>

      <Link href="/">Back to Home</Link>
    </main>
  );
}