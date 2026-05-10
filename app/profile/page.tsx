import Link from "next/link";

const timelineEvents = [
  {
    label: "Ignored Reminder",
    position: "bottom-[18%] left-[10%]",
    faded: true,
  },
  {
    label: "Opened Article",
    position: "bottom-[46%] left-[35%]",
    faded: false,
  },
  {
    label: "Started Booking",
    position: "bottom-[56%] left-[60%]",
    faded: false,
  },
  {
    label: "Paused Booking",
    position: "bottom-[50%] left-[84%]",
    faded: false,
  },
];

export default function ProfilePage() {
  return (
    <main className="h-screen overflow-hidden bg-sky-50 px-6 py-4 text-slate-900">
      <section className="mx-auto flex h-full max-w-7xl flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              1 vs 5
            </p>

            <h1 className="text-3xl font-bold">Sarah Chen</h1>

            <p className="text-sm text-slate-600">
              Adaptive preventative healthcare profile
            </p>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm hover:bg-sky-50"
          >
            Back to Home
          </Link>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Current State</p>
            <p className="mt-1 text-xl font-semibold text-sky-700">
              Ambivalent
            </p>
          </div>

          <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Confidence</p>
            <p className="mt-1 text-xl font-semibold">72%</p>
          </div>

          <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Last Activity</p>
            <p className="mt-1 text-sm font-semibold">
              Started booking 2 days ago
            </p>
          </div>
        </div>

        <div className="grid flex-1 gap-4 overflow-hidden lg:grid-cols-[0.9fr_1.7fr_1fr]">
          <aside className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">User Context</h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Age Range</p>
                <p className="font-medium">35 to 44</p>
              </div>

              <div>
                <p className="text-slate-500">Lifestyle</p>
                <p className="font-medium">
                  Busy schedule, inconsistent checkups
                </p>
              </div>

              <div>
                <p className="text-slate-500">Notification Style</p>
                <p className="font-medium">Low pressure reminders</p>
              </div>

              <div>
                <p className="text-slate-500">Active Signals</p>
                <p className="font-medium">
                  App opens, booking attempts, article engagement
                </p>
              </div>
            </div>
          </aside>

          <section className="flex flex-col rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Motivational Readiness Timeline
                </h2>

                <p className="text-xs text-slate-500">
                  Time vs behavioural readiness
                </p>
              </div>

              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                Live simulation
              </span>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-3xl border border-sky-100 bg-sky-50">
              <div className="absolute inset-x-3 top-3 h-[28%] rounded-2xl bg-white/70" />
              <div className="absolute inset-x-3 top-[36%] h-[28%] rounded-2xl bg-white/50" />
              <div className="absolute inset-x-3 bottom-3 h-[28%] rounded-2xl bg-white/40" />

              <div className="absolute left-4 top-5 text-[10px] font-semibold text-slate-500">
                Action Ready
              </div>

              <div className="absolute left-4 top-[46%] text-[10px] font-semibold text-slate-500">
                Ambivalent
              </div>

              <div className="absolute bottom-5 left-4 text-[10px] font-semibold text-slate-500">
                Disengaged
              </div>

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M 10 78 C 22 62, 35 55, 45 52 S 65 40, 74 45 S 86 48, 90 46"
                  fill="none"
                  stroke="rgb(2 132 199)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>

              {timelineEvents.map((event) => (
                <div
                  key={event.label}
                  className={`absolute ${event.position} ${
                    event.faded ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-sky-600 shadow-md" />

                  <div className="mt-1 rounded-xl bg-white px-2 py-1 text-[10px] shadow-sm">
                    {event.label}
                  </div>
                </div>
              ))}

              <p className="absolute bottom-3 right-4 text-[10px] text-slate-500">
                Time →
              </p>
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {[
                "Ignore Reminder",
                "Open Article",
                "Start Booking",
                "Abandon Booking",
                "Daily Tracking",
                "Book Appointment",
              ].map((button) => (
                <button
                  key={button}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
                >
                  {button}
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold">
                Communication Strategy
              </h2>

              <p className="mb-2 text-xs font-medium text-sky-700">
                Reflective and supportive
              </p>

              <p className="text-sm leading-5 text-slate-600">
                “What would make this easier right now?”
              </p>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold">Explainability</h2>

              <p className="text-xs leading-5 text-slate-600">
                Recent booking hesitation and content engagement suggest
                uncertainty rather than full disengagement.
              </p>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold">
                Consent Controls
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-sky-50 p-2">
                  <span>Personalisation</span>
                  <span className="font-medium text-sky-700">On</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-sky-50 p-2">
                  <span>Behaviour Signals</span>
                  <span className="font-medium text-sky-700">On</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-sky-50 p-2">
                  <span>User Override</span>
                  <span className="font-medium text-slate-500">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}