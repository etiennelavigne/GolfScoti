import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden">
            {/* Background Image - Using a placeholder or existing asset */}
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="St Andrews Old Course"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10 space-y-8 pt-20">
                <div className="space-y-4 animate-fade-in-up">

                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
                        Rediscover Golf in Scotland
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
                        The only decision-support platform tailored for your perfect trip.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up delay-100">
                    <Button size="lg" className="bg-[#2dc653] text-white hover:bg-[#25a244] text-lg px-8 h-14 rounded-full shadow-xl shadow-green-900/20 transition-transform hover:scale-105">
                        Start Exploring
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 h-14 rounded-full backdrop-blur-sm">
                        How it Works
                    </Button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <span className="sr-only">Scroll down</span>
                <ArrowRight className="rotate-90 h-6 w-6" />
            </div>
        </section>
    );
}
