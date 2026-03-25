import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GolfScoti | Plan Your Perfect Trip",
  description: "The ultimate decision-support platform for golfing in Scotland.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#2dc653',
          colorText: '#171717',
          colorBackground: '#F9F9F7',
          colorInputBackground: '#FFFFFF',
          colorInputText: '#171717',
          fontFamily: 'var(--font-montserrat)',
          borderRadius: '0.75rem',
        },
        elements: {
          card: "shadow-2xl border border-neutral-200/50 bg-white",
          formButtonPrimary: "font-semibold shadow-lg shadow-green-900/20 bg-[#2dc653] hover:bg-[#25a244] text-white",
          headerTitle: "font-playfair font-bold text-3xl text-primary",
          headerSubtitle: "text-neutral-500 font-medium",
          socialButtonsBlockButton: "border-neutral-200 hover:bg-neutral-50",
          formFieldInput: "border-neutral-200 focus:border-[#2dc653] focus:ring-[#2dc653]/20",
          footerActionLink: "text-[#2dc653] hover:text-[#25a244] font-semibold",
          avatarBox: "ring-2 ring-[#2dc653]/20",
          userButtonAvatarBox: "ring-2 ring-[#2dc653]/20",
          avatarImage: "hue-rotate-[225deg] saturate-[1.5]",
          userButtonPopoverCard: "shadow-xl border border-neutral-100 rounded-xl"
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${montserrat.variable} ${playfair.variable} antialiased`}
          suppressHydrationWarning
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
