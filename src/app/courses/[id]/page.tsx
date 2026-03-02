import { notFound } from "next/navigation";
import { MOCK_CATALOG } from "@/lib/mock-data";
import { ImageCarousel } from "@/components/courses/ImageCarousel";
import {
    MapPin,
    Calendar,
    Flag,
    Activity,
    PoundSterling,
    ExternalLink,
    Mail,
    Phone,
    CheckCircle2,
    XCircle,
    Globe
} from "lucide-react";
import Link from "next/link";
import DynamicCourseMap from "@/components/explore/DynamicCourseMap";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // 1. Await params for Next.js 15+
    const resolvedParams = await params;

    // 2. Find the course
    const course = MOCK_CATALOG.find(c => c.id === resolvedParams.id);

    if (!course) {
        notFound();
    }

    // 3. Format difficulty stars
    const renderDifficulty = () => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < course.difficulty ? "bg-red-500" : "bg-neutral-200"}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-neutral-50 pt-20">
            {/* 1. HERO CAROUSEL */}
            <ImageCarousel images={course.images} altText={course.name} />

            {/* 2. MAIN CONTENT LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">

                {/* LEFT: Course Details */}
                <div className="flex-1 space-y-10">

                    {/* Header Info */}
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {course.isTourCourse && (
                                <span className="bg-[#1a1a1a] text-[#C5A880] text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full flex items-center gap-1">
                                    <Globe size={12} /> Tour Venue
                                </span>
                            )}
                            <span className="bg-white border border-neutral-200 text-neutral-600 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                                {course.accessibility}
                            </span>
                            {course.type.map(t => (
                                <span key={t} className="bg-neutral-100 text-neutral-600 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">{course.name}</h1>
                        <p className="flex items-center gap-2 text-neutral-500 font-medium">
                            <MapPin size={18} className="text-[#2dc653]" />
                            {course.location.address}
                        </p>
                    </div>

                    <hr className="border-neutral-200" />

                    {/* About */}
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-4">About the Course</h2>
                        <p className="text-neutral-600 leading-relaxed text-lg">
                            {course.description}
                        </p>
                    </section>

                    {/* Quick Stats Grid */}
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Course Specifications</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col gap-1 shadow-sm">
                                <span className="text-neutral-400 flex items-center gap-2"><Flag size={16} /> Par / Length</span>
                                <span className="font-bold text-neutral-900 text-lg">{course.length} yds</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col gap-1 shadow-sm">
                                <span className="text-neutral-400 flex items-center gap-2"><Activity size={16} /> Slope</span>
                                <span className="font-bold text-neutral-900 text-lg">{course.slope}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col gap-1 shadow-sm">
                                <span className="text-neutral-400 flex items-center gap-2"><Calendar size={16} /> Established</span>
                                <span className="font-bold text-neutral-900 text-lg">{course.established}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center justify-between shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-neutral-400">Difficulty</span>
                                    {renderDifficulty()}
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-neutral-200" />

                    {/* Amenities Placeholder */}
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Facilities & Amenities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Will populate based on actual boolean flags later */}
                            <div className="flex items-center gap-3 text-neutral-700">
                                <CheckCircle2 className="text-[#2dc653]" size={20} /> <span className="font-medium">Clubhouse & Dining</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-700">
                                <CheckCircle2 className="text-[#2dc653]" size={20} /> <span className="font-medium">Pro Shop</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-700">
                                <CheckCircle2 className="text-[#2dc653]" size={20} /> <span className="font-medium">Practice Area</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-400">
                                <XCircle size={20} /> <span>Buggy Rental</span>
                            </div>
                        </div>
                    </section>

                    <hr className="border-neutral-200" />

                    {/* Location Map */}
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Location</h2>
                        <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative z-0">
                            <DynamicCourseMap courses={[course]} hoveredCourseId={course.id} />
                        </div>
                        <p className="mt-3 text-neutral-500 text-sm flex items-center gap-2">
                            <MapPin size={14} />
                            {course.location.address}
                        </p>
                    </section>

                </div>


                {/* RIGHT: Sticky Booking Sidebar */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="sticky top-28 bg-white rounded-2xl border border-neutral-200 shadow-xl shadow-neutral-200/50 p-6 flex flex-col gap-6">

                        {/* Price & Action */}
                        <div>
                            <span className="text-neutral-500 font-medium mb-1 block">Green Fees from</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-neutral-900">£{course.greenFee.min}</span>
                                <span className="text-neutral-500">to £{course.greenFee.max}</span>
                            </div>
                        </div>

                        <Link
                            href={course.bookingLink || "#"}
                            target="_blank"
                            className="w-full bg-[#2dc653] hover:bg-[#25a544] text-white font-bold py-4 rounded-xl text-center transition-colors shadow-lg shadow-green-500/20"
                        >
                            Book a Tee Time
                        </Link>

                        <hr className="border-neutral-100" />

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-neutral-900">Contact the Club</h3>

                            {course.website && (
                                <a href={course.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 group">
                                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                                        <ExternalLink size={18} />
                                    </div>
                                    <span className="font-medium underline decoration-neutral-300 underline-offset-4">Visit Website</span>
                                </a>
                            )}

                            {course.email && (
                                <a href={`mailto:${course.email}`} className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 group">
                                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <span className="font-medium underline decoration-neutral-300 underline-offset-4">{course.email}</span>
                                </a>
                            )}

                            {course.phone && (
                                <a href={`tel:${course.phone}`} className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 group">
                                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <span className="font-medium underline decoration-neutral-300 underline-offset-4">{course.phone}</span>
                                </a>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
