"use client";

import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { X, Heart, Star, Map, Trophy } from "lucide-react";

const PREMIUM_FEATURES = [
  { icon: Heart, text: "Unlimited favorites & lists" },
  { icon: Map, text: "Advanced filter combinations" },
  { icon: Star, text: "Personalized recommendations" },
  { icon: Trophy, text: "Trip projection tools" },
];

export function UpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal } = useUser();

  if (!showUpgradeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <Heart className="h-6 w-6 text-[#2dc653]" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-neutral-900">3 favorites reached</h2>
            <p className="text-sm text-neutral-500">Free plan limit</p>
          </div>
        </div>

        <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
          Upgrade to Premium to save unlimited courses, create trip lists, and unlock advanced filters.
        </p>

        <div className="space-y-2.5 mb-6">
          {PREMIUM_FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-sm text-neutral-700">
              <Icon className="h-4 w-4 text-[#2dc653] shrink-0" />
              {text}
            </div>
          ))}
        </div>

        <Button className="w-full bg-[#2dc653] hover:bg-[#25a244] text-white font-semibold h-12 text-sm">
          Upgrade to Premium
        </Button>
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="w-full mt-3 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Continue with free plan
        </button>
      </div>
    </div>
  );
}
