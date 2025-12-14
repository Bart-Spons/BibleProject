import React, { useMemo, useState } from "react";

/**
 * 4 themes gekoppeld aan tijd:
 * - ochtend: 05:00–11:59
 * - middag: 12:00–16:59
 * - avond: 17:00–20:59
 * - nacht: 21:00–04:59
 */
function getThemeByHour(hour) {
    if (hour >= 5 && hour <= 11) return "morning";
    if (hour >= 12 && hour <= 16) return "afternoon";
    if (hour >= 17 && hour <= 20) return "evening";
    return "night";
}

const VERSES = [
    { text: "You will stand firm and without fear.", ref: "Job 15:11" },
    {
        text: "The Lord is my light and my salvation—whom shall I fear?",
        ref: "Psalm 27:1",
    },
    { text: "Be strong and courageous. Do not be afraid.", ref: "Joshua 1:9" },
    { text: "Peace I leave with you; my peace I give you.", ref: "John 14:27" },
    {
        text: "Cast all your anxiety on Him because He cares for you.",
        ref: "1 Peter 5:7",
    },
    { text: "In the morning, Lord, you hear my voice.", ref: "Psalm 5:3" },
    {
        text: "This is the day that the Lord has made; let us rejoice.",
        ref: "Psalm 118:24",
    },
    { text: "My grace is sufficient for you.", ref: "2 Corinthians 12:9" },
];

function pickRandomVerse() {
    return VERSES[Math.floor(Math.random() * VERSES.length)];
}

