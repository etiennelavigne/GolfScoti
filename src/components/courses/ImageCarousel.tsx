"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
    images: string[];
    altText: string;
}

export function ImageCarousel({ images, altText }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // If there are no images, show a grand placeholder
    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[50vh] md:h-[60vh] bg-neutral-200 flex items-center justify-center">
                <span className="text-neutral-400 text-lg font-medium">No Image Available</span>
            </div>
        );
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] group overflow-hidden">
            {/* Main Image */}
            <div
                className="w-full h-full bg-cover bg-center transition-all duration-500 ease-out"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
                {/* Overlay gradient for text readability at the top/bottom if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 lg:from-black/40 lg:to-black/20" />
            </div>

            {/* Arrows (Visible on hover on desktop, always visible on mobile) */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => setCurrentIndex(slideIndex)}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${currentIndex === slideIndex
                                    ? "w-8 h-2 bg-white"
                                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
