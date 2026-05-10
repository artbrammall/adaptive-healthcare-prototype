import Link from "next/link";

export default function ProfilePage() {
  return (
    <main>
      <h1>Sarah Chen</h1>

      <p>Current State: Ambivalent</p>
      <p>Confidence: 72%</p>
      <p>Last Activity: Started appointment booking 2 days ago</p>

      <h2>User Profile Dashboard</h2>
      <p>This page will later contain the timeline, simulator controls, and communication strategy panel.</p>

      <Link href="/">Back to Home</Link>
    </main>
  );
}