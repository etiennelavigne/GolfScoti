import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

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

                <div className="bg-white rounded-full p-2 pl-8 flex items-center max-w-2xl mx-auto shadow-2xl animate-fade-in-up delay-100 mt-10 h-20 text-left">
                    {/* Search Input */}
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1 px-1">Where?</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Ex: St Andrews, Old Course..."
                                className="w-full bg-transparent border-none p-0 text-neutral-900 font-medium placeholder:text-neutral-300 focus:ring-0 focus:outline-none text-base"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-10 w-px bg-neutral-200 mx-4" />

                    {/* Type Filter */}
                    <div className="w-48 relative">
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1 px-1">Type</label>
                        <select className="w-full bg-transparent border-none p-0 text-neutral-900 font-medium focus:ring-0 focus:outline-none cursor-pointer appearance-none text-base">
                            <option value="">Any Type</option>
                            <option value="links">Links</option>
                            <option value="parkland">Parkland</option>
                            <option value="heathland">Heathland</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <Button className="rounded-full bg-[#2dc653] hover:bg-[#25a244] w-14 h-14 shrink-0 flex items-center justify-center ml-2 shadow-lg transition-transform hover:scale-105">
                        <Search className="w-6 h-6 text-white" />
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
