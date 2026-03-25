import { ShieldCheck, UserCheck, CheckCircle2 } from "lucide-react";

const trustFactors = [
    {
        icon: ShieldCheck,
        title: "Unbiased & Objective",
        description: "Our GolfScoti Index is calculated using transparent data points. No paid placements, no sponsored rankings."
    },
    {
        icon: UserCheck,
        title: "By Golfers, For Golfers",
        description: "Built by a community of passionate players who understand what makes a Scottish golf trip truly unforgettable."
    },
    {
        icon: CheckCircle2,
        title: "Verified Information",
        description: "We regularly update green fees, course conditions, and visitor policies to ensure you have the most accurate details."
    }
];

const steps = [
    {
        step: "01",
        title: "Define Your Criteria",
        description: "Set your budget, preferred region, and must-have features like sea views or historic significance.",
    },
    {
        step: "02",
        title: "Compare & Match",
        description: "Our algorithm ranks courses based on your preferences, showing you the absolute best options for your trip.",
    },
    {
        step: "03",
        title: "Plan Your Itinerary",
        description: "Save your favorites, view them on our interactive map, and group them to minimize driving times.",
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* How it works section */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
                        How GolfScoti Works
                    </h2>
                    <p className="text-lg text-neutral-600">
                        Planning a golf trip to Scotland can be overwhelming. We've simplified the process into three easy steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
                    {/* Optional connecting line for desktop */}
                    <div className="hidden md:block absolute top-[32px] left-[15%] right-[15%] h-[2px] bg-neutral-100 z-0" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center bg-white px-6">
                            <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl font-bold mb-6 border-4 border-white ring-4 ring-neutral-50 shadow-sm">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-neutral-900">{step.title}</h3>
                            <p className="text-neutral-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Trust/Reassurance section */}
                <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 text-white">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">Why Trust GolfScoti?</h2>
                        <p className="text-neutral-400 text-lg">
                            We believe in transparency and complete honesty when it comes to evaluating the Home of Golf.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {trustFactors.map((factor, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-4">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <factor.icon className="w-7 h-7 text-[#2dc653]" />
                                </div>
                                <h3 className="text-xl font-semibold">{factor.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    {factor.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
