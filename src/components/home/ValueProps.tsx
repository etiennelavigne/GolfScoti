import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILLARS = [
    {
        number: "01",
        tag: "Filter",
        headline: "550 courses in Scotland.\nWe find the ones that matter.",
        body: "Filter by handicap index, budget, environment, and distance. Real criteria — not hype.",
    },
    {
        number: "02",
        tag: "Plan",
        headline: "Your trip.\nYour level. Your way.",
        body: "Interactive map, distance clusters, optimized itineraries. Plan every round before you land.",
    },
    {
        number: "03",
        tag: "Save",
        headline: "Build your wishlist.\nReturn to it anytime.",
        body: "Save favorites, compare side-by-side, pick up your planning where you left off.",
    },
];

export function ValueProps() {
    return (
        <section className="bg-[#0D2417]">
            {/* Statement */}
            <div className="container mx-auto px-6 md:px-16 pt-24 md:pt-32 pb-20 border-b border-white/8">
                <p className="text-[#C9A86C] text-[10px] font-bold tracking-[0.35em] uppercase mb-8">
                    Why GolfScoti
                </p>
                <h2 className="font-serif font-bold text-white leading-[0.92] max-w-3xl"
                    style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}>
                    Not a directory.<br />
                    <span className="text-white/30">A decision engine.</span>
                </h2>
            </div>

            {/* Pillars */}
            <div className="container mx-auto px-6 md:px-16">
                {PILLARS.map((p, i) => (
                    <div
                        key={p.number}
                        className={`grid md:grid-cols-12 gap-6 py-14 md:py-16 ${i < PILLARS.length - 1 ? "border-b border-white/8" : ""}`}
                    >
                        {/* Index + Tag */}
                        <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3 md:gap-1.5">
                            <span className="text-white/15 font-mono text-xs tracking-widest">{p.number}</span>
                            <span className="text-[#C9A86C] text-[10px] font-bold tracking-[0.3em] uppercase">{p.tag}</span>
                        </div>

                        {/* Headline */}
                        <div className="md:col-span-5 flex items-center">
                            <h3 className="font-serif font-bold text-white leading-[1.05] whitespace-pre-line"
                                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                                {p.headline}
                            </h3>
                        </div>

                        {/* Body */}
                        <div className="md:col-span-5 flex items-center">
                            <p className="text-white/35 text-sm md:text-base leading-relaxed tracking-wide">
                                {p.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-white/8">
                <div className="container mx-auto px-6 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <p className="text-white/25 text-sm max-w-sm leading-relaxed">
                        Join thousands of golfers who plan smarter.
                    </p>
                    <Link
                        href="/explore"
                        className="flex items-center gap-2.5 text-[#C9A86C] text-xs font-bold tracking-[0.25em] uppercase hover:text-white transition-colors group"
                    >
                        Start exploring
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
