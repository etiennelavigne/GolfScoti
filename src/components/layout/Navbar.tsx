"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lightModePages = ["/explore", "/sign-in", "/sign-up"];
  const isLightMode = lightModePages.includes(pathname); // Force dark text/logos on these pages

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
        <div className="flex gap-4 items-center">
          <SignedOut>
            <Link
              href="/sign-in"
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-3 hover:bg-white/10",
                shouldShowDarkElements ? "text-neutral-700 hover:text-black hover:bg-neutral-100" : "text-white hover:text-white"
              )}
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors h-9 px-3 bg-[#2dc653] text-white hover:bg-[#25a244] font-semibold shadow-lg shadow-green-900/20"
            >
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#2dc653]",
                  shouldShowDarkElements ? "text-neutral-600" : "text-white/90"
                )}
              >
                Profile
              </Link>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
