import { Hero } from "@/components/home/Hero";
import { SearchPreview } from "@/components/home/SearchPreview";
import { IndexMatcher } from "@/components/home/IndexMatcher";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { ValueProps } from "@/components/home/ValueProps";
import { CallToAction } from "@/components/home/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Hero />
      <SearchPreview />
      <FeaturedCourses />
      <IndexMatcher />
      <ValueProps />
      <CallToAction />
    </main>
  );
}
