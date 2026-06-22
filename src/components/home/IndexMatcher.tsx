"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/courses/course-card";
import { GolfCourse } from "@/types/golf-course";
import Link from "next/link";

const MOCK_COURSES: Record<string, GolfCourse[]> = {
    hard: [
        {
            id: "Carnoustie", name: "Carnoustie Golf Links",
            location: { lat: 56.4975, lng: -2.7167, address: "Carnoustie", distanceFromStAndrews: 25 },
            type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
            greenFee: { min: 180, max: 280, currency: "GBP" }, accessibility: "Public",
            idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [],
            description: "Golf's greatest test.", bookingLink: "#"
        },
        {
            id: "Muirfield", name: "Muirfield",
            location: { lat: 56.0406, lng: -2.8228, address: "Gullane", distanceFromStAndrews: 45 },
            type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
            greenFee: { min: 250, max: 250, currency: "GBP" }, accessibility: "Private",
            idealSeason: [], averagePlayTime: "4h15", services: {} as any, images: [],
            description: "A demanding masterpiece.", bookingLink: "#"
        }
    ],
    medium: [
        {
            id: "Kingsbarns", name: "Kingsbarns Golf Links",
            location: { lat: 56.2995, lng: -2.6505, address: "St Andrews", distanceFromStAndrews: 7 },
            type: ["Links", "Modern"], environment: "Seaside", isTourCourse: true, difficulty: 4, prestige: 5,
            greenFee: { min: 250, max: 350, currency: "GBP" }, accessibility: "Public",
            idealSeason: [], averagePlayTime: "4h45", services: {} as any, images: [],
            description: "A modern strategic classic.", bookingLink: "#"
        },
        {
            id: "Gleneagles", name: "Gleneagles (King's Course)",
            location: { lat: 56.2828, lng: -3.7501, address: "Auchterarder", distanceFromStAndrews: 45 },
            type: ["Parkland", "Historic"], environment: "Inland", isTourCourse: true, difficulty: 4, prestige: 5,
            greenFee: { min: 150, max: 275, currency: "GBP" }, accessibility: "Public",
            idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [],
            description: "Beautiful inland challenge.", bookingLink: "#"
        }
    ],
    easy: [
        {
            id: "Elie", name: "Elie Golf House Club",
            location: { lat: 56.1884, lng: -2.8247, address: "Elie, Fife", distanceFromStAndrews: 14 },
            type: ["Links"], environment: "Seaside", isTourCourse: false, difficulty: 3, prestige: 4,
            greenFee: { min: 95, max: 130, currency: "GBP" }, accessibility: "Public",
            idealSeason: [], averagePlayTime: "3h45", services: {} as any, images: [],
            description: "Fun, forgiving historic links.", bookingLink: "#"
        },
        {
            id: "Crail", name: "Crail (Balcomie Links)",
            location: { lat: 56.275, lng: -2.593, address: "Crail, Fife", distanceFromStAndrews: 11 },
            type: ["Links"], environment: "Seaside", isTourCourse: false, difficulty: 3, prestige: 4,
            greenFee: { min: 100, max: 150, currency: "GBP" }, accessibility: "Public",
            idealSeason: [], averagePlayTime: "4h", services: {} as any, images: [],
            description: "Scenic and friendly links on the sea.", bookingLink: "#"
        }
    ]
};

const LEVELS = [
    { key: "hard", range: "0 – 9", label: "Championship", description: "High slopes (130+), demanding layouts, tight margins." },
    { key: "medium", range: "10 – 20", label: "Strategic", description: "Balanced challenges, fair slopes (115–130), strategic bunkering." },
    { key: "easy", range: "21 – 54", label: "Forgiving", description: "Wider fairways, lower slopes, manageable lengths." },
];

