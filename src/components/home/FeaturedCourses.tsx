"use client";

import { GolfCourse } from "@/types/golf-course";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURED: GolfCourse[] = [
    {
        id: "Old Course",
        name: "St Andrews Old Course",
        location: { lat: 56.3432, lng: -2.8023, address: "St Andrews, Fife", distanceFromStAndrews: 0 },
        type: ["Links", "Historic"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
        greenFee: { min: 200, max: 300, currency: "GBP" }, accessibility: "Public",
        idealSeason: [], averagePlayTime: "4h30",
        services: { clubhouse: true, practice: true, rental: true, caddie: true },
        images: [], description: "The Home of Golf. The most iconic course in the world, where the rules of the game were first written.", bookingLink: "#"
    },
    {
        id: "Kingsbarns",
        name: "Kingsbarns Golf Links",
        location: { lat: 56.2995, lng: -2.6505, address: "Kingsbarns, Fife", distanceFromStAndrews: 7 },
        type: ["Links", "Modern"], environment: "Seaside", isTourCourse: true, difficulty: 4, prestige: 5,
        greenFee: { min: 250, max: 350, currency: "GBP" }, accessibility: "Public",
        idealSeason: [], averagePlayTime: "4h45",
        services: { clubhouse: true, practice: true, rental: true, caddie: true },
        images: [], description: "Sea views from every single hole. A modern classic on the edge of the North Sea.", bookingLink: "#"
    },
    {
        id: "Carnoustie",
        name: "Carnoustie Golf Links",
        location: { lat: 56.4975, lng: -2.7167, address: "Carnoustie, Angus", distanceFromStAndrews: 25 },
        type: ["Links", "Historic"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
        greenFee: { min: 180, max: 280, currency: "GBP" }, accessibility: "Public",
        idealSeason: [], averagePlayTime: "4h30",
        services: { clubhouse: true, practice: true, rental: true, caddie: true },
        images: [], description: "Golf's greatest test. Brutal, beautiful, and utterly unforgettable.", bookingLink: "#"
    },
];

function CoursePlaceholder({ letter, className = "" }: { letter: string; className?: string }) {
    return (
        <div className={`relative bg-[#0D2417] overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E35]/60 to-[#0D2417]" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="text-white/8 font-serif font-bold leading-none select-none"
                    style={{ fontSize: "clamp(6rem, 12vw, 10rem)" }}>
                    {letter}
                </span>
            </div>
        </div>
    );
}

export function FeaturedCourses() {
    const [hero, ...rest] = FEATURED;

    return (
        <section className="py-20 md:py-28 bg-[#F7F4EF]">
            <div className="container mx-auto px-6 md:px-16">

                {/* Header */}
                <div className="flex items-end justify-between mb-14">
                    <div>
                        <p className="text-[#C9A86C] text-[10px] font-bold tracking-[0.35em] uppercase mb-4">
                            Selected Courses
                        </p>
                        <h2 className="font-serif font-bold text-[#1C1917] leading-[0.95]"
                            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                            The courses that<br />shaped the game.
                        </h2>
                    </div>
                    <Link href="/explore" className="hidden md:flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#1B5E35] hover:text-[#0D2417] transition-colors group">
                        All courses
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Large featured card */}
                <div className="grid md:grid-cols-5 mb-4 group cursor-pointer">
                    <CoursePlaceholder letter="S" className="md:col-span-3 aspect-[4/3] md:aspect-auto md:min-h-[400px]" />
                    <div className="md:col-span-2 bg-white flex flex-col justify-between p-8 md:p-10">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                {hero.isTourCourse && (
                                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#C9A86C] border border-[#C9A86C]/50 px-2.5 py-1">
                                        Tour Course
                                    </span>
                                )}
                                {hero.type.map((t) => (
                                    <span key={t} className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#9C8D7B]">{t}</span>
                                ))}
                            </div>
                            <h3 className="font-serif font-bold text-[#1C1917] leading-tight mb-4 group-hover:text-[#1B5E35] transition-colors"
                                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>
                                {hero.name}
                            </h3>
                            <p className="text-[#9C8D7B] text-sm leading-relaxed">
                                {hero.description}
                            </p>
                        </div>

                        <div>
                            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-[#E5DDD3]">
                                {[
                                    { label: "Green Fee", value: `£${hero.greenFee.min}–£${hero.greenFee.max}` },
                                    { label: "Duration", value: hero.averagePlayTime },
                                    { label: "Distance", value: `${hero.location.distanceFromStAndrews} km` },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#9C8D7B] mb-1">{label}</p>
                                        <p className="text-sm font-semibold text-[#1C1917]">{value}</p>
                                    </div>
                                ))}
                            </div>
                            <Link href="/explore">
                                <div className="w-full mt-6 h-11 bg-[#1B5E35] hover:bg-[#0D2417] text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center">
                                    View Course
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Two smaller cards */}
                <div className="grid md:grid-cols-2 gap-4">
                    {rest.map((course) => (
                        <div key={course.id} className="group cursor-pointer flex">
                            <CoursePlaceholder letter={course.name[0]} className="w-36 md:w-44 shrink-0" />
                            <div className="bg-white flex flex-col justify-between p-6 md:p-7 flex-1">
                                <div>
                                    <div className="flex gap-3 mb-3">
                                        {course.type.map((t) => (
                                            <span key={t} className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#9C8D7B]">{t}</span>
                                        ))}
                                    </div>
                                    <h3 className="font-serif font-bold text-[#1C1917] text-base leading-snug group-hover:text-[#1B5E35] transition-colors mb-2">
                                        {course.name}
                                    </h3>
                                    <p className="text-[#9C8D7B] text-xs leading-relaxed line-clamp-2">{course.description}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-[#E5DDD3] mt-4">
                                    <span className="text-sm font-semibold text-[#1C1917]">£{course.greenFee.min}–£{course.greenFee.max}</span>
                                    <span className="text-xs text-[#9C8D7B] tracking-wide">{course.averagePlayTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 md:hidden">
                    <Link href="/explore">
                        <div className="w-full h-11 border border-[#1B5E35] text-[#1B5E35] text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center">
                            View All Courses
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
