"use client";

import { useState } from "react";
import { CourseCard } from "@/components/courses/course-card";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { COURSES } from "@/data/courses";
import dynamic from 'next/dynamic';

const CourseMap = dynamic(() => import('@/components/explore/CourseMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center text-neutral-400">Loading map...</div>
});

export default function ExplorePage() {
    const [courses, setCourses] = useState(COURSES);
    const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
    const [isMapVisibleMobile, setIsMapVisibleMobile] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-20"> {/* pt-20 to account for fixed navbar */}

            {/* Split Screen Layout: 3 Columns on lg/xl screens */}
            <div className="flex-1 flex flex-col lg:flex-row relative">

                {/* 1. LEFT: Permanent Sidebar Filters (20-25% on desktop, hidden on mobile) */}
                <div className="hidden lg:block lg:w-[25%] xl:w-[22%] border-r border-neutral-200 bg-white h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto custom-scrollbar">
                    <ExploreFilters />
                </div>

                {/* 2. MIDDLE: Course List (35-40% on desktop, full width on mobile unless map is active) */}
                <div className={`w-full lg:w-[35%] xl:w-[38%] flex flex-col ${isMapVisibleMobile ? 'hidden lg:flex' : 'flex'}`}>

                    {/* Top Mobile Bar (only visible on mobile screens) */}
                    <div className="lg:hidden sticky top-20 z-30 bg-white border-b border-neutral-200 p-4 shadow-sm">
                        <ExploreFilters isMobile />
                    </div>

                    <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                        <div className="mb-6 flex justify-between items-end">
                            <h1 className="text-2xl xl:text-3xl font-serif font-bold text-neutral-900">Explore Courses</h1>
                            <p className="text-neutral-500 text-sm xl:text-base font-medium">{courses.length} courses</p>
                        </div>

                        {/* 1 column list usually better for this width, responsive on massive screens */}
                        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 pb-24">
                            {courses.map(course => (
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
                    </div>
                </div>

                {/* 3. RIGHT: Sticky Map (40% width on Desktop) */}
                <div className={`w-full lg:w-[40%] xl:w-[40%] bg-neutral-100 ${isMapVisibleMobile ? 'fixed inset-0 z-40 top-20' : 'hidden lg:block'} lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] border-l border-neutral-200`}>
                    <CourseMap
                        courses={courses}
                        hoveredCourseId={hoveredCourseId}
                    />
                </div>

                {/* Mobile Map Toggle (Floating Button) */}
                <button
                    onClick={() => setIsMapVisibleMobile(!isMapVisibleMobile)}
                    className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2dc653] text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-green-900/20 border border-green-500 flex items-center gap-2"
                >
                    {isMapVisibleMobile ? "Show List" : "Show Map"}
                </button>

            </div>
        </div>
    );
}
