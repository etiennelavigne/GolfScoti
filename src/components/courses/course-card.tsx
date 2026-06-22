import { GolfCourse } from "@/types/golf-course";
import { Heart } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
    course: GolfCourse;
    isFavorite?: boolean;
    onToggleFavorite?: (id: string) => void;
}

export function CourseCard({ course, isFavorite, onToggleFavorite }: CourseCardProps) {
    return (
        <div className="group cursor-pointer">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-[#0D2417]">
                {course.images[0] ? (
                    <Image
                        src={course.images[0]}
                        alt={course.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E35] to-[#0D2417] flex items-end p-5">
                        <span className="text-white/10 font-serif font-bold leading-none select-none"
                            style={{ fontSize: "clamp(4rem, 8vw, 6rem)" }}>
                            {course.name[0]}
                        </span>
                    </div>
                )}

                {/* Favorite */}
                <button
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite?.(course.id);
                    }}
                >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-[#C9A86C] text-[#C9A86C]" : "text-white"}`} />
                </button>

                {/* Tour badge */}
                {course.isTourCourse && (
                    <div className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase text-[#C9A86C] border border-[#C9A86C]/40 bg-black/40 backdrop-blur-sm px-2.5 py-1">
                        Tour Course
                    </div>
                )}
            </div>

            {/* Text */}
            <div>
                {/* Categories */}
                <div className="flex items-center gap-2 mb-1.5">
                    {course.type.map((t) => (
                        <span key={t} className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9C8D7B]">
                            {t}
                        </span>
                    ))}
                    {course.environment === "Seaside" && (
                        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9C8D7B]">
                            · Seaside
                        </span>
                    )}
                </div>

                {/* Name */}
                <h3 className="font-serif font-bold text-[#1C1917] text-lg leading-tight mb-1 group-hover:text-[#1B5E35] transition-colors">
                    {course.name}
                </h3>

                {/* Location */}
                <p className="text-[#9C8D7B] text-sm mb-3">
                    {course.location.distanceFromStAndrews
                        ? `${course.location.distanceFromStAndrews} km from St Andrews`
                        : course.location.address}
                </p>

                {/* Data row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E5DDD3]">
                    <span className="text-sm font-semibold text-[#1C1917]">
                        £{course.greenFee.min} – £{course.greenFee.max}
                    </span>
                    <span className="text-sm text-[#9C8D7B]">{course.averagePlayTime}</span>
                </div>
            </div>
        </div>
    );
}
