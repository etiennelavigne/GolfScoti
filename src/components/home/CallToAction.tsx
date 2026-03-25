import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map as MapIcon, UserPlus } from "lucide-react";
import DynamicCourseMap from "@/components/explore/DynamicCourseMap";
import { GolfCourse } from "@/types/golf-course";

// Only a few top courses just to populate the preview pins
const PREVIEW_COURSES: GolfCourse[] = [
    {
        id: "StAndrews",
        name: "Old Course St Andrews",
        location: { lat: 56.342, lng: -2.809, address: "St Andrews", distanceFromStAndrews: 0 },
        type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5, slope: 132, length: 6721, established: 1552,
        greenFee: { min: 320, max: 320, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h30", services: {} as any, images: [], description: "", bookingLink: "#"
    },
    {
        id: "Kingsbarns",
        name: "Kingsbarns Golf Links",
        location: { lat: 56.2995, lng: -2.6505, address: "St Andrews", distanceFromStAndrews: 7 },
        type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 4, prestige: 5, slope: 130, length: 6500, established: 1900,
        greenFee: { min: 250, max: 350, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h45", services: {} as any, images: [], description: "", bookingLink: "#"
    },
    {
        id: "Muirfield",
        name: "Muirfield",
        location: { lat: 56.0406, lng: -2.8228, address: "Gullane", distanceFromStAndrews: 45 },
        type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, prestige: 5, slope: 130, length: 6500, established: 1900,
        greenFee: { min: 250, max: 250, currency: "GBP" }, accessibility: "Private", idealSeason: [], averagePlayTime: "4h15", services: {} as any, images: [], description: "", bookingLink: "#"
    }
];

export function CallToAction() {
    return (
        <section className="py-24 bg-white relative z-0 border-t border-neutral-100">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Text and CTA Content (Left side) */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center p-4 bg-neutral-50 rounded-2xl shadow-sm border border-neutral-100 lg:mx-0 mx-auto">
                            <MapIcon className="w-8 h-8 text-[#2dc653]" />
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 leading-[1.1]">
                            Ready to map out your Scottish adventure?
                        </h2>

                        <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Create your free account to start saving your favorite courses, or explore our interactive map right away to see what Scotland has to offer.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Link href="/sign-up" className="w-full sm:w-auto">
                                <Button className="w-full h-14 px-8 bg-[#2dc653] hover:bg-[#25a244] text-white rounded-full text-lg font-bold shadow-lg shadow-green-900/20 transition-transform hover:scale-105">
                                    <UserPlus className="mr-2 w-5 h-5" />
                                    Create Free Account
                                </Button>
                            </Link>

                            <Link href="/explore" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full h-14 px-8 rounded-full text-lg font-bold border-2 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700 transition-colors">
                                    <MapIcon className="mr-2 w-5 h-5" />
                                    Explore the Map
                                </Button>
                            </Link>
                        </div>

                        <p className="text-sm text-neutral-400 mt-2 lg:text-left text-center">
                            No credit card required. Start planning immediately.
                        </p>
                    </div>

                    {/* Real Map Visual Representation (Right side) */}
                    <div className="relative w-full h-[500px] lg:h-[600px] rounded-[2rem] bg-neutral-100 border border-neutral-200 shadow-2xl overflow-hidden group">

                        {/* The Real Interactive Map Component wrapper */}
                        <div className="absolute inset-0 z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-700 scale-[1.05]">
                            <DynamicCourseMap courses={PREVIEW_COURSES} hoveredCourseId={null} />
                        </div>

                        {/* An invisible clickable blanket with an overlay that triggers `/explore` */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/40 backdrop-blur-[2px]">
                            <Link href="/explore" className="outline-none focus:outline-none">
                                <Button className="relative transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 h-16 px-10 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-lg font-bold shadow-2xl hover:scale-105">
                                    <MapIcon className="mr-3 w-6 h-6" />
                                    Open Interactive Map
                                </Button>
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
