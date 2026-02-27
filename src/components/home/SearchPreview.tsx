"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin, PoundSterling, TreePine, Flag } from "lucide-react";
import { useState } from "react";

export function SearchPreview() {
    const [price, setPrice] = useState(250);

    return (
        <div className="relative z-20 -mt-24 container mx-auto px-4 mb-20 animate-fade-in-up delay-200">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-7xl mx-auto border border-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 gap-y-8 items-end">

                    {/* Row 1 */}
                    <div className="space-y-2 relative group">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Region</label>
                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-neutral-400 group-hover:text-[#2dc653] transition-colors pointer-events-none" />
                            <select className="w-full h-12 pl-11 pr-10 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#2dc653]/20 focus:border-[#2dc653] transition-all duration-200 appearance-none cursor-pointer shadow-sm relative">
                                <option value="">All Scotland</option>
                                <option value="standrews">St Andrews & Fife</option>
                                <option value="highlands">Highlands</option>
                                <option value="edinburgh">Edinburgh & East</option>
                                <option value="west">West Coast</option>
                            </select>
                            <div className="absolute right-3.5 top-4 pointer-events-none text-neutral-400 group-hover:text-[#2dc653] transition-colors">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 relative group">
                        <div className="flex justify-between items-center px-1 mb-1">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Max Price</label>
                            <span className="text-sm font-bold text-[#2dc653]">£{price}</span>
                        </div>
                        <div className="relative h-12 flex items-center bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl px-4 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-[#2dc653]/20 focus-within:border-[#2dc653]">
                            <PoundSterling className="absolute left-3.5 h-5 w-5 text-neutral-400 group-hover:text-[#2dc653] transition-colors pointer-events-none" />
                            <input type="range" min="0" max="500" step="10" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2dc653] pl-6 ml-6 focus:outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2 relative group">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Environment</label>
                        <div className="relative">
                            <TreePine className="absolute left-3.5 top-3.5 h-5 w-5 text-neutral-400 group-hover:text-[#2dc653] transition-colors pointer-events-none" />
                            <select className="w-full h-12 pl-11 pr-10 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#2dc653]/20 focus:border-[#2dc653] transition-all duration-200 appearance-none cursor-pointer shadow-sm relative">
                                <option value="">Any Environment</option>
                                <option value="seaside">Seaside</option>
                                <option value="inland">Inland</option>
                            </select>
                            <div className="absolute right-3.5 top-4 pointer-events-none text-neutral-400 group-hover:text-[#2dc653] transition-colors">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="space-y-2 relative group">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Difficulty</label>
                        <div className="relative">
                            <Flag className="absolute left-3.5 top-3.5 h-5 w-5 text-neutral-400 group-hover:text-[#2dc653] transition-colors pointer-events-none" />
                            <select className="w-full h-12 pl-11 pr-10 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#2dc653]/20 focus:border-[#2dc653] transition-all duration-200 appearance-none cursor-pointer shadow-sm relative">
                                <option value="">Any Difficulty</option>
                                <option value="1">1 - Easy</option>
                                <option value="3">3 - Moderate</option>
                                <option value="5">5 - Hard</option>
                            </select>
                            <div className="absolute right-3.5 top-4 pointer-events-none text-neutral-400 group-hover:text-[#2dc653] transition-colors">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>


                    <div className="flex items-end">
                        <Button className="w-full h-12 bg-[#2dc653] hover:bg-[#25a244] text-lg font-medium shadow-lg shadow-green-900/20 rounded-xl transition-transform hover:scale-[1.02]">
                            <Search className="mr-2 h-5 w-5" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
