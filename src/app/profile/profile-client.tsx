"use client";

import { useUser as useClerkUser, UserButton, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@/context/UserContext";
import { COURSES } from "@/data/courses";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Crown } from "lucide-react";
import Link from "next/link";

export function ProfileClient() {
  const { isLoaded, isSignedIn, user: clerkUser } = useClerkUser();
  const { plan, favorites, toggleFavorite, isFavorite } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <RedirectToSignIn />;

  const favoriteCourses = COURSES.filter((c) => favorites.includes(c.id));
  const displayName =
    clerkUser.fullName ||
    clerkUser.firstName ||
    clerkUser.emailAddresses[0]?.emailAddress ||
    "Member";
  const email = clerkUser.emailAddresses[0]?.emailAddress || "";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      {/* Profile header */}
      <div className="bg-white border-b border-neutral-100 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[#2dc653]/10 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-[#2dc653]">{initials}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-serif text-neutral-900">{displayName}</h1>
                <p className="text-sm text-neutral-500">{email}</p>
                <div className="mt-1.5">
                  {plan === "premium" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      <Crown className="h-3 w-3" /> Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                      Free plan
                    </span>
                  )}
                </div>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Stats row */}
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Heart className="h-4 w-4 text-[#2dc653]" />
              <span>
                <strong>{favorites.length}</strong>
                {plan === "free" ? " / 3" : ""} saved
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <MapPin className="h-4 w-4 text-neutral-400" />
              <span>Scotland Golf Trips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Upgrade banner */}
        {plan === "free" && favorites.length >= 3 && (
          <div className="mb-8 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold">Free plan limit reached</p>
              <p className="text-neutral-400 text-sm mt-0.5">
                Upgrade to save unlimited courses and unlock advanced features.
              </p>
            </div>
            <Button className="bg-[#2dc653] hover:bg-[#25a244] shrink-0 font-semibold">
              Upgrade to Premium
            </Button>
          </div>
        )}

        {/* Favorites section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-serif text-neutral-900">My Saved Courses</h2>
            <Link href="/explore">
              <Button variant="outline" size="sm" className="text-neutral-600">
                Browse more
              </Button>
            </Link>
          </div>

          {favoriteCourses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-200">
              <Heart className="h-10 w-10 text-neutral-200 mx-auto mb-3" />
              <p className="text-neutral-600 font-medium">No saved courses yet</p>
              <p className="text-neutral-400 text-sm mt-1">
                Explore courses and tap the heart to save them here.
              </p>
              <Link href="/explore">
                <Button className="bg-[#2dc653] hover:bg-[#25a244] mt-5">
                  Start Exploring
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isFavorite={isFavorite(course.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
