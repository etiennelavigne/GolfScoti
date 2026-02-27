"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isLightMode = pathname === "/explore"; // Force dark text/logos on these pages

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowDarkElements = isScrolled || isLightMode;

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : isLightMode ? "bg-white py-3 border-b border-neutral-100" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-12 w-48 transition-opacity hover:opacity-90">
          <Image
            src="/images/logos/logo-white-horizontal.png"
            alt="GolfScoti"
            fill
            className={cn("object-contain object-left", shouldShowDarkElements ? "opacity-0 invisible" : "opacity-100 visible")}
            priority
          />
          <Image
            src="/images/logos/logo-scrolled.png"
            alt="GolfScoti"
            fill
            className={cn("object-contain object-left absolute top-0 left-0", shouldShowDarkElements ? "opacity-100 visible" : "opacity-0 invisible")}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {["Explore", "Membership", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#2dc653]",
                shouldShowDarkElements ? "text-neutral-600" : "text-white/90"
              )}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "font-medium hover:bg-white/10",
              shouldShowDarkElements ? "text-neutral-700 hover:text-black hover:bg-neutral-100" : "text-white hover:text-white"
            )}
          >
            Log In
          </Button>
          <Button
            size="sm"
            className="bg-[#2dc653] text-white hover:bg-[#25a244] font-semibold shadow-lg shadow-green-900/20"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
