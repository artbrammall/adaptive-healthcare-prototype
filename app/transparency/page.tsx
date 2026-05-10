import Link from "next/link";

const users = [
  {
    name: "Sarah Chen",
    state: "Ambivalent",
    description: "Starts health actions but often hesitates before following through.",
    href: "/profile",
  },
  {
    name: "Michael Tran",
    state: "Disengaged",
    description: "Low recent engagement and often ignores preventative care reminders.",
    href: "#",
  },
  {
    name: "Emma Patel",
    state: "Action Ready",
    description: "Actively engages with health tools and is ready to take action.",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-8 py-12 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Adaptive Preventative Healthcare
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight">
          Personalised health communication based on motivational readiness
        </h1>

        <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-700">
          This prototype demonstrates how preventative healthcare communication
          could adapt to a person&apos;s behavioural signals, instead of assuming
          every user is equally ready to act.
        </p>

        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Core idea</h2>
          <p className="text-slate-700">
            The same healthcare issue should not be communicated identically to
            every individual. Motivation changes, so the system response should
            change too.
          </p>
        </div>

        <h2 className="mb-4 text-2xl font-semibold">Example users</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {users.map((user) => (
            <Link
              key={user.name}
              href={user.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="mb-2 text-xl font-semibold">{user.name}</h3>

              <p className="mb-4 text-sm font-medium text-blue-700">
                {user.state}
              </p>

              <p className="text-sm leading-6 text-slate-600">
                {user.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/transparency"
            className="inline-block rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
          >
            View transparency and consent
          </Link>
        </div>
      </section>
    </main>
  );
}