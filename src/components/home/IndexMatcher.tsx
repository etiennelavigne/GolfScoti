"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Target, Wind, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
                icon: <Trophy className="w-8 h-8 text-red-500 mb-3" />
            };
        } else if (currentIndex <= 20) {
            return {
                key: "medium",
                title: "Strategic",
                description: "A balanced challenge. We suggest courses with fair slopes (115-130) and strategic bunkering.",
                color: "text-blue-500",
                bg: "bg-blue-500",
                lightBg: "bg-blue-50",
                icon: <Target className="w-8 h-8 text-blue-500 mb-3" />
            };
        } else {
            return {
                key: "easy",
                title: "Forgiving",
                description: "Enjoy your game! We highlight wider fairways, lower slopes (<115), and manageable lengths.",
                color: "text-[#2dc653]",
                bg: "bg-[#2dc653]",
                lightBg: "bg-green-50",
                icon: <Wind className="w-8 h-8 text-[#2dc653] mb-3" />
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

    return (
        <section className="pt-16 pb-24 bg-neutral-50/80 border-t border-neutral-200">
            <div className="container mx-auto px-4 max-w-5xl">

                <div className="text-center mb-10 space-y-3">
                    <div className="inline-flex items-center justify-center p-3 bg-white shadow-sm rounded-xl border border-neutral-100 mb-2">
                        <Activity className="w-6 h-6 text-[#2dc653]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-[1.1]">
                        Handicap Matcher
                    </h2>
                    <p className="text-base md:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
                        Not sure which courses suit your game? Enter your Handicap Index, and let our algorithm suggest the best fit.
                    </p>
                </div>

                <div className="bg-white rounded-[1.5rem] shadow-xl border border-neutral-100 overflow-hidden mb-12 max-w-3xl mx-auto">
                    <div className="grid md:grid-cols-5">

                        {/* Input Side */}
                        <div className="md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r border-neutral-100 flex flex-col justify-center">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-6">Your Handicap Index</h3>

                            <div className="flex items-end gap-5">
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
                                <div className="w-20 shrink-0">
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

                        {/* Result Side */}
                        <div className={cn("md:col-span-2 p-6 md:p-10 transition-colors duration-500 flex flex-col justify-center items-start", levelInfo.lightBg)}>
                            <div className="mb-3">
                                {levelInfo.icon}
                                <h3 className={cn("text-2xl font-bold tracking-tight mb-1", levelInfo.color)}>
                                    {levelInfo.title}
                                </h3>
                            </div>
                            <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                                {levelInfo.description}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="text-center">
                    <Link href="/explore">
                        <Button className="h-14 px-8 bg-[#2dc653] hover:bg-[#25a244] text-white rounded-full text-base font-bold shadow-xl shadow-green-900/20 transition-transform hover:scale-105 group">
                            Explore Matching Courses
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
