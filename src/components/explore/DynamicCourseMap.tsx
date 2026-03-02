"use client";

import dynamic from "next/dynamic";

const DynamicCourseMap = dynamic(() => import("./CourseMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center text-neutral-400">
            Loading map...
        </div>
    )
});

export default DynamicCourseMap;
