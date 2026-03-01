"use client";

import { Search, MapPin, PoundSterling, TreePine, Flag, ChevronDown, Trophy, Activity, Clock } from "lucide-react";
import { FilterState, INITIAL_FILTER_STATE } from "@/types/filters";

interface ExploreFiltersProps {
    isMobile?: boolean;
    filterState: FilterState;
    setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function ExploreFilters({ isMobile = false, filterState, setFilterState }: ExploreFiltersProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterState(prev => ({ ...prev, searchTerm: e.target.value }));
    };

    const toggleRegion = (region: string) => {
        setFilterState(prev => ({
            ...prev,
            regions: prev.regions.includes(region)
                ? prev.regions.filter(r => r !== region)
                : [...prev.regions, region]
        }));
    };

    const toggleEnvironment = (env: string) => {
        setFilterState(prev => ({
            ...prev,
            environments: prev.environments.includes(env)
                ? prev.environments.filter(e => e !== env)
                : [...prev.environments, env]
        }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterState(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
    };

    const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFilterState(prev => ({ ...prev, indexMatch: val ? parseFloat(val) : null }));
    };

    const clearFilters = () => setFilterState(INITIAL_FILTER_STATE);

    if (isMobile) {
        return (
            <div className="w-full">
                <div className="flex flex-col gap-3">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search course or location..."
                            value={filterState.searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-3 bg-neutral-100 rounded-xl border border-transparent focus:bg-white focus:border-[#2dc653] focus:ring-2 focus:ring-[#2dc653]/20 transition-all outline-none"
                        />
                    </div>

                    {/* Horizontal scroll for quick filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors whitespace-nowrap text-sm font-semibold text-neutral-700">
                            <MapPin className="w-4 h-4 text-neutral-400" />
                            Region
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors whitespace-nowrap text-sm font-semibold text-neutral-700">
                            <PoundSterling className="w-4 h-4 text-neutral-400" />
                            Price
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border border-neutral-900 rounded-lg text-white font-semibold text-sm">
                            More Filters
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // DESKTOP: Vertical Sidebar Layout
    return (
        <div className="p-6 flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <h2 className="font-serif font-bold text-xl text-neutral-900">Filters</h2>
                <button
                    onClick={clearFilters}
                    className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                >
                    Clear All
                </button>
            </div>

            {/* General Search */}
            <div className="relative">
                <Search className="absolute top-3 left-3 h-5 w-5 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={filterState.searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-100 rounded-xl border border-transparent focus:bg-white focus:border-[#2dc653] focus:ring-2 focus:ring-[#2dc653]/20 transition-all outline-none text-sm placeholder:text-neutral-500"
                />
            </div>

            <hr className="border-neutral-100" />

            {/* Region */}
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500" /> Region
                </h3>
                <div className="flex flex-col gap-2">
                    {["Fife & St Andrews", "The Highlands", "Lothians & Edinburgh", "Ayrshire & West"].map(region => (
                        <label key={region} className="flex items-center gap-2 font-medium text-sm text-neutral-700 cursor-pointer hover:text-neutral-900 group">
                            <input
                                type="checkbox"
                                checked={filterState.regions.includes(region)}
                                onChange={() => toggleRegion(region)}
                                className="w-4 h-4 rounded border-neutral-300 text-[#2dc653] focus:ring-[#2dc653] transition-colors cursor-pointer"
                            />
                            {region}
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Environment */}
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-neutral-500" /> Environment
                </h3>
                <div className="flex flex-col gap-2">
                    {["Seaside / Links", "Inland / Parkland", "Heathland"].map(env => (
                        <label key={env} className="flex items-center gap-2 font-medium text-sm text-neutral-700 cursor-pointer hover:text-neutral-900 group">
                            <input
                                type="checkbox"
                                checked={filterState.environments.includes(env)}
                                onChange={() => toggleEnvironment(env)}
                                className="w-4 h-4 rounded border-neutral-300 text-[#2dc653] focus:ring-[#2dc653] transition-colors cursor-pointer"
                            />
                            {env}
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Price Range */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                        <PoundSterling className="w-4 h-4 text-neutral-500" /> Max Green Fee
                    </h3>
                    <span className="text-sm font-bold text-[#2dc653]">£{filterState.maxPrice}</span>
                </div>
                <input
                    type="range"
                    min="50" max="500" step="10"
                    value={filterState.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2dc653]"
                />
                <div className="flex justify-between text-xs font-semibold text-neutral-400">
                    <span>£50</span>
                    <span>£500+</span>
                </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Index Matcher */}
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-neutral-500" /> Index Matcher
                </h3>
                <p className="text-xs text-neutral-500">Filter courses by your playing level.</p>
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <input
                            type="range"
                            min="-5" max="54" step="0.1"
                            value={filterState.indexMatch ?? 18.0}
                            onChange={handleIndexChange}
                            className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2dc653]"
                        />
                    </div>
                    <div className="w-16">
                        <input
                            type="number"
                            placeholder="18.0"
                            value={filterState.indexMatch ?? ''}
                            onChange={handleIndexChange}
                            className="w-full px-2 py-1.5 bg-neutral-100 rounded text-sm text-center font-bold border border-transparent focus:border-[#2dc653] outline-none"
                        />
                    </div>
                </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Status Toggles: Tour & Historic */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-neutral-400" />
                        <div>
                            <h4 className="font-bold text-sm text-neutral-900 leading-none">Tour Courses</h4>
                            <span className="text-xs text-neutral-500">Championship venues</span>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={filterState.tourCoursesOnly}
                            onChange={(e) => setFilterState(prev => ({ ...prev, tourCoursesOnly: e.target.checked }))}
                        />
                        <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2dc653]"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-neutral-400" />
                        <div>
                            <h4 className="font-bold text-sm text-neutral-900 leading-none">Historic Courses</h4>
                            <span className="text-xs text-neutral-500">Founded before 1900</span>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={filterState.historicCoursesOnly}
                            onChange={(e) => setFilterState(prev => ({ ...prev, historicCoursesOnly: e.target.checked }))}
                        />
                        <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2dc653]"></div>
                    </label>
                </div>
            </div>
        </div>
    );
}
