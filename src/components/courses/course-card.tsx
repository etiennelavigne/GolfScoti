import { GolfCourse } from "@/types/golf-course";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Trophy, Wind } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
    course: GolfCourse;
    isFavorite?: boolean;
    onToggleFavorite?: (id: string) => void;
}

export function CourseCard({ course, isFavorite, onToggleFavorite }: CourseCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full bg-white dark:bg-card border-none shadow-md">
            <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                {/* Placeholder image logic - in real app use course.images[0] */}
                <div className="absolute inset-0 flex items-center justify-center text-neutral-300 bg-neutral-100">
                    {/* Fallback if no image */}
                    <span className="text-sm font-medium">No Image Available</span>
                </div>

                {/* Helper to show actual image if available */}
                {course.images[0] && (
                    <Image
                        src={course.images[0]}
                        alt={course.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}

                {/* Gradient Overlay for text readability if we put text over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 z-10">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9 rounded-full bg-white/95 hover:bg-white text-foreground shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite?.(course.id);
                        }}
                    >
                        <Heart className={`h-5 w-5 ${isFavorite ? "fill-[#2dc653] text-[#2dc653]" : "text-neutral-400"}`} />
                    </Button>
                </div>

                {course.isTourCourse && (
                    <div className="absolute top-3 left-3">
                        <Badge variant="accent" className="bg-neutral-900/90 backdrop-blur-sm text-white border-none shadow-md gap-1 px-2.5 py-1">
                            <Trophy className="w-3.5 h-3.5 text-neutral-400" />
                            Tour Course
                        </Badge>
                    </div>
                )}
            </div>

            <CardHeader className="p-4 pb-2 space-y-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-primary line-clamp-1" title={course.name}>{course.name}</h3>
                    {/* Visual match score placeholder */}
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0">
                        98% Match
                    </span>
                </div>
                <div className="flex items-center text-muted-foreground text-xs gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{course.location.distanceFromStAndrews} miles from St Andrews</span>
                </div>
            </CardHeader>

            <CardContent className="p-4 py-2 flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                    {course.environment === "Seaside" && (
                        <Badge variant="outline" className="gap-1 text-xs border-blue-200 bg-blue-50 text-blue-700">
                            <Wind className="w-3 h-3" /> Seaside
                        </Badge>
                    )}
                    {course.type.map(t => (
                        <Badge key={t} variant="outline" className="text-xs border-neutral-200 bg-neutral-50 text-neutral-600">
                            {t}
                        </Badge>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600 mt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400">Green Fee</span>
                        <span className="font-medium">£{course.greenFee.min} - £{course.greenFee.max}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400">Duration</span>
                        <span className="font-medium">{course.averagePlayTime}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-2 border-t border-border/50 bg-neutral-50/50">
                <Button className="w-full text-xs h-9 bg-primary hover:bg-primary/90">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
