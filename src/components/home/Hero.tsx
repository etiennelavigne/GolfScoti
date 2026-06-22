"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Scotland Golf"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 pb-20">
        <div className="max-w-2xl">

          {/* Title */}
          <h1 className="font-serif font-bold text-white leading-[0.92] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)" }}>
            The Art<br />of Golf<br />Travel.
          </h1>

          {/* Separator */}
          <div className="w-10 h-px bg-[#C9A86C] mb-7" />

          {/* Subtitle */}
          <p className="text-white/55 text-base md:text-lg max-w-sm leading-relaxed mb-12 font-light tracking-wide">
            Discover Scotland&apos;s finest courses.<br />
            Built for golfers who plan with precision.
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-8 flex-wrap">
            <Link href="/explore">
              <Button className="h-12 px-10 bg-[#C9A86C] hover:bg-[#b8965a] text-white font-semibold rounded-none tracking-widest text-xs uppercase">
                Explore Courses
              </Button>
            </Link>
            <span className="text-white/35 text-xs tracking-widest uppercase">150+ courses</span>
          </div>
        </div>
      </div>

      {/* Stat bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-16 py-5 flex gap-10 md:gap-16">
          {[
            { value: "150+", label: "Courses" },
            { value: "20+", label: "Regions" },
            { value: "850+", label: "Years of history" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2.5">
              <span className="text-white font-serif font-bold text-2xl">{value}</span>
              <span className="text-white/35 text-xs tracking-wider uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
