"use client";

import Link from "next/link";
import { useState } from "react";

type ReadinessState = "Disengaged" | "Ambivalent" | "Action Ready";

type SimulationAction =
    | "Ignore Reminder"
    | "Open Health Article"
    | "Start Booking"
    | "Abandon Booking"
    | "Complete Daily Tracking"
    | "Book Appointment";

type TimelineEvent = {
    label: string;
    impact: number;
    time: string;
    score: number;
    readiness: ReadinessState;
};

const simulatorButtons: SimulationAction[] = [
    "Ignore Reminder",
    "Open Health Article",
    "Start Booking",
    "Abandon Booking",
    "Complete Daily Tracking",
    "Book Appointment",
];

const actionEffects: Record<SimulationAction, number> = {
    "Ignore Reminder": -10,
    "Open Health Article": 8,
    "Start Booking": 12,
    "Abandon Booking": -15,
    "Complete Daily Tracking": 10,
    "Book Appointment": 20,
};

function getReadinessState(score: number): ReadinessState {
    if (score <= 35) return "Disengaged";
    if (score <= 70) return "Ambivalent";
    return "Action Ready";
}

function getConfidence(state: ReadinessState) {
    if (state === "Disengaged") return 68;
    if (state === "Ambivalent") return 72;
    return 84;
}

function getStrategy(state: ReadinessState) {
    if (state === "Disengaged") {
        return {
            tone: "Calm and low pressure",
            message: "No pressure. Small steps are completely okay.",
            explanation:
                "Recent behaviour suggests lower engagement, so the system reduces urgency and uses supportive messaging.",
        };
    }

    if (state === "Ambivalent") {
        return {
            tone: "Reflective and supportive",
            message: "What would make this easier right now?",
            explanation:
                "Recent engagement suggests interest, but some hesitation remains. The system uses reflective prompts instead of pressure.",
        };
    }

    return {
        tone: "Direct and action focused",
        message: "Appointments are available tomorrow afternoon.",
        explanation:
            "Recent behaviour suggests readiness to act, so the system reduces friction and offers clear next steps.",
    };
}

