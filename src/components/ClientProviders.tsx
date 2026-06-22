"use client";

import { UserProvider } from "@/context/UserContext";
import { UpgradeModal } from "@/components/profile/UpgradeModal";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      {children}
      <UpgradeModal />
    </UserProvider>
  );
}
