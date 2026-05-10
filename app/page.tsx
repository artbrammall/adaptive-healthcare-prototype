import Link from "next/link";

const users = [
  {
    name: "Sarah Chen",
    state: "Ambivalent",
    description:
      "Starts preventative health actions but often hesitates before following through.",
    href: "/profile",
  },
  {
    name: "Michael Tran",
    state: "Disengaged",
    description:
      "Low recent engagement and inconsistent responses to healthcare reminders.",
    href: "#",
  },
  {
    name: "Emma Patel",
    state: "Action Ready",
    description:
      "Actively engages with health tools and follows through on preventative care.",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-50 px-8 py-6 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          1 vs 5
        </p>

        <h1 className="mb-4 max-w-4xl text-5xl font-bold tracking-tight text-slate-900">
          Adaptive Preventative Healthcare
        </h1>

        <p className="mb-6 max-w-3xl text-lg leading-7 text-slate-700">
          An interactive prototype exploring how preventative healthcare
          communication could adapt dynamically to a person’s motivational
          readiness, rather than assuming all individuals respond to healthcare
          messaging in the same way.
        </p>

        <div className="mb-6 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Core Concept
          </h2>

          <p className="leading-7 text-slate-700">
            Behavioural engagement changes over time. This prototype demonstrates
            how communication strategies, interface tone, and intervention style
            could adapt in response to changing motivational readiness and
            behavioural context.
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            Example Users
          </h2>

          <p className="text-sm text-slate-500">
            Interactive behavioural simulation
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {users.map((user) => (
            <Link
              key={user.name}
              href={user.href}
              className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-slate-900">
                  {user.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-sky-700">
                  {user.state}
                </p>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {user.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/transparency"
            className="inline-flex items-center rounded-2xl bg-sky-700 px-6 py-3 font-medium text-white transition hover:bg-sky-800"
          >
            Transparency and Consent
          </Link>
        </div>
      </section>
    </main>
  );
}