"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin, PoundSterling } from "lucide-react";
import { useState } from "react";

export function SearchPreview() {
    const [price, setPrice] = useState(250);

    return (
        <div className="relative z-20 -mt-24 container mx-auto px-4 mb-20 animate-fade-in-up delay-200">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-5xl mx-auto border border-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">

                    {/* Row 1 */}
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
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Max Price</label>
                            <span className="text-sm font-bold text-[#2dc653]">£{price}</span>
                        </div>
                        <div className="relative h-12 flex items-center bg-neutral-50 border border-neutral-200 rounded-md px-3">
                            <PoundSterling className="absolute left-3 h-4 w-4 text-neutral-400" />
                            <input type="range" min="0" max="500" step="10" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2dc653] ml-6" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Environment</label>
                        <div className="relative">
                            <select className="w-full h-12 pl-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2dc653] appearance-none cursor-pointer">
                                <option value="">Any Environment</option>
                                <option value="seaside">Seaside</option>
                                <option value="inland">Inland</option>
                            </select>
                            <div className="absolute right-3 top-4 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Type</label>
                        <div className="relative">
                            <select className="w-full h-12 pl-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2dc653] appearance-none cursor-pointer">
                                <option value="">Any Type</option>
                                <option value="links">Links</option>
                                <option value="parkland">Parkland</option>
                                <option value="historic">Historic</option>
                                <option value="modern">Modern</option>
                            </select>
                            <div className="absolute right-3 top-4 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Difficulty</label>
                        <div className="relative">
                            <select className="w-full h-12 pl-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2dc653] appearance-none cursor-pointer">
                                <option value="">Any Difficulty</option>
                                <option value="1">1 - Easy</option>
                                <option value="3">3 - Moderate</option>
                                <option value="5">5 - Hard</option>
                            </select>
                            <div className="absolute right-3 top-4 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider ml-1">Prestige</label>
                        <div className="relative">
                            <select className="w-full h-12 pl-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2dc653] appearance-none cursor-pointer">
                                <option value="">Any Prestige</option>
                                <option value="1">Hidden Gem</option>
                                <option value="3">Established</option>
                                <option value="5">World Class</option>
                            </select>
                            <div className="absolute right-3 top-4 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 flex items-center h-full pt-6">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-[#2dc653] rounded border-neutral-300 focus:ring-[#2dc653] transition duration-150 ease-in-out" />
                            <span className="text-sm font-medium text-neutral-700 group-hover:text-[#2dc653] transition-colors">Tour Course</span>
                        </label>
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
