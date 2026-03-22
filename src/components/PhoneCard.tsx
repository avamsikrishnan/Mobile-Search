"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "@/types/phone";
import { useCompare } from "@/lib/CompareContext";
import PhoneImage from "./PhoneImage";

interface PhoneCardProps {
  phone: Phone;
  featured?: boolean;
}

export default function PhoneCard({ phone, featured = false }: PhoneCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(phone.id);

  return (
    <div
      className={`glass-card hover-lift overflow-hidden group ${
        featured ? "md:flex md:items-center" : ""
      }`}
    >
      <div
        className={`relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${
          featured ? "md:w-2/5 p-8" : "p-6"
        }`}
      >
        <PhoneImage
          phone={phone}
          className={featured ? "w-48 h-48" : "w-32 h-32"}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 shadow-sm">
            {phone.brand}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            inCompare ? removeFromCompare(phone.id) : addToCompare(phone);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            inCompare
              ? "bg-blue-500 text-white"
              : "bg-white/90 text-gray-400 hover:text-blue-500"
          }`}
          title={inCompare ? "Remove from compare" : "Add to compare"}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
      </div>

      <div className={`p-5 ${featured ? "md:w-3/5 md:p-8" : ""}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/phones/${phone.id}`} className="group-hover:text-blue-600 transition-colors">
            <h3 className={`font-bold text-gray-900 ${featured ? "text-xl" : "text-lg"}`}>
              {phone.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">{phone.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{phone.summary}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <SpecChip label={phone.specs.display.size} />
          <SpecChip label={phone.specs.processor.chipset.split(" ").slice(-2).join(" ")} />
          <SpecChip label={phone.specs.camera.main.split(" ")[0] + " MP"} />
          <SpecChip label={phone.specs.battery.capacity} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold gradient-text">${phone.price}</span>
          <Link
            href={`/phones/${phone.id}`}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function SpecChip({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
      {label}
    </span>
  );
}
