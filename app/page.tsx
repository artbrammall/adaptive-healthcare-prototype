"use client";

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
    id: number;
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

function getNotificationImage(state: ReadinessState) {
    if (state === "Disengaged") return "/notifications/disengaged.png";
    if (state === "Ambivalent") return "/notifications/ambivalent.png";
    return "/notifications/action-ready.png";
}

function getConfidence(score: number) {
    const clampedScore = Math.max(0, Math.min(100, score));

    let distanceFromBorder = 0;
    let maximumDistance = 1;

    if (clampedScore <= 35) {
        distanceFromBorder = 35 - clampedScore;
        maximumDistance = 35;
    } else if (clampedScore <= 70) {
        distanceFromBorder = Math.min(clampedScore - 35, 70 - clampedScore);
        maximumDistance = 17.5;
    } else {
        distanceFromBorder = clampedScore - 70;
        maximumDistance = 30;
    }

    const confidence = 55 + (distanceFromBorder / maximumDistance) * 40;

    return Math.round(Math.max(55, Math.min(95, confidence)));
}

function getStrategy(state: ReadinessState) {
    if (state === "Disengaged") {
        return {
            tone: "Supportive, calm, low pressure",
            message: "No pressure. A small first step is enough for now.",
            explanation:
                "The system is detecting lower recent engagement, including missed or ignored actions. Rather than increasing pressure, it shifts to calm support designed to rebuild trust and reduce avoidance.",
        };
    }

    if (state === "Ambivalent") {
        return {
            tone: "Reflective, exploratory, autonomy supportive",
            message: "What would make this easier to follow through with right now?",
            explanation:
                "The system is detecting mixed signals. Sarah is showing interest, but her behaviour suggests hesitation before committing. The strategy is to support reflection rather than push for immediate action.",
        };
    }

    return {
        tone: "Clear, direct, action focused",
        message: "“Appointments available tomorrow afternoon. Would you like to book one?",
        explanation:
            "The system is detecting strong follow through signals, such as booking activity or consistent engagement. The strategy now reduces friction and gives Sarah clear next steps while motivation is high.",
    };
}

function getAdaptiveTheme(state: ReadinessState) {
    if (state === "Disengaged") {
        return {
            page: "bg-[#eaf4fb]",
            panel: "border-[#bddced] bg-white",
            softPanel: "bg-[#dcecf5]",
            accent: "text-[#004f82]",
            badge: "bg-[#cfe5f1] text-[#004f82]",
            dot: "bg-[#004f82]",
            graph: "bg-[#e1f0f8]",
            negativeText: "text-[#46515c]",
            negativeDot: "bg-[#46515c]",
            negativeGraphLabel: "border-[#9aa6b2] bg-[#f1f3f5] text-[#46515c]",
            buttonBase:
                "border-[#8fc5df] bg-[#cfe7f3] text-[#004f82] hover:border-[#5ca8d0] hover:bg-[#bfdeee]",
            buttonPositive:
                "border-[#8fc5df] bg-[#cfe7f3] text-[#004f82] hover:border-[#5ca8d0] hover:bg-[#bfdeee]",
            buttonNegative:
                "border-[#8c97a3] bg-[#e3e7eb] text-[#3f4954] hover:border-[#66727f] hover:bg-[#d3d9df]",
            buttonPrimary:
                "border-[#004f82] bg-[#004f82] text-white shadow-md hover:bg-[#003f68]",
        };
    }

    if (state === "Ambivalent") {
        return {
            page: "bg-[#eef8fd]",
            panel: "border-[#b9e0f3] bg-white",
            softPanel: "bg-[#e1f2fa]",
            accent: "text-[#0079c8]",
            badge: "bg-[#d7edf8] text-[#0079c8]",
            dot: "bg-[#0079c8]",
            graph: "bg-[#e8f5fb]",
            negativeText: "text-[#525d68]",
            negativeDot: "bg-[#525d68]",
            negativeGraphLabel: "border-[#a5b0bb] bg-[#f2f4f6] text-[#525d68]",
            buttonBase:
                "border-[#8fcff0] bg-[#d7edf8] text-[#0069ad] hover:border-[#57b4e5] hover:bg-[#c3e5f5]",
            buttonPositive:
                "border-[#8fcff0] bg-[#d7edf8] text-[#0069ad] hover:border-[#57b4e5] hover:bg-[#c3e5f5]",
            buttonNegative:
                "border-[#9ba6b2] bg-[#e7eaee] text-[#4b5561] hover:border-[#707b88] hover:bg-[#d8dde3]",
            buttonPrimary:
                "border-[#0079c8] bg-[#0079c8] text-white shadow-md hover:bg-[#0069ad]",
        };
    }

    return {
        page: "bg-[#effbff]",
        panel: "border-[#9edff7] bg-white",
        softPanel: "bg-[#d7f3fc]",
        accent: "text-[#009fe3]",
        badge: "bg-[#c8eefb] text-[#007eb8]",
        dot: "bg-[#009fe3]",
        graph: "bg-[#def6fd]",
        negativeText: "text-[#5b6671]",
        negativeDot: "bg-[#5b6671]",
        negativeGraphLabel: "border-[#adb7c2] bg-[#f4f6f8] text-[#5b6671]",
        buttonBase:
            "border-[#6fd1f3] bg-[#c8eefb] text-[#007eb8] hover:border-[#39bdec] hover:bg-[#afe5f8]",
        buttonPositive:
            "border-[#6fd1f3] bg-[#c8eefb] text-[#007eb8] hover:border-[#39bdec] hover:bg-[#afe5f8]",
        buttonNegative:
            "border-[#a6b0bb] bg-[#eceff2] text-[#535e6a] hover:border-[#798491] hover:bg-[#dde2e7]",
        buttonPrimary:
            "border-[#009fe3] bg-[#009fe3] text-white shadow-md hover:bg-[#0086c2]",
    };
}

