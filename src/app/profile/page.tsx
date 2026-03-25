import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { COURSES } from "@/data/courses";
import { CourseCard } from "@/components/courses/course-card";

export default async function ProfilePage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Favorites
    const userFavorites = await prisma.favorite.findMany({
        where: { userId: user.id }
    });
    const favoriteIds = userFavorites.map((f: { courseId: string; }) => f.courseId);
    const favoriteCourses = COURSES.filter((c: { id: string; }) => favoriteIds.includes(c.id));

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-4xl font-playfair font-bold text-slate-900 mb-8">
                    Mon Espace
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar Profil */}
                    <div className="col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex flex-col items-center mb-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm">
                                <Image
                                    src={user.imageUrl}
                                    alt="Avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-neutral-500 text-sm mb-6">
                                {user.emailAddresses[0]?.emailAddress}
                            </p>
                        </div>
                    </div>

                    {/* Main Content (Favs) */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 min-h-[400px]">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                Mes Favoris
                            </h3>

                            {favoriteCourses.length === 0 ? (
                                <div className="text-center py-12 flex flex-col items-center justify-center h-full text-neutral-400">
                                    <svg className="w-16 h-16 mb-4 text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <p className="text-lg">Vous n'avez pas encore de parcours favoris.</p>
                                    <p className="text-sm mt-2">Explorez les parcours et ajoutez-les à votre sélection !</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {favoriteCourses.map((course: any) => (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                            isFavorite={true}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
