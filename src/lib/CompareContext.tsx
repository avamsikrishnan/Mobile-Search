"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Phone } from "@/types/phone";

interface CompareContextType {
  compareList: Phone[];
  addToCompare: (phone: Phone) => void;
  removeFromCompare: (phoneId: string) => void;
  clearCompare: () => void;
  isInCompare: (phoneId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Phone[]>([]);

  const addToCompare = useCallback((phone: Phone) => {
    setCompareList((prev) => {
      if (prev.length >= 3) return prev;
      if (prev.some((p) => p.id === phone.id)) return prev;
      return [...prev, phone];
    });
  }, []);

  const removeFromCompare = useCallback((phoneId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== phoneId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const isInCompare = useCallback(
    (phoneId: string) => compareList.some((p) => p.id === phoneId),
    [compareList]
  );

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
