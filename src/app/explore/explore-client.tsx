"use client";

import { CourseFilters, FilterState, INITIAL_FILTERS } from "@/components/courses/course-filters";
import { CourseCard } from "@/components/courses/course-card";
import { GolfCourse } from "@/types/golf-course";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Minimal Sheet Mock for Mobile if not exists, or I can skip and use simple conditional
// Actually, I'll use a simple conditional for mobile or desktop sidebar for now to save complexity
// or implement a quick responsive layout.

export function ExploreClient({ initialCourses }: { initialCourses: GolfCourse[] }) {
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
    const [favorites, setFavorites] = useState<string[]>([]);

    const filteredCourses = useMemo(() => {
        return initialCourses.filter((course) => {
            // Search
            if (filters.search && !course.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            // Price
            if (course.greenFee.max > filters.maxPrice) {
                return false;
            }
            // Distance
            if (course.location.distanceFromStAndrews !== undefined && course.location.distanceFromStAndrews > filters.maxDistance) {
                return false;
            }
            // Tour
            if (filters.onlyTour && !course.isTourCourse) {
                return false;
            }
            // Types
            if (filters.types.length > 0) {
                const hasType = course.type.some((t) => filters.types.includes(t));
                if (!hasType) return false;
            }
            // Environment
            if (filters.environments.length > 0) {
                if (!filters.environments.includes(course.environment)) return false;
            }

            return true;
        });
    }, [initialCourses, filters]);

    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-8">
                {/* Visual Section for Criteria Selection */}
                <div className="w-full max-w-5xl mx-auto -mt-16 relative z-10">
                    <CourseFilters filters={filters} onChange={setFilters} count={filteredCourses.length} variant="horizontal" />
                </div>

                {/* Results Grid */}
                <div className="flex-1 mt-4">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-20 bg-neutral-50 rounded-xl border border-dashed text-muted-foreground">
                            <p className="text-lg">No courses found matching your criteria.</p>
                            <Button variant="link" onClick={() => setFilters(INITIAL_FILTERS)}>Clear Filters</Button>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold font-serif text-primary mb-6">Suggested Courses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map(course => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        isFavorite={favorites.includes(course.id)}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
