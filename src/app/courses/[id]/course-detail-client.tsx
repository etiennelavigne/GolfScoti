"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Clock, Calendar, ExternalLink, Heart } from "lucide-react";
import { GolfCourse } from "@/types/golf-course";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

const DIFFICULTY_LABEL: Record<number, string> = {
    1: "Beginner Friendly",
    2: "Easy",
    3: "Moderate",
    4: "Strategic",
    5: "Championship",
};

const MONTH_SHORT: Record<string, string> = {
    January: "Jan", February: "Feb", March: "Mar", April: "Apr",
    May: "May", June: "Jun", July: "Jul", August: "Aug",
    September: "Sep", October: "Oct", November: "Nov", December: "Dec",
};

interface Props {
    course: GolfCourse;
    nearby: GolfCourse[];
}

function CoursePlaceholder({ letter, className = "" }: { letter: string; className?: string }) {
    return (
        <div className={cn("relative bg-[#0D2417] overflow-hidden", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E35]/50 to-[#0D2417]" />
            <span
                className="absolute bottom-4 right-6 text-white/6 font-serif font-bold select-none leading-none"
                style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}
            >
                {letter}
            </span>
        </div>
    );
}

export function CourseDetailClient({ course, nearby }: Props) {
    const { isFavorite, toggleFavorite } = useUser();
    const favorited = isFavorite(course.id);

    return (
        <main className="bg-[#F7F4EF] min-h-screen">

            {/* Hero */}
            <div className="relative h-[55vh] min-h-[400px] max-h-[600px]">
                <CoursePlaceholder letter={course.name[0]} className="absolute inset-0" />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                {/* Back nav */}
                <div className="absolute top-0 left-0 right-0 pt-24 z-10">
                    <div className="container mx-auto px-6 md:px-16">
                        <Link
                            href="/explore"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            All Courses
                        </Link>
                    </div>
                </div>

                {/* Course title — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 z-10 pb-10">
                    <div className="container mx-auto px-6 md:px-16">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {course.isTourCourse && (
                                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#C9A86C] border border-[#C9A86C]/50 px-2.5 py-1">
                                    Tour Course
                                </span>
                            )}
                            {course.type.map((t) => (
                                <span key={t} className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 border border-white/20 px-2.5 py-1">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-serif font-bold text-white leading-tight"
                            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}>
                            {course.name}
                        </h1>
                        <div className="flex items-center gap-1.5 mt-3">
                            <MapPin className="h-3.5 w-3.5 text-[#C9A86C]" />
                            <span className="text-white/50 text-xs tracking-wide">{course.location.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats bar */}
            <div className="bg-[#1B5E35] border-b border-[#0D2417]/30">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10">
                        {[
                            { label: "Green Fee", value: `£${course.greenFee.min} – £${course.greenFee.max}` },
                            { label: "Difficulty", value: DIFFICULTY_LABEL[course.difficulty] },
                            { label: "Duration", value: course.averagePlayTime },
                            ...(course.slope ? [{ label: "Slope Rating", value: String(course.slope) }] : []),
                            ...(course.established ? [{ label: "Established", value: String(course.established) }] : []),
                        ].map(({ label, value }) => (
                            <div key={label} className="py-5 px-4 md:px-6 first:pl-0">
                                <p className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40 mb-1">{label}</p>
                                <p className="text-sm font-semibold text-white">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="container mx-auto px-6 md:px-16 py-16 md:py-20">
                <div className="grid md:grid-cols-12 gap-12 md:gap-16">

                    {/* Left — main content */}
                    <div className="md:col-span-7 space-y-14">

                        {/* Description */}
                        <div>
                            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C9A86C] mb-4">About the Course</p>
                            <p className="text-[#1C1917] text-base md:text-lg leading-relaxed font-light">
                                {course.description}
                            </p>
                        </div>

                        {/* Course specs */}
                        <div>
                            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C9A86C] mb-5">Course Details</p>
                            <div className="grid grid-cols-2 gap-px bg-[#E5DDD3]">
                                {[
                                    { label: "Accessibility", value: course.accessibility },
                                    { label: "Environment", value: course.environment },
                                    ...(course.length ? [{ label: "Length", value: `${course.length.toLocaleString()} yds` }] : []),
                                    ...(course.slope ? [{ label: "Slope", value: String(course.slope) }] : []),
                                    { label: "Play Time", value: course.averagePlayTime },
                                    ...(course.established ? [{ label: "Founded", value: String(course.established) }] : []),
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-white px-5 py-4">
                                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#9C8D7B] mb-1">{label}</p>
                                        <p className="text-sm font-semibold text-[#1C1917]">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C9A86C] mb-5">On-Site Services</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { key: "clubhouse", label: "Clubhouse" },
                                    { key: "practice", label: "Practice Area" },
                                    { key: "rental", label: "Club Rental" },
                                    { key: "caddie", label: "Caddie" },
                                ].map(({ key, label }) => (
                                    <span key={key} className={cn(
                                        "px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase border",
                                        course.services[key as keyof typeof course.services]
                                            ? "border-[#1B5E35] text-[#1B5E35] bg-[#1B5E35]/5"
                                            : "border-[#E5DDD3] text-[#C5BDB4] line-through"
                                    )}>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Ideal season */}
                        {course.idealSeason.length > 0 && (
                            <div>
                                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C9A86C] mb-5">Best Season to Play</p>
                                <div className="flex gap-2 flex-wrap">
                                    {["January","February","March","April","May","June","July","August","September","October","November","December"].map((month) => {
                                        const active = course.idealSeason.includes(month);
                                        return (
                                            <span key={month} className={cn(
                                                "px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] uppercase border",
                                                active
                                                    ? "bg-[#1B5E35] text-white border-[#1B5E35]"
                                                    : "border-[#E5DDD3] text-[#C5BDB4]"
                                            )}>
                                                {MONTH_SHORT[month]}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right — booking card (sticky) */}
                    <div className="md:col-span-5">
                        <div className="sticky top-24 space-y-4">

                            {/* Price + CTA */}
                            <div className="bg-white border border-[#E5DDD3] p-8">
                                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#9C8D7B] mb-2">Green Fee</p>
                                <p className="font-serif font-bold text-[#1C1917] mb-1" style={{ fontSize: "2rem" }}>
                                    £{course.greenFee.min}
                                    <span className="text-[#9C8D7B] font-normal text-lg"> – £{course.greenFee.max}</span>
                                </p>
                                <p className="text-xs text-[#9C8D7B] mb-8">per player · prices vary by season</p>

                                <div className="space-y-3">
                                    {course.bookingLink && course.bookingLink !== "#" && (
                                        <a
                                            href={course.bookingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full h-12 bg-[#1B5E35] hover:bg-[#0D2417] text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors"
                                        >
                                            Book a Tee Time
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                    )}
                                    <button
                                        onClick={() => toggleFavorite(course)}
                                        className={cn(
                                            "flex items-center justify-center gap-2 w-full h-12 border text-xs font-bold tracking-[0.2em] uppercase transition-colors",
                                            favorited
                                                ? "border-[#1B5E35] bg-[#1B5E35]/5 text-[#1B5E35]"
                                                : "border-[#E5DDD3] text-[#9C8D7B] hover:border-[#1B5E35] hover:text-[#1B5E35]"
                                        )}
                                    >
                                        <Heart className={cn("h-3.5 w-3.5", favorited && "fill-[#1B5E35]")} />
                                        {favorited ? "Saved to Favourites" : "Save to Favourites"}
                                    </button>
                                </div>
                            </div>

                            {/* Quick facts */}
                            <div className="bg-white border border-[#E5DDD3] divide-y divide-[#E5DDD3]">
                                {[
                                    { icon: <MapPin className="h-3.5 w-3.5" />, label: "Distance from St Andrews", value: course.location.distanceFromStAndrews ? `${course.location.distanceFromStAndrews} km` : "—" },
                                    { icon: <Clock className="h-3.5 w-3.5" />, label: "Average Play Time", value: course.averagePlayTime },
                                    { icon: <Calendar className="h-3.5 w-3.5" />, label: "Peak Season", value: course.idealSeason.slice(0, 3).map(m => MONTH_SHORT[m]).join(" · ") || "Year-round" },
                                ].map(({ icon, label, value }) => (
                                    <div key={label} className="flex items-center gap-4 px-5 py-4">
                                        <span className="text-[#C9A86C] shrink-0">{icon}</span>
                                        <div>
                                            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#9C8D7B]">{label}</p>
                                            <p className="text-sm font-medium text-[#1C1917]">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nearby courses */}
                {nearby.length > 0 && (
                    <div className="mt-20 pt-16 border-t border-[#E5DDD3]">
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C9A86C] mb-3">Nearby Courses</p>
                                <h2 className="font-serif font-bold text-[#1C1917]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                                    Complete your trip
                                </h2>
                            </div>
                            <Link href="/explore" className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B5E35] hover:text-[#0D2417] transition-colors group">
                                All courses
                                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {nearby.map((c) => (
                                <Link key={c.id} href={`/courses/${c.id}`}>
                                    <div className="group bg-white border border-[#E5DDD3] hover:border-[#1B5E35] transition-colors overflow-hidden">
                                        <CoursePlaceholder letter={c.name[0]} className="h-36" />
                                        <div className="p-5">
                                            <div className="flex gap-2 mb-2">
                                                {c.type.map((t) => (
                                                    <span key={t} className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#9C8D7B]">{t}</span>
                                                ))}
                                            </div>
                                            <h3 className="font-serif font-bold text-[#1C1917] text-base leading-snug group-hover:text-[#1B5E35] transition-colors mb-3">
                                                {c.name}
                                            </h3>
                                            <div className="flex items-center justify-between border-t border-[#E5DDD3] pt-3">
                                                <span className="text-sm font-semibold text-[#1C1917]">£{c.greenFee.min} – £{c.greenFee.max}</span>
                                                <span className="text-xs text-[#9C8D7B]">{c.averagePlayTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
