"use client";

import { Search, MapPin, PoundSterling, TreePine, Flag, ChevronDown } from "lucide-react";

export function ExploreFilters() {
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by course name or location..."
                        className="w-full pl-10 pr-4 py-3 bg-neutral-100 rounded-xl border border-transparent focus:bg-white focus:border-[#2dc653] focus:ring-2 focus:ring-[#2dc653]/20 transition-all outline-none"
                    />
                </div>

                {/* Quick Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
                    <button className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors whitespace-nowrap text-sm font-semibold text-neutral-700">
                        <MapPin className="w-4 h-4 text-neutral-400" />
                        Region
                        <ChevronDown className="w-4 h-4 text-neutral-400 ml-1" />
                    </button>

                    <button className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors whitespace-nowrap text-sm font-semibold text-neutral-700">
                        <PoundSterling className="w-4 h-4 text-neutral-400" />
                        Max Price
                        <ChevronDown className="w-4 h-4 text-neutral-400 ml-1" />
                    </button>

                    <button className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors whitespace-nowrap text-sm font-semibold text-neutral-700">
                        <Flag className="w-4 h-4 text-neutral-400" />
                        Index Matcher
                        <ChevronDown className="w-4 h-4 text-neutral-400 ml-1" />
                    </button>

                    <button className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors whitespace-nowrap text-sm font-semibold text-white">
                        Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
