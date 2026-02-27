"use client";

import { useState } from "react";
import { CourseCard } from "@/components/courses/course-card";
import { GolfCourse } from "@/types/golf-course";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const CourseMap = dynamic(() => import('@/components/explore/CourseMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center text-neutral-400">Loading map...</div>
});

const MOCK_CATALOG: GolfCourse[] = [
    {
        id: "Old Course", name: "St Andrews Old Course", location: { lat: 56.3432, lng: -2.8023, address: "St Andrews", distanceFromStAndrews: 0 },
        type: ["Links", "Historic"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
        greenFee: { min: 200, max: 300, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [], description: "The Home of Golf.", bookingLink: "#"
    },
    {
        id: "Carnoustie", name: "Carnoustie Golf Links", location: { lat: 56.4975, lng: -2.7167, address: "Carnoustie", distanceFromStAndrews: 25 },
        type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5,
        greenFee: { min: 180, max: 280, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [], description: "Golf's greatest test.", bookingLink: "#"
    },
    {
        id: "Kingsbarns", name: "Kingsbarns Golf Links", location: { lat: 56.2995, lng: -2.6505, address: "St Andrews", distanceFromStAndrews: 7 },
        type: ["Links", "Modern"], environment: "Seaside", isTourCourse: true, difficulty: 4, prestige: 5,
        greenFee: { min: 250, max: 350, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h45", services: {} as any, images: [], description: "Modern classic with sea views.", bookingLink: "#"
    },
    {
        id: "Gleneagles", name: "Gleneagles (King's)", location: { lat: 56.2828, lng: -3.7501, address: "Auchterarder", distanceFromStAndrews: 45 },
        type: ["Parkland", "Historic"], environment: "Inland", isTourCourse: true, difficulty: 4, prestige: 5,
        greenFee: { min: 150, max: 275, currency: "GBP" }, accessibility: "Resort", idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [], description: "Beautiful inland challenge.", bookingLink: "#"
    },
    {
        id: "Elie", name: "Elie Golf House Club", location: { lat: 56.1884, lng: -2.8247, address: "Elie, Fife", distanceFromStAndrews: 14 },
        type: ["Links"], environment: "Seaside", isTourCourse: false, difficulty: 3, prestige: 4,
        greenFee: { min: 95, max: 130, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "3h45", services: {} as any, images: [], description: "Fun, forgiving historic links with no par 5s.", bookingLink: "#"
    }
];

export default function ExplorePage() {
    const [courses, setCourses] = useState<GolfCourse[]>(MOCK_CATALOG);
    const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
    const [isMapVisibleMobile, setIsMapVisibleMobile] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-20"> {/* pt-20 to account for fixed navbar */}

            {/* Split Screen Layout */}
            <div className="flex-1 flex flex-col lg:flex-row relative">

                {/* LEFT: Filters & List (60% width on Desktop) */}
                <div className={`w-full lg:w-[60%] flex flex-col ${isMapVisibleMobile ? 'hidden lg:flex' : 'flex'}`}>

                    {/* Top Filters Bar */}
                    <div className="sticky top-20 z-30 bg-white border-b border-neutral-200 p-4 shadow-sm">
                        <ExploreFilters />
                    </div>

                    {/* Scrolling Course List */}
                    <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                        <div className="mb-6 flex justify-between items-end">
                            <h1 className="text-3xl font-serif font-bold text-neutral-900">Explore Golf Courses</h1>
                            <p className="text-neutral-500 font-medium">{courses.length} courses found</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
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

                {/* RIGHT: Sticky Map (40% width on Desktop) */}
                <div className={`w-full lg:w-[40%] bg-neutral-100 ${isMapVisibleMobile ? 'fixed inset-0 z-40 top-20' : 'hidden lg:block'} lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]`}>
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