export function IndexMatcher() {
    const [index, setIndex] = useState<number>(18.5);

    const getLevel = (i: number) => {
        if (i <= 9) return "hard";
        if (i <= 20) return "medium";
        return "easy";
    };

    const currentLevel = LEVELS.find(l => l.key === getLevel(index))!;
    const matchingCourses = MOCK_COURSES[getLevel(index)];

    return (
        <section className="bg-[#F7F4EF] border-t border-[#E5DDD3]">

            {/* Header + Slider */}
            <div className="container mx-auto px-6 md:px-16 py-20 md:py-28">
                <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">

                    {/* Left — text */}
                    <div className="md:col-span-5">
                        <p className="text-[#C9A86C] text-[10px] font-bold tracking-[0.35em] uppercase mb-4">
                            Handicap Matcher
                        </p>
                        <h2 className="font-serif font-bold text-[#1C1917] leading-[0.95] mb-6"
                            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                            Find courses<br />that match your game.
                        </h2>
                        <p className="text-[#9C8D7B] text-sm leading-relaxed max-w-xs">
                            Enter your Handicap Index. We surface the courses that will genuinely challenge — or reward — your level.
                        </p>
                    </div>

                    {/* Right — slider + result */}
                    <div className="md:col-span-7">
                        {/* Slider */}
                        <div className="mb-10">
                            <div className="flex justify-between items-baseline mb-5">
                                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B]">Your Handicap Index</span>
                                <span className="font-serif font-bold text-[#1C1917]" style={{ fontSize: "2rem" }}>{index.toFixed(1)}</span>
                            </div>
                            <input
                                type="range" min="0" max="54" step="0.1"
                                value={index}
                                onChange={(e) => setIndex(parseFloat(e.target.value))}
                                className="w-full h-[2px] bg-[#E5DDD3] appearance-none cursor-pointer accent-[#1B5E35]"
                            />
                            <div className="flex justify-between text-[9px] font-semibold text-[#C9A86C] mt-3 tracking-widest uppercase">
                                <span>Scratch · 0</span>
                                <span>Beginner · 54</span>
                            </div>
                        </div>

                        {/* Level tabs */}
                        <div className="grid grid-cols-3 border border-[#E5DDD3]">
                            {LEVELS.map((level) => (
                                <div
                                    key={level.key}
                                    className={cn(
                                        "p-4 md:p-5 border-r last:border-r-0 border-[#E5DDD3] transition-colors",
                                        currentLevel.key === level.key
                                            ? "bg-[#1B5E35]"
                                            : "bg-white"
                                    )}
                                >
                                    <p className={cn(
                                        "text-[9px] font-bold tracking-[0.2em] uppercase mb-2",
                                        currentLevel.key === level.key ? "text-[#C9A86C]" : "text-[#9C8D7B]"
                                    )}>
                                        {level.range}
                                    </p>
                                    <p className={cn(
                                        "font-serif font-bold text-base mb-1",
                                        currentLevel.key === level.key ? "text-white" : "text-[#1C1917]"
                                    )}>
                                        {level.label}
                                    </p>
                                    <p className={cn(
                                        "text-xs leading-relaxed hidden md:block",
                                        currentLevel.key === level.key ? "text-white/60" : "text-[#9C8D7B]"
                                    )}>
                                        {level.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Matching courses */}
            <div className="border-t border-[#E5DDD3]">
                <div className="container mx-auto px-6 md:px-16 py-16">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-[#C9A86C] text-[10px] font-bold tracking-[0.35em] uppercase mb-2">
                                Matching Your Level
                            </p>
                            <h3 className="font-serif font-bold text-[#1C1917] text-xl md:text-2xl">
                                {currentLevel.label} courses for you
                            </h3>
                        </div>
                        <Link
                            href="/explore"
                            className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B5E35] hover:text-[#0D2417] transition-colors group"
                        >
                            View all
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-14">
                        {matchingCourses?.map((course) => (
                            <CourseCard key={course.id} course={course} isFavorite={false} onToggleFavorite={() => {}} />
                        ))}
                    </div>

                    {/* CTA — premium style */}
                    <div className="flex justify-center">
                        <Link href="/explore">
                            <div className="inline-flex items-center gap-3 border border-[#1B5E35] text-[#1B5E35] hover:bg-[#1B5E35] hover:text-white transition-colors px-10 h-12 text-xs font-bold tracking-[0.25em] uppercase group">
                                View All Matching Courses
                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
