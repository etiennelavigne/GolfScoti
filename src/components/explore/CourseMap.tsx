"use client";

import { useEffect, useRef } from "react";
import { GolfCourse } from "@/types/golf-course";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CourseMapProps {
    courses: GolfCourse[];
    hoveredCourseId: string | null;
}

// Custom Premium Map Pins using simple HTML/SVG inside Leaflet DivIcons
const createCustomIcon = (isActive: boolean, label: string) => {
    return L.divIcon({
        className: 'custom-map-marker',
        html: `
            <div class="relative group cursor-pointer">
                <div class="flex items-center justify-center p-2 rounded-full shadow-lg border-2 transition-all duration-300 ${isActive
                ? 'bg-[#2dc653] border-white text-white z-50 scale-110 shadow-green-900/30'
                : 'bg-white border-neutral-200 text-neutral-900 z-10 hover:border-[#2dc653] hover:text-[#2dc653]'
            }">
                    <span class="font-bold text-sm whitespace-nowrap px-1">£${label}</span>
                </div>
                ${isActive ? '<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2dc653] rotate-45 border-r border-b border-white"></div>' : ''}
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
};

export default function CourseMap({ courses, hoveredCourseId }: CourseMapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<{ [key: string]: L.Marker }>({});

    useEffect(() => {
        // Initialize map only once
        if (!mapRef.current) {
            // Default center: St Andrews roughly
            mapRef.current = L.map('map-container', {
                zoomControl: false // We can add custom zoom control later
            }).setView([56.3400, -2.8000], 8);

            // Add a clean, minimal map tile layer (CartoDB Positron is great for premium apps)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(mapRef.current);

            // Add zoom control top right instead of top left
            L.control.zoom({ position: 'topright' }).addTo(mapRef.current);
        }

        // Cleanup function for unmounting
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update markers when courses or hoveredCourseId changes
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Clear existing markers
        Object.values(markersRef.current).forEach(marker => marker.remove());
        markersRef.current = {};

        // Add new markers
        courses.forEach(course => {
            const isActive = course.id === hoveredCourseId;
            const marker = L.marker([course.location.lat, course.location.lng], {
                icon: createCustomIcon(isActive, course.greenFee.min.toString()),
                zIndexOffset: isActive ? 1000 : 0
            }).addTo(map);

            // Bind a styled popup
            const popupHtml = `
                <div class="flex flex-col w-[240px] font-sans overflow-hidden rounded-xl">
                    <div class="h-[120px] bg-neutral-200 relative">
                        <!-- We would place next/image here ideally, but raw HTML requires standard img tag. Handled via placeholder for now -->
                        <div class="absolute inset-0 flex items-center justify-center text-neutral-400 text-xs">No Image Preview</div>
                        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#2dc653] shadow-sm">
                            £${course.greenFee.min} - £${course.greenFee.max}
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <h4 class="font-bold text-base text-neutral-900 leading-tight mb-1 truncate">${course.name}</h4>
                        <div class="flex items-center text-neutral-500 text-xs mb-3">
                            <svg class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            ${course.location.address}
                        </div>
                        <a href="#" class="block w-full text-center py-2 bg-[#2dc653] hover:bg-[#25a244] text-white text-sm font-bold rounded-lg transition-colors">
                            View Details
                        </a>
                    </div>
                </div>
            `;

            marker.bindPopup(popupHtml, {
                className: 'custom-popup-wrapper',
                minWidth: 240,
                closeButton: true,
                autoClose: true
            });

            markersRef.current[course.id] = marker;
        });

        // Fit map bounds if there are courses
        if (courses.length > 0) {
            const group = new L.FeatureGroup(Object.values(markersRef.current));
            map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 12 });
        }

    }, [courses, hoveredCourseId]);

    return (
        <div id="map-container" className="w-full h-full z-0 relative" />
    );
}
