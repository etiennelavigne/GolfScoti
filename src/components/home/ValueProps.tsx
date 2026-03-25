import { BarChart3, Heart, Map, Search } from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Advanced Filtering",
        description: "Don't waste time scrolling. Filter by sea view, difficulty, budget, and distance from St Andrews."
    },
    {
        icon: Map,
        title: "Trip Projection",
        description: "Visualize your trip with our interactive map. Group courses by location and optimize your travel itinerary."
    },
    {
        icon: Heart,
        title: "Personal Space",
        description: "Save your favorites, compare them side-by-side, and build your dream wishlist for future trips."
    },
    {
        icon: BarChart3,
        title: "Data-Driven Decisions",
        description: "We rank courses based on objective criteria, not just hype. Make informed decisions for your next round."
    }
];

export function ValueProps() {
    return (
        <section className="py-24 bg-neutral-900 text-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl relative">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#2dc653]/10 blur-3xl"></div>

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
                        More Than Just a Directory
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-400">
                        GolfScoti provides advanced tools tailored for golfers to plan the perfect itinerary.
                    </p>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-[#2dc653]/10 rounded-lg flex items-center justify-center mb-6">
                                <feature.icon className="h-6 w-6 text-[#2dc653]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-neutral-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
