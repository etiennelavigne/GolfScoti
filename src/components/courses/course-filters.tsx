"use client";

import { CourseType, Environment } from "@/types/golf-course";
import { Search, X, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface FilterState {
    search: string;
    types: CourseType[];
    environments: Environment[];
    maxPrice: number;
    maxDistance: number;
    onlyTour: boolean;
}

export const INITIAL_FILTERS: FilterState = {
    search: "",
    types: [],
    environments: [],
    maxPrice: 500,
    maxDistance: 50,
    onlyTour: false,
};

interface CourseFiltersProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
    count: number;
    variant?: "vertical" | "horizontal";
}

export function CourseFilters({ filters, onChange, count, variant = "vertical" }: CourseFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleType = (type: CourseType) => {
        const next = filters.types.includes(type)
            ? filters.types.filter((t) => t !== type)
            : [...filters.types, type];
        onChange({ ...filters, types: next });
    };

    const toggleEnv = (env: Environment) => {
        const next = filters.environments.includes(env)
            ? filters.environments.filter((e) => e !== env)
            : [...filters.environments, env];
        onChange({ ...filters, environments: next });
    };

    const activeCount = filters.types.length + filters.environments.length
        + (filters.maxPrice < 500 ? 1 : 0)
        + (filters.maxDistance < 50 ? 1 : 0)
        + (filters.onlyTour ? 1 : 0)
        + (filters.search ? 1 : 0);

    const filtersContent = (
        <div className="space-y-8">
            {/* Search */}
            <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B] mb-2.5">Search</p>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9C8D7B]" />
                    <input
                        type="text"
                        placeholder="Course name…"
                        className="w-full pl-9 pr-3 h-10 border border-[#E5DDD3] bg-white text-sm text-[#1C1917] placeholder:text-[#C5BDB4] focus:outline-none focus:border-[#1B5E35] transition-colors"
                        value={filters.search}
                        onChange={(e) => onChange({ ...filters, search: e.target.value })}
                    />
                </div>
            </div>

            {/* Price Range */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B]">Max Green Fee</p>
                    <span className="text-xs font-semibold text-[#1B5E35]">£{filters.maxPrice}</span>
                </div>
                <input
                    type="range" min={50} max={500} step={10}
                    className="w-full h-[2px] bg-[#E5DDD3] appearance-none cursor-pointer accent-[#1B5E35]"
                    value={filters.maxPrice}
                    onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                />
                <div className="flex justify-between mt-2 text-[9px] text-[#C5BDB4] tracking-wider">
                    <span>£50</span><span>£500</span>
                </div>
            </div>

            {/* Distance */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B]">Distance from St Andrews</p>
                    <span className="text-xs font-semibold text-[#1B5E35]">{filters.maxDistance} km</span>
                </div>
                <input
                    type="range" min={0} max={100} step={5}
                    className="w-full h-[2px] bg-[#E5DDD3] appearance-none cursor-pointer accent-[#1B5E35]"
                    value={filters.maxDistance}
                    onChange={(e) => onChange({ ...filters, maxDistance: Number(e.target.value) })}
                />
                <div className="flex justify-between mt-2 text-[9px] text-[#C5BDB4] tracking-wider">
                    <span>0 km</span><span>100 km</span>
                </div>
            </div>

            {/* Course Type */}
            <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B] mb-3">Course Type</p>
                <div className="flex flex-wrap gap-2">
                    {(["Links", "Parkland", "Historic", "Modern"] as CourseType[]).map((type) => (
                        <FilterChip
                            key={type}
                            label={type}
                            isActive={filters.types.includes(type)}
                            onClick={() => toggleType(type)}
                        />
                    ))}
                </div>
            </div>

            {/* Environment */}
            <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B] mb-3">Environment</p>
                <div className="flex flex-wrap gap-2">
                    {(["Seaside", "Inland"] as Environment[]).map((env) => (
                        <FilterChip
                            key={env}
                            label={env}
                            isActive={filters.environments.includes(env)}
                            onClick={() => toggleEnv(env)}
                        />
                    ))}
                </div>
            </div>

            {/* Tour toggle */}
            <div
                className={cn(
                    "flex items-center justify-between px-4 py-3 border cursor-pointer transition-colors",
                    filters.onlyTour
                        ? "border-[#1B5E35] bg-[#1B5E35]/5"
                        : "border-[#E5DDD3] hover:border-[#9C8D7B]"
                )}
                onClick={() => onChange({ ...filters, onlyTour: !filters.onlyTour })}
            >
                <span className={cn(
                    "text-xs font-bold tracking-[0.15em] uppercase",
                    filters.onlyTour ? "text-[#1B5E35]" : "text-[#9C8D7B]"
                )}>
                    Tour Courses Only
                </span>
                <div className={cn(
                    "w-4 h-4 border flex items-center justify-center shrink-0",
                    filters.onlyTour ? "border-[#1B5E35] bg-[#1B5E35]" : "border-[#E5DDD3]"
                )}>
                    {filters.onlyTour && (
                        <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-none stroke-white stroke-[1.5]">
                            <polyline points="1,4 4,7 9,1" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-[#E5DDD3] flex items-center justify-between">
                <p className="text-xs text-[#9C8D7B]">
                    <span className="font-semibold text-[#1C1917]">{count}</span> results
                </p>
                {activeCount > 0 && (
                    <button
                        onClick={() => onChange(INITIAL_FILTERS)}
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#9C8D7B] hover:text-[#1C1917] transition-colors flex items-center gap-1"
                    >
                        <X className="h-3 w-3" />
                        Clear all
                    </button>
                )}
            </div>
        </div>
    );

    if (variant === "horizontal") {
        return (
            <div className="bg-white border border-[#E5DDD3] p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    {/* Search */}
                    <div>
                        <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B] mb-2.5">Search</p>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9C8D7B]" />
                            <input
                                type="text"
                                placeholder="Course name…"
                                className="w-full pl-9 pr-3 h-10 border border-[#E5DDD3] bg-[#F7F4EF] text-sm text-[#1C1917] placeholder:text-[#C5BDB4] focus:outline-none focus:border-[#1B5E35] transition-colors"
                                value={filters.search}
                                onChange={(e) => onChange({ ...filters, search: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <div className="flex justify-between mb-2.5">
                            <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B]">Max Green Fee</p>
                            <span className="text-[9px] font-semibold text-[#1B5E35]">£{filters.maxPrice}</span>
                        </div>
                        <input
                            type="range" min={50} max={500} step={10}
                            className="w-full h-[2px] bg-[#E5DDD3] appearance-none cursor-pointer accent-[#1B5E35]"
                            value={filters.maxPrice}
                            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                        />
                    </div>

                    {/* Type chips */}
                    <div>
                        <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B] mb-2.5">Type</p>
                        <div className="flex flex-wrap gap-1.5">
                            {(["Links", "Parkland", "Historic", "Modern"] as CourseType[]).map((type) => (
                                <FilterChip
                                    key={type}
                                    label={type}
                                    isActive={filters.types.includes(type)}
                                    onClick={() => toggleType(type)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Count + reset */}
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-[#9C8D7B]">
                            <span className="font-semibold text-[#1C1917]">{count}</span> courses
                        </p>
                        {activeCount > 0 && (
                            <button
                                onClick={() => onChange(INITIAL_FILTERS)}
                                className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#9C8D7B] hover:text-[#1C1917] transition-colors flex items-center gap-1"
                            >
                                <X className="h-3 w-3" />
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Mobile toggle */}
            <div className="md:hidden mb-4">
                <button
                    onClick={() => setMobileOpen((v) => !v)}
                    className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#1B5E35] border border-[#1B5E35] px-4 h-9"
                >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Filters {activeCount > 0 && `(${activeCount})`}
                </button>
            </div>

            <div className={cn("md:block", mobileOpen ? "block" : "hidden")}>
                <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#9C8D7B]">Filters</p>
                    {activeCount > 0 && (
                        <span className="text-[9px] font-bold text-[#C9A86C] border border-[#C9A86C]/40 px-2 py-0.5 tracking-wider">
                            {activeCount} active
                        </span>
                    )}
                </div>
                {filtersContent}
            </div>
        </div>
    );
}

function FilterChip({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase border transition-all",
                isActive
                    ? "bg-[#1B5E35] text-white border-[#1B5E35]"
                    : "bg-white text-[#9C8D7B] border-[#E5DDD3] hover:border-[#1B5E35] hover:text-[#1B5E35]"
            )}
        >
            {label}
            {isActive && <X className="h-2.5 w-2.5 opacity-70" />}
        </button>
    );
}