export default function ProfilePage() {
    const [score, setScore] = useState(55);
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
        {
            label: "Started Booking",
            impact: 12,
            time: "2 days ago",
            score: 55,
            readiness: "Ambivalent",
        },
    ]);

    const readinessState = getReadinessState(score);
    const confidence = getConfidence(readinessState);
    const strategy = getStrategy(readinessState);

    function handleSimulation(action: SimulationAction) {
        const nextScore = Math.max(
            0,
            Math.min(100, score + actionEffects[action])
        );

        setScore(nextScore);

        setTimelineEvents((currentEvents) => [
            ...currentEvents,
            {
                label: action,
                impact: actionEffects[action],
                time: "Just now",
                score: nextScore,
                readiness: getReadinessState(nextScore),
            },
        ]);
    }

    return (
        <main className="h-screen overflow-hidden bg-sky-50 px-6 py-3 text-slate-900">
            <section className="mx-auto flex max-w-7xl flex-col">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                            Adaptive Health Profile
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

                <div className="mb-3 grid gap-3 md:grid-cols-4">
                    <div className="rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
                        <p className="text-xs text-slate-500">Current State</p>
                        <p className="mt-1 text-xl font-semibold text-sky-700">
                            {readinessState}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
                        <p className="text-xs text-slate-500">Readiness Score</p>
                        <p className="mt-1 text-xl font-semibold">{score}/100</p>
                    </div>

                    <div className="rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
                        <p className="text-xs text-slate-500">Confidence</p>
                        <p className="mt-1 text-xl font-semibold">{confidence}%</p>
                    </div>

                    <div className="rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
                        <p className="text-xs text-slate-500">Last Activity</p>
                        <p className="mt-1 text-sm font-semibold">
                            {timelineEvents[timelineEvents.length - 1].label}
                        </p>
                    </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[0.9fr_1.7fr_1fr]">
                    <aside className="rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
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
                                <p className="font-medium">{strategy.tone}</p>
                            </div>

                            <div>
                                <p className="text-slate-500">Active Signals</p>
                                <p className="font-medium">
                                    App opens, booking attempts, article engagement
                                </p>
                            </div>
                        </div>
                    </aside>

                    <section className="flex min-h-[470px] flex-col rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
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

                        <div className="relative h-[285px] shrink-0 overflow-hidden rounded-3xl border border-sky-100 bg-sky-50">
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

                            {timelineEvents.map((event, index) => {
                                const left = 10 + index * 12;
                                const bottom = Math.max(10, Math.min(72, event.score));

                                return (
                                    <div
                                        key={`${event.label}-${index}`}
                                        className="absolute"
                                        style={{
                                            left: `${left}%`,
                                            bottom: `${bottom}%`,
                                        }}
                                    >
                                        <div className="h-3 w-3 rounded-full border-2 border-white bg-sky-600 shadow-md" />

                                        <div className="mt-1 max-w-[90px] rounded-xl bg-white px-2 py-1 text-[10px] shadow-sm">
                                            {event.label}
                                        </div>
                                    </div>
                                );
                            })}

                            <p className="absolute bottom-3 right-4 text-[10px] text-slate-500">
                                Time →
                            </p>
                        </div>

                        <div className="mt-3 h-[92px] shrink-0 overflow-y-auto rounded-2xl border border-sky-100 bg-sky-50 p-2">
                            <div className="space-y-1">
                                {timelineEvents
                                    .slice()
                                    .reverse()
                                    .map((event, index) => (
                                        <div
                                            key={`${event.label}-${index}`}
                                            className={`flex items-center justify-between rounded-xl bg-white px-3 py-1.5 text-xs shadow-sm transition ${
                                                index === 0
                                                    ? "opacity-100"
                                                    : index === 1
                                                      ? "opacity-75"
                                                      : index === 2
                                                        ? "opacity-55"
                                                        : "opacity-40"
                                            }`}
                                        >
                                            <div className="flex min-w-0 items-center gap-2">
                                                <span
                                                    className={
                                                        event.impact >= 0
                                                            ? "h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                                                            : "h-2 w-2 shrink-0 rounded-full bg-rose-500"
                                                    }
                                                />

                                                <span className="truncate font-semibold text-slate-800">
                                                    {event.label}
                                                </span>
                                            </div>

                                            <div className="ml-3 flex shrink-0 items-center gap-3 text-[10px] text-slate-500">
                                                <span>{event.time}</span>

                                                <span
                                                    className={
                                                        event.impact >= 0
                                                            ? "font-semibold text-emerald-700"
                                                            : "font-semibold text-rose-700"
                                                    }
                                                >
                                                    {event.impact >= 0 ? "+" : ""}
                                                    {event.impact}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="mt-3 grid shrink-0 gap-2 md:grid-cols-3">
                            {simulatorButtons.map((button) => (
                                <button
                                    key={button}
                                    onClick={() => handleSimulation(button)}
                                    className="rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
                                >
                                    {button}
                                </button>
                            ))}
                        </div>
                    </section>

                    <aside className="grid h-full grid-rows-[1fr_1fr_1fr] gap-3 overflow-hidden">
                        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
                            <h2 className="mb-2 text-lg font-semibold">
                                Communication Strategy
                            </h2>

                            <p className="mb-2 text-xs font-medium text-sky-700">
                                {strategy.tone}
                            </p>

                            <p className="text-sm leading-5 text-slate-600">
                                “{strategy.message}”
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
                            <h2 className="mb-2 text-lg font-semibold">Explainability</h2>

                            <p className="text-xs leading-5 text-slate-600">
                                {strategy.explanation}
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-3 shadow-sm">
                            <h2 className="mb-2 text-lg font-semibold">Consent Controls</h2>

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
                                    <span className="font-medium text-slate-500">Available</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}