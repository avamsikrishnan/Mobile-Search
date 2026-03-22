"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCompare } from "@/lib/CompareContext";
import { phones } from "@/data/phones";
import { Phone } from "@/types/phone";
import PhoneImage from "@/components/PhoneImage";

export default function ComparePage() {
  const { compareList, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const availablePhones = phones.filter(
    (p) => !compareList.some((c) => c.id === p.id)
  );
  const filteredAvailable = searchQuery
    ? availablePhones.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availablePhones;

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-7xl mb-6">⚖️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Side-by-Side Comparison
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          Add up to 3 phones to compare specs, features, and reviews side by side. Browse phones and click the compare button to get started.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/phones"
            className="px-6 py-3 rounded-xl font-medium gradient-bg text-white hover:opacity-90 transition-opacity"
          >
            Browse Phones
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Quick Add Phones
          </button>
        </div>

        {showAddModal && (
          <AddPhoneModal
            phones={filteredAvailable}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAdd={(phone) => {
              addToCompare(phone);
              if (compareList.length >= 2) setShowAddModal(false);
            }}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </div>
    );
  }

  const specRows = buildSpecRows(compareList);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Side-by-Side Comparison</h1>
          <p className="text-gray-500 mt-1">
            Comparing {compareList.length} phone{compareList.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-3">
          {compareList.length < 3 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Phone
            </button>
          )}
          <button
            onClick={clearCompare}
            className="px-4 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Phone Headers */}
      <div className="glass-card overflow-hidden mb-6">
        <div className={`grid grid-cols-${compareList.length} divide-x divide-gray-100`} style={{gridTemplateColumns: `repeat(${compareList.length}, 1fr)`}}>
          {compareList.map((phone) => (
            <div key={phone.id} className="p-6 text-center relative group">
              <button
                onClick={() => removeFromCompare(phone.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex justify-center mb-4">
                <PhoneImage phone={phone} className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{phone.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl font-bold gradient-text">${phone.price}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">{phone.rating}</span>
                <span className="text-xs text-gray-400">({phone.reviewCount.toLocaleString()})</span>
              </div>
              <Link
                href={`/phones/${phone.id}`}
                className="inline-block mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Details &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Spec Comparison Table */}
      <div className="glass-card overflow-hidden">
        {specRows.map((section, sIdx) => (
          <div key={section.title}>
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                {section.title}
              </h3>
            </div>
            {section.rows.map((row, rIdx) => (
              <div
                key={row.label}
                className={`grid border-b border-gray-50 ${rIdx % 2 === 0 ? "" : "bg-gray-50/50"}`}
                style={{gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)`}}
              >
                <div className="px-6 py-3 text-sm font-medium text-gray-500">
                  {row.label}
                </div>
                {row.values.map((val, vIdx) => {
                  const isBest = row.bestIndex === vIdx;
                  return (
                    <div
                      key={vIdx}
                      className={`px-6 py-3 text-sm text-center ${
                        isBest ? "font-bold text-green-600" : "text-gray-700"
                      }`}
                    >
                      {val}
                      {isBest && row.values.filter((v, i) => v !== val || i === vIdx).length > 1 && (
                        <span className="ml-1 text-green-500">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pros & Cons Comparison */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pros & Cons</h2>
        <div className="grid gap-6" style={{gridTemplateColumns: `repeat(${compareList.length}, 1fr)`}}>
          {compareList.map((phone) => (
            <div key={phone.id} className="glass-card p-6">
              <h3 className="font-bold text-gray-900 mb-4">{phone.name}</h3>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-green-600 mb-2">Pros</h4>
                <ul className="space-y-1.5">
                  {phone.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-500 mb-2">Cons</h4>
                <ul className="space-y-1.5">
                  {phone.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-red-500 mt-0.5">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddPhoneModal
          phones={filteredAvailable}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAdd={(phone) => {
            addToCompare(phone);
            if (compareList.length >= 2) setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

function AddPhoneModal({
  phones,
  searchQuery,
  setSearchQuery,
  onAdd,
  onClose,
}: {
  phones: Phone[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAdd: (phone: Phone) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Add Phone to Compare</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phones..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            autoFocus
          />
        </div>
        <div className="overflow-y-auto max-h-[50vh] p-3">
          {phones.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No phones available to add</p>
          ) : (
            <div className="space-y-2">
              {phones.map((phone) => (
                <button
                  key={phone.id}
                  onClick={() => onAdd(phone)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <PhoneImage phone={phone} className="w-12 h-12" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{phone.name}</div>
                    <div className="text-sm text-gray-500">{phone.brand} &middot; ${phone.price}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SpecRow {
  label: string;
  values: string[];
  bestIndex?: number;
}

interface SpecSection {
  title: string;
  rows: SpecRow[];
}

function buildSpecRows(phoneList: Phone[]): SpecSection[] {
  const sections: SpecSection[] = [
    {
      title: "Display",
      rows: [
        { label: "Screen Size", values: phoneList.map((p) => p.specs.display.size), bestIndex: findBestNumeric(phoneList.map((p) => parseFloat(p.specs.display.size)), "max") },
        { label: "Type", values: phoneList.map((p) => p.specs.display.type) },
        { label: "Resolution", values: phoneList.map((p) => p.specs.display.resolution) },
        { label: "Refresh Rate", values: phoneList.map((p) => p.specs.display.refreshRate) },
        { label: "Brightness", values: phoneList.map((p) => p.specs.display.brightness), bestIndex: findBestNumeric(phoneList.map((p) => parseInt(p.specs.display.brightness)), "max") },
      ],
    },
    {
      title: "Performance",
      rows: [
        { label: "Chipset", values: phoneList.map((p) => p.specs.processor.chipset) },
        { label: "RAM", values: phoneList.map((p) => p.specs.memory.ram), bestIndex: findBestNumeric(phoneList.map((p) => parseInt(p.specs.memory.ram)), "max") },
        { label: "Storage", values: phoneList.map((p) => p.specs.memory.storage) },
      ],
    },
    {
      title: "Camera",
      rows: [
        { label: "Main", values: phoneList.map((p) => p.specs.camera.main), bestIndex: findBestNumeric(phoneList.map((p) => parseInt(p.specs.camera.main)), "max") },
        { label: "Ultrawide", values: phoneList.map((p) => p.specs.camera.ultrawide) },
        { label: "Telephoto", values: phoneList.map((p) => p.specs.camera.telephoto || "N/A") },
        { label: "Front", values: phoneList.map((p) => p.specs.camera.front) },
        { label: "Video", values: phoneList.map((p) => p.specs.camera.video) },
      ],
    },
    {
      title: "Battery & Charging",
      rows: [
        { label: "Capacity", values: phoneList.map((p) => p.specs.battery.capacity), bestIndex: findBestNumeric(phoneList.map((p) => parseInt(p.specs.battery.capacity)), "max") },
        { label: "Charging", values: phoneList.map((p) => p.specs.battery.charging), bestIndex: findBestNumeric(phoneList.map((p) => parseInt(p.specs.battery.charging)), "max") },
        { label: "Wireless", values: phoneList.map((p) => p.specs.battery.wireless ? "Yes" : "No") },
      ],
    },
    {
      title: "Connectivity",
      rows: [
        { label: "5G", values: phoneList.map((p) => p.specs.connectivity.fiveG ? "Yes" : "No") },
        { label: "Wi-Fi", values: phoneList.map((p) => p.specs.connectivity.wifi) },
        { label: "Bluetooth", values: phoneList.map((p) => p.specs.connectivity.bluetooth) },
        { label: "USB", values: phoneList.map((p) => p.specs.connectivity.usb) },
      ],
    },
    {
      title: "Design & Build",
      rows: [
        { label: "Weight", values: phoneList.map((p) => p.specs.dimensions.weight), bestIndex: findBestNumeric(phoneList.map((p) => parseInt(p.specs.dimensions.weight)), "min") },
        { label: "Thickness", values: phoneList.map((p) => p.specs.dimensions.thickness), bestIndex: findBestNumeric(phoneList.map((p) => parseFloat(p.specs.dimensions.thickness)), "min") },
        { label: "Water Resistance", values: phoneList.map((p) => p.specs.waterResistance) },
        { label: "Biometrics", values: phoneList.map((p) => p.specs.biometrics.join(", ")) },
        { label: "OS", values: phoneList.map((p) => p.specs.os) },
      ],
    },
    {
      title: "Value",
      rows: [
        { label: "Price", values: phoneList.map((p) => `$${p.price}`), bestIndex: findBestNumeric(phoneList.map((p) => p.price), "min") },
        { label: "Rating", values: phoneList.map((p) => `${p.rating}/5`), bestIndex: findBestNumeric(phoneList.map((p) => p.rating), "max") },
        { label: "Reviews", values: phoneList.map((p) => p.reviewCount.toLocaleString()), bestIndex: findBestNumeric(phoneList.map((p) => p.reviewCount), "max") },
      ],
    },
  ];

  return sections;
}

function findBestNumeric(values: number[], direction: "min" | "max"): number | undefined {
  if (values.length <= 1) return undefined;
  const allSame = values.every((v) => v === values[0]);
  if (allSame) return undefined;
  const best = direction === "max" ? Math.max(...values) : Math.min(...values);
  return values.indexOf(best);
}