function getButtonStyle(
    action: SimulationAction,
    theme: ReturnType<typeof getAdaptiveTheme>
) {
    const effect = actionEffects[action];

    if (effect > 0) return theme.buttonPositive;
    if (effect < 0) return theme.buttonNegative;

    return theme.buttonBase;
}

function getTimelinePoint(event: TimelineEvent, index: number, total: number) {
    const left = total <= 1 ? 50 : 8 + (index / (total - 1)) * 84;
    const rawBottom = 8 + event.score * 0.84;
    const bottom = Math.max(12, Math.min(88, rawBottom));

    return {
        left,
        bottom,
    };
}

const initialTimelineEvents: TimelineEvent[] = [
    {
        id: 0,
        label: "Missed Checkup Reminder",
        impact: -8,
        time: "7 days ago",
        score: 42,
        readiness: "Ambivalent",
    },
    {
        id: 1,
        label: "Opened App",
        impact: 5,
        time: "6 days ago",
        score: 47,
        readiness: "Ambivalent",
    },
    {
        id: 2,
        label: "Ignored Follow Up",
        impact: -10,
        time: "5 days ago",
        score: 37,
        readiness: "Ambivalent",
    },
    {
        id: 3,
        label: "Viewed Health Article",
        impact: 8,
        time: "4 days ago",
        score: 45,
        readiness: "Ambivalent",
    },
    {
        id: 4,
        label: "Started Booking",
        impact: 12,
        time: "3 days ago",
        score: 57,
        readiness: "Ambivalent",
    },
    {
        id: 5,
        label: "Abandoned Booking",
        impact: -15,
        time: "2 days ago",
        score: 42,
        readiness: "Ambivalent",
    },
    {
        id: 6,
        label: "Reopened Booking",
        impact: 13,
        time: "Today",
        score: 55,
        readiness: "Ambivalent",
    },
];

