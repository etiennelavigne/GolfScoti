"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";

interface UserContextType {
  plan: "free" | "premium";
  favorites: string[];
  toggleFavorite: (courseId: string) => boolean;
  isFavorite: (courseId: string) => boolean;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (v: boolean) => void;
}

const FREE_LIMIT = 3;

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser } = useClerkUser();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const plan: "free" | "premium" = "free"; // à connecter à un vrai plan plus tard

  // Charger les favoris depuis localStorage (clé par userId)
  useEffect(() => {
    const key = clerkUser ? `golfscoti_favorites_${clerkUser.id}` : "golfscoti_favorites_guest";
    const stored = localStorage.getItem(key);
    if (stored) setFavorites(JSON.parse(stored));
    else setFavorites([]);
  }, [clerkUser?.id]);

  const saveFavorites = (next: string[]) => {
    const key = clerkUser ? `golfscoti_favorites_${clerkUser.id}` : "golfscoti_favorites_guest";
    setFavorites(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  const toggleFavorite = (courseId: string): boolean => {
    if (favorites.includes(courseId)) {
      saveFavorites(favorites.filter((id) => id !== courseId));
      return true;
    }
    if (plan === "free" && favorites.length >= FREE_LIMIT) {
      setShowUpgradeModal(true);
      return false;
    }
    saveFavorites([...favorites, courseId]);
    return true;
  };

  const isFavorite = (courseId: string) => favorites.includes(courseId);

  return (
    <UserContext.Provider value={{ plan, favorites, toggleFavorite, isFavorite, showUpgradeModal, setShowUpgradeModal }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
