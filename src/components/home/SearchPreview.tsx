"use client";

import { Search, MapPin, PoundSterling, Flag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PremiumSelect } from "@/components/ui/premium-select";

const REGIONS = [
    { value: "standrews", label: "St Andrews & Fife" },
    { value: "highlands", label: "Highlands" },
    { value: "edinburgh", label: "Edinburgh & East" },
    { value: "west", label: "West Coast" },
];

const DIFFICULTIES = [
    { value: "1", label: "Beginner Friendly" },
    { value: "3", label: "Moderate" },
    { value: "5", label: "Championship" },
];

export function SearchPreview() {
    const [region, setRegion] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [price, setPrice] = useState(300);
    const router = useRouter();

    return (
        <div className="bg-white border-b border-[#E5DDD3]">
            <div className="container mx-auto px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5DDD3]">

                    {/* Region */}
                    <div className="flex items-start gap-4 py-6 md:pr-8">
                        <MapPin className="h-4 w-4 text-[#C9A86C] shrink-0 mt-[22px]" />
                        <PremiumSelect
                            label="Region"
                            options={REGIONS}
                            value={region}
                            onChange={setRegion}
                            placeholder="All Scotland"
                            className="flex-1"
                        />
                    </div>

                    {/* Max Price */}
                    <div className="flex items-center gap-4 py-6 md:px-8">
                        <PoundSterling className="h-4 w-4 text-[#C9A86C] shrink-0" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1.5">
                                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B]">Max Green Fee</p>
                                <span className="text-[9px] font-bold text-[#1B5E35] tracking-wider">£{price}</span>
                            </div>
                            <input
                                type="range" min="50" max="500" step="10"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full h-[2px] bg-[#E5DDD3] rounded-none appearance-none cursor-pointer accent-[#1B5E35]"
                            />
                        </div>
                    </div>

                    {/* Difficulty */}
                    <div className="flex items-start gap-4 py-6 md:px-8">
                        <Flag className="h-4 w-4 text-[#C9A86C] shrink-0 mt-[22px]" />
                        <PremiumSelect
                            label="Difficulty"
                            options={DIFFICULTIES}
                            value={difficulty}
                            onChange={setDifficulty}
                            placeholder="Any Level"
                            className="flex-1"
                        />
                    </div>

                    {/* CTA */}
                    <div className="flex items-center py-6 md:pl-8">
                        <button
                            onClick={() => router.push("/explore")}
                            className="w-full flex items-center justify-center gap-2.5 h-11 bg-[#1B5E35] hover:bg-[#0D2417] text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors"
                        >
                            <Search className="h-3.5 w-3.5" />
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