export default function App() {
    const theme = useMemo(() => getThemeByHour(new Date().getHours()), []);
    const [verse] = useState(() => pickRandomVerse()); // nieuwe verse bij elke reload

    const themeVars = useMemo(() => {
        // Je kunt deze kleuren later makkelijk tweaken
        switch (theme) {
            case "morning":
                return {
                    bg1: "#ffedd5",
                    bg2: "#dbeafe",
                    glow: "rgba(255, 255, 255, 0.55)",
                    accent: "rgba(59, 130, 246, 0.55)",
                    vignette: "rgba(30, 41, 59, 0.20)",
                    label: "Ochtend",
                };
            case "afternoon":
                return {
                    bg1: "#dcfce7",
                    bg2: "#e0f2fe",
                    glow: "rgba(255, 255, 255, 0.45)",
                    accent: "rgba(16, 185, 129, 0.45)",
                    vignette: "rgba(2, 6, 23, 0.16)",
                    label: "Middag",
                };
            case "evening":
                return {
                    bg1: "#ffe4e6",
                    bg2: "#c7d2fe",
                    glow: "rgba(255, 255, 255, 0.38)",
                    accent: "rgba(244, 63, 94, 0.40)",
                    vignette: "rgba(2, 6, 23, 0.25)",
                    label: "Avond",
                };
            case "night":
            default:
                return {
                    bg1: "#0b1020",
                    bg2: "#3b1b5a",
                    glow: "rgba(255, 255, 255, 0.22)",
                    accent: "rgba(168, 85, 247, 0.40)",
                    vignette: "rgba(0, 0, 0, 0.45)",
                    label: "Nacht",
                };
        }
    }, [theme]);

    return (
        <div
            style={{
                width: "100vw",
                minWidth: "100vw",
                height: "100svh",
                minHeight: "100svh",
                display: "grid",
                placeItems: "center",
                position: "relative",
                overflow: "hidden",

                background: `radial-gradient(1200px 600px at 20% 25%, ${themeVars.bg2} 0%, transparent 55%),
                     radial-gradient(900px 500px at 80% 20%, ${themeVars.accent} 0%, transparent 60%),
                     linear-gradient(145deg, ${themeVars.bg1} 0%, ${themeVars.bg2} 35%, ${themeVars.bg1} 100%)`,
            }}
        >
            {/* Vignette + film grain */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(closest-side at 50% 45%, transparent 0%, ${themeVars.vignette} 75%, ${themeVars.vignette} 100%)`,
                    pointerEvents: "none",
                }}
            />
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.09,
                    mixBlendMode: "overlay",
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
                    pointerEvents: "none",
                }}
            />

            {/* Content card */}
            <main
                style={{
                    // width: "min(920px, 92vw)",
                    padding: "clamp(22px, 4vw, 42px)",
                    borderRadius: "28px",
                    position: "relative",
                    backdropFilter: "blur(14px)",
                    margin: "0 1rem",
                    background:
                        theme === "night"
                            ? "rgba(10, 10, 20, 0.35)"
                            : "rgba(255, 255, 255, 0.38)",
                    border:
                        theme === "night"
                            ? "1px solid rgba(255,255,255,0.10)"
                            : "1px solid rgba(2,6,23,0.08)",
                    boxShadow:
                        theme === "night"
                            ? "0 18px 80px rgba(0,0,0,0.65)"
                            : "0 18px 80px rgba(2,6,23,0.18)",
                }}
            >
                {/* top label */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 20,
                    }}
                >
                    <div
                        style={{
                            fontFamily:
                                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
                            fontSize: 13,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            opacity: theme === "night" ? 0.85 : 0.75,
                            color:
                                theme === "night"
                                    ? "rgba(255,255,255,0.85)"
                                    : "rgba(2,6,23,0.75)",
                        }}
                    >
                        {themeVars.label}
                    </div>

                    <div
                        style={{
                            fontFamily:
                                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
                            fontSize: 13,
                            opacity: theme === "night" ? 0.75 : 0.65,
                            color:
                                theme === "night"
                                    ? "rgba(255,255,255,0.80)"
                                    : "rgba(2,6,23,0.65)",
                        }}
                    >
                        {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>

                {/* verse */}
                <div
                    style={{
                        textAlign: "center",
                        padding: "clamp(18px, 3vw, 34px) 0",
                    }}
                >
                    <div
                        style={{
                            fontFamily:
                                "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
                            fontSize: "clamp(26px, 3.3vw, 44px)",
                            lineHeight: 1.25,
                            fontWeight: 650,
                            color:
                                theme === "night"
                                    ? "rgba(255,255,255,0.92)"
                                    : "rgba(2,6,23,0.92)",
                            textShadow: `0 2px 24px ${themeVars.glow}`,
                            margin: 0,
                        }}
                    >
                        “{verse.text}”
                    </div>

                    <div
                        style={{
                            marginTop: 16,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            borderRadius: 999,
                            background:
                                theme === "night"
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(2,6,23,0.06)",
                            border:
                                theme === "night"
                                    ? "1px solid rgba(255,255,255,0.12)"
                                    : "1px solid rgba(2,6,23,0.08)",
                        }}
                    >
                        <span
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 999,
                                background:
                                    theme === "night"
                                        ? "rgba(255,255,255,0.65)"
                                        : "rgba(2,6,23,0.55)",
                                boxShadow: `0 0 0 6px ${themeVars.accent}`,
                            }}
                        />
                        <span
                            style={{
                                fontFamily:
                                    "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
                                fontSize: 14,
                                letterSpacing: "0.06em",
                                opacity: theme === "night" ? 0.9 : 0.85,
                                color:
                                    theme === "night"
                                        ? "rgba(255,255,255,0.9)"
                                        : "rgba(2,6,23,0.85)",
                            }}
                        >
                            {verse.ref}
                        </span>
                    </div>
                </div>

                {/* bottom mark */}
                <footer
                    style={{
                        marginTop: 18,
                        display: "flex",
                        justifyContent: "center",
                        opacity: theme === "night" ? 0.75 : 0.6,
                    }}
                >
                    <div
                        style={{
                            fontFamily:
                                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
                            fontSize: 12,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color:
                                theme === "night"
                                    ? "rgba(255,255,255,0.8)"
                                    : "rgba(2,6,23,0.65)",
                        }}
                    >
                        Daily Verse • Reload for another
                    </div>
                </footer>
            </main>
        </div>
    );
}