export default function ProfilePage() {
    const [score, setScore] = useState(initialTimelineEvents[initialTimelineEvents.length - 1].score);
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(initialTimelineEvents);

    const readinessState = getReadinessState(score);
    const confidence = getConfidence(score);
    const strategy = getStrategy(readinessState);
    const theme = getAdaptiveTheme(readinessState);
    const notificationImage = getNotificationImage(readinessState);
    const visibleTimelineEvents = timelineEvents.slice(-7);

    function handleSimulation(action: SimulationAction) {
        const nextScore = Math.max(0, Math.min(100, score + actionEffects[action]));
        const nextReadiness = getReadinessState(nextScore);

        setScore(nextScore);

        setTimelineEvents((currentEvents) => [
            ...currentEvents,
            {
                id: currentEvents.length,
                label: action,
                impact: actionEffects[action],
                time: "Just now",
                score: nextScore,
                readiness: nextReadiness,
            },
        ]);
    }

    return (
        <main className={`h-screen overflow-hidden px-6 py-3 text-slate-900 transition-colors duration-500 ${theme.page}`}>
            <section className="mx-auto flex max-w-7xl flex-col">
                <div className="mb-4 flex h-[76px] items-center">
                    <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.accent}`}>
                            Backend Readiness Classification Visualiser
                        </p>

                        <h1 className="text-3xl font-bold">Sarah Chen</h1>

                        <p className="text-sm text-slate-600">
                            This visualises how a backend system classifies fictional users from behavioural patterns, not a real healthcare app or record.
                        </p>
                    </div>
                </div>

                <div className="mb-3 grid h-[72px] gap-3 md:grid-cols-4">
                    <div className={`rounded-2xl border px-3 py-2 shadow-sm transition ${theme.panel}`}>
                        <p className="text-[11px] text-slate-500">Current State</p>
                        <p className={`mt-0.5 text-lg font-semibold ${theme.accent}`}>
                            {readinessState}
                        </p>
                    </div>

                    <div className={`rounded-2xl border px-3 py-2 shadow-sm transition ${theme.panel}`}>
                        <p className="text-[11px] text-slate-500">Readiness Score</p>
                        <p className={`mt-0.5 text-lg font-semibold ${theme.accent}`}>{score}/100</p>
                    </div>

                    <div className={`rounded-2xl border px-3 py-2 shadow-sm transition ${theme.panel}`}>
                        <p className="text-[11px] text-slate-500">Confidence</p>
                        <p className={`mt-0.5 text-lg font-semibold ${theme.accent}`}>{confidence}%</p>
                    </div>

                    <div className={`rounded-2xl border px-3 py-2 shadow-sm transition ${theme.panel}`}>
                        <p className="text-[11px] text-slate-500">Last Activity</p>
                        <p className="mt-0.5 truncate text-sm font-semibold">
                            {timelineEvents[timelineEvents.length - 1].label}
                        </p>
                    </div>
                </div>

                <div className="grid h-[calc(100vh-176px)] min-h-0 gap-3 lg:grid-cols-[0.78fr_1.95fr_0.82fr]">
                    <aside className={`overflow-hidden rounded-3xl border p-3 shadow-sm transition ${theme.panel}`}>
                        <h2 className="mb-3 text-lg font-semibold">Input User Context</h2>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-slate-500">Subject ID</p>
                                <p className="font-medium">Sarah Chen, synthetic profile</p>
                            </div>

                            <div>
                                <p className="text-slate-500">Age Range</p>
                                <p className="font-medium">18 to 35</p>
                            </div>

                            <div>
                                <p className="text-slate-500">Known Pattern</p>
                                <p className="font-medium">Busy schedule, inconsistent checkups</p>
                            </div>

                            <div>
                                <p className="text-slate-500">Notification Style</p>
                                <p className="font-medium">{strategy.tone}</p>
                            </div>

                        </div>

                        <div className="mt-4 border-t border-slate-200 pt-4">
                            <h2 className="mb-2 text-lg font-semibold">Consent Controls</h2>

                            <div className="space-y-2 text-xs">
                                <div className={`flex items-center justify-between rounded-xl p-2 ${theme.softPanel}`}>
                                    <span>Adaptive Personalisation</span>
                                    <span className={`font-medium ${theme.accent}`}>On</span>
                                </div>

                                <div className={`flex items-center justify-between rounded-xl p-2 ${theme.softPanel}`}>
                                    <span>Behaviour Signal Inputs</span>
                                    <span className={`font-medium ${theme.accent}`}>On</span>
                                </div>

                                <div className={`flex items-center justify-between rounded-xl p-2 ${theme.softPanel}`}>
                                    <span>User Override</span>
                                    <span className={`font-medium ${theme.accent}`}>Available</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section className={`flex min-h-0 flex-col rounded-3xl border p-3 shadow-sm transition ${theme.panel}`}>
                        <div className="mb-3 flex h-[45px] shrink-0 items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Motivational Readiness Timeline</h2>
                                <p className="text-xs text-slate-500">Time vs behavioural readiness</p>
                            </div>

                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${theme.badge}`}>
                                Backend simulation
                            </span>
                        </div>

                        <div className={`relative h-[285px] shrink-0 overflow-hidden rounded-3xl border border-white/70 transition-colors ${theme.graph}`}>
                            <div className="absolute inset-x-3 top-3 h-[28%] rounded-2xl bg-white/75" />
                            <div className="absolute inset-x-3 top-[36%] h-[28%] rounded-2xl bg-white/55" />
                            <div className="absolute inset-x-3 bottom-3 h-[28%] rounded-2xl bg-white/40" />

                            <div className={`absolute left-4 top-5 z-30 rounded-xl border-2 border-current bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] shadow-md backdrop-blur-sm ${theme.accent}`}>
                                Action Ready
                            </div>

                            <div className={`absolute left-4 top-[46%] z-30 rounded-xl border-2 border-current bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] shadow-md backdrop-blur-sm ${theme.accent}`}>
                                Ambivalent
                            </div>

                            <div className={`absolute bottom-5 left-4 z-30 rounded-xl border-2 border-current bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] shadow-md backdrop-blur-sm ${theme.accent}`}>
                                Disengaged
                            </div>

                            <svg
                                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                {visibleTimelineEvents.slice(0, -1).map((event, index) => {
                                    const currentPoint = getTimelinePoint(
                                        visibleTimelineEvents[index],
                                        index,
                                        visibleTimelineEvents.length
                                    );

                                    const nextPoint = getTimelinePoint(
                                        visibleTimelineEvents[index + 1],
                                        index + 1,
                                        visibleTimelineEvents.length
                                    );

                                    return (
                                        <line
                                            key={`line-${index}`}
                                            x1={currentPoint.left}
                                            y1={100 - currentPoint.bottom}
                                            x2={nextPoint.left}
                                            y2={100 - nextPoint.bottom}
                                            stroke="currentColor"
                                            strokeWidth="0.8"
                                            strokeLinecap="round"
                                            className={`${theme.accent} opacity-50 transition-all duration-700 ease-in-out`}
                                        />
                                    );
                                })}
                            </svg>

                            {visibleTimelineEvents.map((event, index, array) => {
                                const point = getTimelinePoint(event, index, array.length);
                                const isNegative = event.impact < 0;

                                const fadeStrength =
                                    array.length <= 1
                                        ? 0.85
                                        : 0.35 + (index / (array.length - 1)) * 0.65;

                                return (
                                    <div
                                        key={`${event.label}-${event.time}-${index}`}
                                        className="absolute z-20 transition-all duration-700 ease-out"
                                        style={{
                                            left: `${point.left}%`,
                                            bottom: `${point.bottom}%`,
                                            opacity: fadeStrength,
                                            transform: "translate(-50%, -6px)",
                                        }}
                                    >
                                        <div
                                            className={`flex h-[30px] w-[108px] items-center justify-center rounded-xl bg-white/90 px-1.5 text-center text-[9.5px] font-semibold leading-[1.02] shadow-md backdrop-blur-sm transition-all duration-500 ${
                                                isNegative
                                                    ? theme.negativeText
                                                    : theme.accent
                                            }`}
                                        >
                                            {event.label}
                                        </div>
                                    </div>
                                );
                            })}

                            <p className={`absolute bottom-3 right-4 text-[10px] ${theme.accent}`}>
                                Time →
                            </p>
                        </div>

                        <div className={`mt-3 h-[92px] shrink-0 overflow-y-auto rounded-2xl border border-white/70 p-2 transition-colors ${theme.softPanel}`}>
                            <div className="space-y-1">
                                {timelineEvents
                                    .slice()
                                    .reverse()
                                    .map((event, index) => (
                                        <div
                                            key={`${event.label}-${event.time}-${index}`}
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
                                                    className={`h-2 w-2 shrink-0 rounded-full ${
                                                        event.impact < 0 ? theme.negativeDot : theme.dot
                                                    }`}
                                                />

                                                <span
                                                    className={`truncate font-semibold ${
                                                        event.impact < 0 ? theme.negativeText : theme.accent
                                                    }`}
                                                >
                                                    {event.label}
                                                </span>
                                            </div>

                                            <div className="ml-3 flex shrink-0 items-center gap-3 text-[10px] text-slate-500">
                                                <span>{event.time}</span>

                                                <span className={`font-semibold ${event.impact < 0 ? theme.negativeText : theme.accent}`}>
                                                    {event.impact >= 0 ? "+" : ""}
                                                    {event.impact}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="mt-3 grid h-[78px] shrink-0 gap-2 md:grid-cols-3">
                            {simulatorButtons.map((button) => (
                                <button
                                    key={button}
                                    onClick={() => handleSimulation(button)}
                                    className={`rounded-2xl border px-3 py-1.5 text-xs font-semibold transition ${getButtonStyle(button, theme)}`}
                                >
                                    {button}
                                </button>
                            ))}
                        </div>
                    </section>

                    <aside className="grid h-full min-h-0 grid-rows-[0.9fr_1fr_1fr] gap-3 overflow-hidden">
                        <div className={`overflow-hidden rounded-3xl border p-3 shadow-sm transition ${theme.panel}`}>
                            <h2 className="mb-2 text-lg font-semibold">Communication Strategy Output</h2>

                            <p className={`mb-2 text-xs font-medium ${theme.accent}`}>
                                {strategy.tone}
                            </p>

                            <p className="text-sm leading-5 text-slate-600">
                                “{strategy.message}”
                            </p>
                        </div>

                        <div className={`overflow-hidden rounded-3xl border p-3 shadow-sm transition ${theme.panel}`}>
                            <h2 className="mb-2 text-lg font-semibold">Example App Notification UI</h2>

                            <div className="flex h-[calc(100%-34px)] items-center justify-center overflow-hidden">
                                <img
                                    src={notificationImage}
                                    alt={`${readinessState} notification preview`}
                                    className="w-full max-w-none rounded-2xl object-contain shadow-md"
                                />
                            </div>
                        </div>

                        <div className={`overflow-hidden rounded-3xl border p-3 shadow-sm transition ${theme.panel}`}>
                            <h2 className="mb-2 text-lg font-semibold">Decision Explanation</h2>

                            <p className="text-xs leading-5 text-slate-600">
                                {strategy.explanation}
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}