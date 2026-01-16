"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin, PoundSterling } from "lucide-react";

export function SearchPreview() {
    return (
        <div className="relative z-20 -mt-24 container mx-auto px-4 mb-20 animate-fade-in-up delay-200">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-5xl mx-auto border border-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Region</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400" />
                            <select className="w-full h-12 pl-9 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2dc653] appearance-none cursor-pointer">
                                <option value="">All Scotland</option>
                                <option value="standrews">St Andrews & Fife</option>
                                <option value="highlands">Highlands</option>
                                <option value="edinburgh">Edinburgh & East</option>
                                <option value="west">West Coast</option>
                            </select>
                            <div className="absolute right-3 top-4 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Budget</label>
                        <div className="relative">
                            <PoundSterling className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400" />
                            <select className="w-full h-12 pl-9 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2dc653] appearance-none cursor-pointer">
                                <option value="">Any Budget</option>
                                <option value="economy">£ - Budget Friendly</option>
                                <option value="standard">££ - Standard</option>
                                <option value="premium">£££ - Premium</option>
                                <option value="luxury">££££ - Luxury</option>
                            </select>
                            <div className="absolute right-3 top-4 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Course Type</label>
                        <div className="relative">
                            <select className="w-full h-12 pl-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2dc653] appearance-none cursor-pointer">
                                <option value="">Any Type</option>
                                <option value="links">Links</option>
                                <option value="parkland">Parkland</option>
                                <option value="heathland">Heathland</option>
                            </select>
                            <div className="absolute right-3 top-4 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end">
                        <Button className="w-full h-12 bg-[#2dc653] hover:bg-[#25a244] text-lg font-medium shadow-md shadow-green-900/10">
                            <Search className="mr-2 h-5 w-5" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
