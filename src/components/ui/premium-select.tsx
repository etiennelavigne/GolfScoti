"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
    value: string;
    label: string;
}

interface PremiumSelectProps {
    label: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function PremiumSelect({ label, options, value, onChange, placeholder = "Any", className }: PremiumSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={cn("relative", className)}>
            <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9C8D7B] mb-1.5">{label}</p>
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-between w-full group"
            >
                <span className={cn("text-sm font-medium", selected ? "text-[#1C1917]" : "text-[#9C8D7B]")}>
                    {selected?.label ?? placeholder}
                </span>
                <ChevronDown className={cn(
                    "h-3.5 w-3.5 text-[#9C8D7B] transition-transform duration-200 shrink-0",
                    open && "rotate-180"
                )} />
            </button>

            {open && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-[#E5DDD3] shadow-xl mt-2 min-w-[160px]">
                    <button
                        onClick={() => { onChange(""); setOpen(false); }}
                        className={cn(
                            "w-full text-left px-4 py-3 text-sm transition-colors border-b border-[#E5DDD3] flex items-center justify-between",
                            !value ? "text-[#1C1917] font-medium bg-[#F7F4EF]" : "text-[#9C8D7B] hover:bg-[#F7F4EF]"
                        )}
                    >
                        {placeholder}
                        {!value && <Check className="h-3.5 w-3.5 text-[#1B5E35]" />}
                    </button>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => { onChange(option.value); setOpen(false); }}
                            className={cn(
                                "w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between border-b border-[#E5DDD3] last:border-b-0",
                                value === option.value
                                    ? "text-[#1C1917] font-semibold bg-[#F7F4EF]"
                                    : "text-[#1C1917] hover:bg-[#F7F4EF]"
                            )}
                        >
                            {option.label}
                            {value === option.value && <Check className="h-3.5 w-3.5 text-[#1B5E35]" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
