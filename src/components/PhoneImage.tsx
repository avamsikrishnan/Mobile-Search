"use client";

import React from "react";
import { Phone } from "@/types/phone";

const brandColors: Record<string, { bg: string; text: string; accent: string }> = {
  Apple: { bg: "from-gray-100 to-gray-200", text: "text-gray-800", accent: "#1d1d1f" },
  Samsung: { bg: "from-blue-50 to-indigo-100", text: "text-indigo-800", accent: "#1428a0" },
  Google: { bg: "from-green-50 to-teal-100", text: "text-teal-800", accent: "#34a853" },
  OnePlus: { bg: "from-red-50 to-rose-100", text: "text-red-800", accent: "#eb0028" },
  Nothing: { bg: "from-gray-50 to-neutral-100", text: "text-gray-800", accent: "#000000" },
  Xiaomi: { bg: "from-orange-50 to-amber-100", text: "text-orange-800", accent: "#ff6900" },
};

export default function PhoneImage({
  phone,
  className = "w-32 h-32",
}: {
  phone: Phone;
  className?: string;
}) {
  const colors = brandColors[phone.brand] || brandColors.Apple;

  return (
    <div
      className={`${className} relative flex items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-12 h-12 rounded-full border-2 border-current opacity-30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 rounded-lg border border-current opacity-20" />
      </div>

      <div className="relative w-[45%] h-[75%] rounded-xl border-2 shadow-lg flex flex-col items-center justify-between py-2"
           style={{ borderColor: colors.accent, backgroundColor: `${colors.accent}10` }}>
        <div className="w-4 h-1 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.4 }} />
        <div className="text-center px-1">
          <div className="text-[8px] font-bold leading-tight truncate" style={{ color: colors.accent }}>
            {phone.brand}
          </div>
        </div>
        <div className="w-2.5 h-2.5 rounded-full border" style={{ borderColor: colors.accent, opacity: 0.5 }} />
      </div>
    </div>
  );
}
