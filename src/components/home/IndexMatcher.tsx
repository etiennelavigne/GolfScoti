"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Target, Wind, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/courses/course-card";
import { GolfCourse } from "@/types/golf-course";
import Link from "next/link";

// Mock data strictly for displaying matching courses in the preview
const MOCK_COURSES: Record<string, GolfCourse[]> = {
    hard: [
        {
            id: "Carnoustie",
            name: "Carnoustie Golf Links",
            location: { lat: 56.4975, lng: -2.7167, address: "Carnoustie", distanceFromStAndrews: 25 },
            type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
            greenFee: { min: 180, max: 280, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [], description: "Golf's greatest test.", bookingLink: "#"
        },
        {
            id: "Muirfield",
            name: "Muirfield",
            location: { lat: 56.0406, lng: -2.8228, address: "Gullane", distanceFromStAndrews: 45 },
            type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
            greenFee: { min: 250, max: 250, currency: "GBP" }, accessibility: "Private", idealSeason: [], averagePlayTime: "4h15", services: {} as any, images: [], description: "A demanding masterpiece.", bookingLink: "#"
        }
    ],
    medium: [
        {
            id: "Kingsbarns",
            name: "Kingsbarns Golf Links",
            location: { lat: 56.2995, lng: -2.6505, address: "St Andrews", distanceFromStAndrews: 7 },
            type: ["Links", "Modern"], environment: "Seaside", isTourCourse: true, difficulty: 4, prestige: 5,
            greenFee: { min: 250, max: 350, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h45", services: {} as any, images: [], description: "A modern strategic classic.", bookingLink: "#"
        },
        {
            id: "Gleneagles",
            name: "Gleneagles (King's Course)",
            location: { lat: 56.2828, lng: -3.7501, address: "Auchterarder", distanceFromStAndrews: 45 },
            type: ["Parkland", "Historic"], environment: "Inland", isTourCourse: true, difficulty: 4, prestige: 5,
            greenFee: { min: 150, max: 275, currency: "GBP" }, accessibility: "Resort", idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [], description: "Beautiful inland challenge.", bookingLink: "#"
        }
    ],
    easy: [
        {
            id: "Elie",
            name: "Elie Golf House Club",
            location: { lat: 56.1884, lng: -2.8247, address: "Elie, Fife", distanceFromStAndrews: 14 },
            type: ["Links"], environment: "Seaside", isTourCourse: false, difficulty: 3, prestige: 4,
            greenFee: { min: 95, max: 130, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "3h45", services: {} as any, images: [], description: "Fun, forgiving historic links with no par 5s.", bookingLink: "#"
        },
        {
            id: "Crail",
            name: "Crail (Balcomie Links)",
            location: { lat: 56.275, lng: -2.593, address: "Crail, Fife", distanceFromStAndrews: 11 },
            type: ["Links"], environment: "Seaside", isTourCourse: false, difficulty: 3, prestige: 4,
            greenFee: { min: 100, max: 150, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h", services: {} as any, images: [], description: "Scenic and friendly links on the edge of the sea.", bookingLink: "#"
        }
    ]
};

export function IndexMatcher() {
    const [index, setIndex] = useState<number>(18.5);

    // Calculate level based on index
    const getLevelInfo = (currentIndex: number) => {
        if (currentIndex <= 9) {
            return {
                key: "hard",
                title: "Championship",
                description: "You have a strong game. We prioritize high slopes (130+) and demanding layouts.",
                color: "text-red-500",
                bg: "bg-red-500",
                lightBg: "bg-red-50",
                icon: <Trophy className="w-8 h-8 text-red-500 mb-4" />
            };
        } else if (currentIndex <= 20) {
            return {
                key: "medium",
                title: "Strategic",
                description: "A balanced challenge. We suggest courses with fair slopes (115-130) and strategic bunkering.",
                color: "text-blue-500",
                bg: "bg-blue-500",
                lightBg: "bg-blue-50",
                icon: <Target className="w-8 h-8 text-blue-500 mb-4" />
            };
        } else {
            return {
                key: "easy",
                title: "Forgiving",
                description: "Enjoy your game! We highlight wider fairways, lower slopes (<115), and manageable lengths.",
                color: "text-[#2dc653]",
                bg: "bg-[#2dc653]",
                lightBg: "bg-green-50",
                icon: <Wind className="w-8 h-8 text-[#2dc653] mb-4" />
            };
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIndex(parseFloat(e.target.value));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0;
        if (val > 54) val = 54;
        setIndex(val);
    };

    const levelInfo = getLevelInfo(index);
    const matchingCourses = MOCK_COURSES[levelInfo.key];

    return (
        <section className="py-24 bg-neutral-50 border-y border-neutral-100">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-neutral-100 mb-6">
                            <Activity className="w-6 h-6 text-[#2dc653]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
                            Find Your Perfect Match
                        </h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            Not sure which courses suit your game? Enter your Handicap Index, and we'll automatically filter the best Scottish courses tailored to your skill level.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden mb-16">
                        <div className="grid md:grid-cols-3">

                            {/* Input Side (Wider) */}
                            <div className="md:col-span-2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-neutral-100 flex flex-col justify-center">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-8">Your Handicap Index</h3>

                                <div className="flex items-end gap-6">
                                    <div className="flex-1">
                                        <input
                                            type="range"
                                            min="0" max="54" step="0.1"
                                            value={index}
                                            onChange={handleSliderChange}
                                            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2dc653]"
                                        />
                                        <div className="flex justify-between text-xs font-semibold text-neutral-400 mt-3 px-1">
                                            <span>Scratch (0)</span>
                                            <span>Beginner (54)</span>
                                        </div>
                                    </div>
                                    <div className="w-24 shrink-0">
                                        <input
                                            type="number"
                                            min="0" max="54" step="0.1"
                                            value={index}
                                            onChange={handleInputChange}
                                            className="w-full h-14 text-center text-xl font-bold text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2dc653]/20 focus:border-[#2dc653] transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Result Side (Narrower) */}
                            <div className={cn("md:col-span-1 p-8 md:p-10 transition-colors duration-500 flex flex-col justify-center items-start", levelInfo.lightBg)}>
                                {levelInfo.icon}
                                <div className="space-y-2">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 border border-white/40 text-xs font-bold uppercase tracking-wider text-neutral-700 backdrop-blur-sm shadow-sm mb-1">
                                        Recommended
                                    </div>
                                    <h3 className={cn("text-2xl font-bold tracking-tight", levelInfo.color)}>
                                        {levelInfo.title}
                                    </h3>
                                    <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                                        {levelInfo.description}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Matching Courses Preview */}
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
                            Matching Your Level
                        </h3>
                        <p className="text-neutral-600 max-w-lg mx-auto mb-10">
                            Here are some of the fantastic courses that suit a {levelInfo.title.toLowerCase()} playing experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
                        {matchingCourses?.map((course) => (
                            <CourseCard key={course.id} course={course} isFavorite={false} onToggleFavorite={() => { }} />
                        ))}
                    </div>

                    {/* Large CTA Button */}
                    <div className="text-center">
                        <Link href="/explore">
                            <Button className="h-16 px-12 sm:px-16 bg-[#2dc653] hover:bg-[#25a244] text-white rounded-full text-xl font-bold shadow-xl shadow-green-900/20 transition-transform hover:scale-105 group">
                                View All Matching Courses
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
