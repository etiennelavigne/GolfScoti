import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseType, Environment } from "@/types/golf-course";
import { Check, Search, X } from "lucide-react";
import React from "react";

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

    const toggleType = (type: CourseType) => {
        const current = filters.types;
        const next = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
        onChange({ ...filters, types: next });
    };

    const toggleEnv = (env: Environment) => {
        const current = filters.environments;
        const next = current.includes(env)
            ? current.filter((e) => e !== env)
            : [...current, env];
        onChange({ ...filters, environments: next });
    };

    if (variant === "horizontal") {
        return (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    {/* Search */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Search</label>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Course name..."
                                className="w-full rounded-md border border-input bg-neutral-50 pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                                value={filters.search}
                                onChange={(e) => onChange({ ...filters, search: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Price & Distance (Combined or stacked) */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="font-medium">Max Price</span>
                                <span className="text-muted-foreground">£{filters.maxPrice}</span>
                            </div>
                            <input
                                type="range"
                                min={50}
                                max={500}
                                step={10}
                                className="w-full accent-primary h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                                value={filters.maxPrice}
                                onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Filters Toggles */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-foreground block">Environment</span>
                        <div className="flex flex-wrap gap-2">
                            {(["Links", "Seaside", "Inland"] as any[]).map((type) => (
                                <FilterBadge
                                    key={type}
                                    label={type}
                                    isActive={filters.types.includes(type) || filters.environments.includes(type)}
                                    onClick={() => {
                                        if (["Links"].includes(type)) toggleType(type);
                                        else toggleEnv(type);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Reset/Count */}
                    <div className="flex justify-between items-center md:block text-right">
                        <p className="text-xs text-muted-foreground mb-2">
                            <span className="font-medium text-primary">{count}</span> courses found
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onChange(INITIAL_FILTERS)}
                            className="text-xs hover:text-red-500 p-0 h-auto"
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primary">Filters</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange(INITIAL_FILTERS)}
                    className="text-muted-foreground hover:text-red-500 h-8 text-xs"
                >
                    Reset
                </Button>
            </div>

            <Card className="border-none shadow-none bg-transparent">
                <div className="space-y-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-full rounded-md border border-input bg-white pl-9 pr-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={filters.search}
                            onChange={(e) => onChange({ ...filters, search: e.target.value })}
                        />
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">Max Price</span>
                            <span className="text-muted-foreground">£{filters.maxPrice}</span>
                        </div>
                        <input
                            type="range"
                            min={50}
                            max={500}
                            step={10}
                            className="w-full accent-primary h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                            value={filters.maxPrice}
                            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                        />
                    </div>

                    {/* Distance */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">Distance from St Andrews</span>
                            <span className="text-muted-foreground">{filters.maxDistance} mi</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            className="w-full accent-primary h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                            value={filters.maxDistance}
                            onChange={(e) => onChange({ ...filters, maxDistance: Number(e.target.value) })}
                        />
                    </div>

                    {/* Course Type */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-foreground">Course Type</span>
                        <div className="flex flex-wrap gap-2">
                            {(["Links", "Parkland", "Historic", "Modern"] as CourseType[]).map((type) => (
                                <FilterBadge
                                    key={type}
                                    label={type}
                                    isActive={filters.types.includes(type)}
                                    onClick={() => toggleType(type)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Environment */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-foreground">Environment</span>
                        <div className="flex flex-wrap gap-2">
                            {(["Seaside", "Inland"] as Environment[]).map((env) => (
                                <FilterBadge
                                    key={env}
                                    label={env}
                                    isActive={filters.environments.includes(env)}
                                    onClick={() => toggleEnv(env)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center space-x-2 pt-2">
                        <input
                            type="checkbox"
                            id="tour"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={filters.onlyTour}
                            onChange={(e) => onChange({ ...filters, onlyTour: e.target.checked })}
                        />
                        <label htmlFor="tour" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Tour Courses Only
                        </label>
                    </div>

                    <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground text-center">
                            Showing <span className="font-medium text-foreground">{count}</span> results
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function FilterBadge({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-colors
                ${isActive
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                }
            `}
        >
            {label}
            {isActive && <Check className="ml-1 h-3 w-3" />}
        </button>
    )
}
