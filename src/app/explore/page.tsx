"use client";

import { useState, useMemo } from "react";
import { CourseCard } from "@/components/courses/course-card";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { FilterState, INITIAL_FILTER_STATE } from "@/types/filters";
import { MOCK_CATALOG } from "@/lib/mock-data";
import DynamicCourseMap from "@/components/explore/DynamicCourseMap";

export default function ExplorePage() {
    const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
    const [showMapMobile, setShowMapMobile] = useState(false);
    const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);

    // Advanced Filtering Logic
    const filteredCourses = useMemo(() => {
        return MOCK_CATALOG.filter(course => {
            // 1. Search Term (Name or Location)
            if (filterState.searchTerm) {
                const searchLower = filterState.searchTerm.toLowerCase();
                const titleMatch = course.name.toLowerCase().includes(searchLower);
                const locMatch = course.location.address.toLowerCase().includes(searchLower);
                if (!titleMatch && !locMatch) return false;
            }

            // 2. Region (This requires real region data eventually, for now we will match address approx)
            if (filterState.regions.length > 0) {
                // Simplification for the mock data: checking if the address string overlaps with the region names
                const matchesRegion = filterState.regions.some(region =>
                    region.toLowerCase().includes(course.location.address.toLowerCase()) ||
                    course.location.address.toLowerCase().includes(region.toLowerCase().split(' ')[0])
                );
                if (!matchesRegion) return false;
            }

            // 3. Environment
            if (filterState.environments.length > 0) {
                const envMatch = filterState.environments.some(env => env.includes(course.environment));
                if (!envMatch) return false;
            }

            // 4. Max Price
            if (course.greenFee.min > filterState.maxPrice) {
                return false;
            }

            // 5. Tour / Historic Courses Toggles
            if (filterState.tourCoursesOnly && !course.isTourCourse) return false;
            if (filterState.historicCoursesOnly && course.established > 1900) return false;

            // 6. Index Matcher (This is a complex algorithm in reality, for now we simplify:
            // High index (> 18.0) prefers shorter/easier/lower slope courses
            // Low index (< 10.0) prefers longer/harder courses
            if (filterState.indexMatch !== null) {
                // Extremely basic mock matching logic for demonstration:
                // Assume slope 113 is easy (high index friendly), slope 155 is hard (low index only)
                const isHardCourse = course.slope > 135 || course.difficulty >= 4;
                if (filterState.indexMatch > 20.0 && isHardCourse) return false;
            }

            return true;
        });
    }, [filterState]);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-20"> {/* pt-20 to account for fixed navbar */}
            {/* Top Mobile Bar (only visible on mobile screens) */}
            <div className="lg:hidden sticky top-20 z-30 bg-white border-b border-neutral-200 p-4 shadow-sm">
                <ExploreFilters
                    isMobile
                    filterState={filterState}
                    setFilterState={setFilterState}
                />
            </div>

            {/* Split Screen Layout: 3 Columns on lg/xl screens */}
            <div className="flex-1 flex flex-col lg:flex-row relative">

                {/* 1. LEFT: Permanent Sidebar Filters (20-25% on desktop, hidden on mobile) */}
                <div className="hidden lg:block lg:w-[25%] xl:w-[22%] border-r border-neutral-200 bg-white h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto custom-scrollbar">
                    <ExploreFilters
                        filterState={filterState}
                        setFilterState={setFilterState}
                    />
                </div>

                {/* 2. MIDDLE: Course List (35-40% on desktop, full width on mobile unless map is active) */}
                <div className={`w-full lg:w-[35%] xl:w-[38%] flex flex-col ${showMapMobile ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                        <div className="mb-6 flex justify-between items-end">
                            <h1 className="text-2xl xl:text-3xl font-serif font-bold text-neutral-900">Explore Courses</h1>
                            <p className="text-neutral-500 text-sm xl:text-base font-medium">{filteredCourses.length} courses</p>
                        </div>

                        {filteredCourses.length === 0 ? (
                            <div className="py-12 text-center bg-white rounded-xl border border-neutral-200">
                                <p className="text-neutral-500 font-medium">No courses found matching your criteria.</p>
                                <button
                                    onClick={() => setFilterState(INITIAL_FILTER_STATE)}
                                    className="mt-4 text-[#2dc653] font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 pb-24">
                                {filteredCourses.map(course => (
                                    <div
                                        key={course.id}
                                        onMouseEnter={() => setHoveredCourseId(course.id)}
                                        onMouseLeave={() => setHoveredCourseId(null)}
                                    >
                                        <CourseCard
                                            course={course}
                                            isFavorite={false}
                                            onToggleFavorite={() => { }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. RIGHT: Search Map (Hidden on mobile via toggle) */}
                <div className={`
                    absolute inset-0 z-40 bg-neutral-200
                    lg:static lg:block lg:flex-1 lg:h-[calc(100vh-5rem)] lg:sticky lg:top-20 border-l border-neutral-200
                    ${showMapMobile ? 'block' : 'hidden'}
                `}>
                    <DynamicCourseMap courses={filteredCourses} hoveredCourseId={hoveredCourseId} />
                </div>

                {/* Mobile Map Toggle (Floating Button) */}
                <button
                    onClick={() => setShowMapMobile(!showMapMobile)}
                    className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2dc653] text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-green-900/20 border border-green-500 flex items-center gap-2"
                >
                    {showMapMobile ? "Show List" : "Show Map"}
                </button>

            </div>
        </div>
    );
}
