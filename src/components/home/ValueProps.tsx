import { BarChart3, Heart, Map, Search } from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Advanced Filtering",
        description: "Don't waste time scrolling. Filter by sea view, difficulty, budget, and distance from St Andrews to find your perfect match."
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
        <section className="py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
                        More Than Just a Directory
                    </h2>
                    <p className="text-lg text-neutral-600">
                        GolfScoti is built for the golfer who wants to plan, not just browse.
                        We provide the tools you need to build the perfect itinerary.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#2dc653]/10 rounded-lg flex items-center justify-center mb-6">
                                <feature.icon className="h-6 w-6 text-[#2dc653]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-neutral-900">{feature.title}</h3>
                            <p className="text-neutral-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
