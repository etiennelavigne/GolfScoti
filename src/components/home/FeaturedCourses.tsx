"use client";

import { CourseCard } from "@/components/courses/course-card";
import { GolfCourse } from "@/types/golf-course";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

// Mock data strictly for the homepage display
const FEATURED_COURSES: GolfCourse[] = [
    {
        id: "Old Course",
        name: "St Andrews Old Course",
        location: { lat: 56.3432, lng: -2.8023, address: "St Andrews, Fife", distanceFromStAndrews: 0 },
        type: ["Links", "Historic"],
        environment: "Seaside",
        isTourCourse: true,
        difficulty: 5,
        prestige: 5, slope: 130, length: 6500, established: 1900,
        greenFee: { min: 200, max: 300, currency: "GBP" },
        accessibility: "Public",
        idealSeason: ["May", "June", "July", "August", "September"],
        averagePlayTime: "4h30",
        services: { clubhouse: true, practice: true, rental: true, caddie: true },
        images: [],
        description: "The Home of Golf. The most iconic golf course in the world.",
        bookingLink: "#"
    },
    {
        id: "Kingsbarns",
        name: "Kingsbarns Golf Links",
        location: { lat: 56.2995, lng: -2.6505, address: "Kingsbarns, St Andrews", distanceFromStAndrews: 7 },
        type: ["Links", "Modern"],
        environment: "Seaside",
        isTourCourse: true,
        difficulty: 4,
        prestige: 5, slope: 130, length: 6500, established: 1900,
        greenFee: { min: 250, max: 350, currency: "GBP" },
        accessibility: "Public",
        idealSeason: ["May", "June", "July", "August", "September"],
        averagePlayTime: "4h45",
        services: { clubhouse: true, practice: true, rental: true, caddie: true },
        images: [],
        description: "A modern classic with sea views from every hole.",
        bookingLink: "#"
    },
    {
        id: "Carnoustie",
        name: "Carnoustie Golf Links",
        location: { lat: 56.4975, lng: -2.7167, address: "Carnoustie, Angus", distanceFromStAndrews: 25 },
        type: ["Links", "Historic"],
        environment: "Seaside",
        isTourCourse: true,
        difficulty: 5,
        prestige: 5, slope: 130, length: 6500, established: 1900,
        greenFee: { min: 180, max: 280, currency: "GBP" },
        accessibility: "Public",
        idealSeason: ["May", "June", "July", "August", "September"],
        averagePlayTime: "4h30",
        services: { clubhouse: true, practice: true, rental: true, caddie: true },
        images: [],
        description: "Golf's greatest test. A brutal but rewarding championship links.",
        bookingLink: "#"
    }
];

export function FeaturedCourses() {
    const { userId } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        if (!userId) {
            setFavorites([]);
            return;
        }
        fetch('/api/favorites')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setFavorites(data.map((fav: any) => fav.courseId));
                }
            })
            .catch(console.error);
    }, [userId]);

    const handleToggleFavorite = async (courseId: string) => {
        if (!userId) {
            window.location.href = '/sign-in';
            return;
        }

        const isFav = favorites.includes(courseId);
        setFavorites(prev => isFav ? prev.filter(id => id !== courseId) : [...prev, courseId]);

        try {
            if (isFav) {
                await fetch(`/api/favorites?courseId=${courseId}`, { method: 'DELETE' });
            } else {
                await fetch('/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ courseId })
                });
            }
        } catch (error) {
            console.error("Failed to toggle favorite", error);
            setFavorites(prev => isFav ? [...prev, courseId] : prev.filter(id => id !== courseId));
        }
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
                            Iconic Courses
                        </h2>
                        <p className="text-neutral-600 max-w-xl">
                            Experience the legendary links that have shaped the history of the game.
                        </p>
                    </div>
                    <Link href="/explore">
                        <Button variant="outline" className="hidden md:flex">View All Courses</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_COURSES.map(course => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isFavorite={favorites.includes(course.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/explore">
                        <Button variant="outline" className="w-full">View All Courses</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
