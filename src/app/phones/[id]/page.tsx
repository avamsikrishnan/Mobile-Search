"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPhoneById, phones } from "@/data/phones";
import { useCompare } from "@/lib/CompareContext";
import PhoneImage from "@/components/PhoneImage";
import PhoneCard from "@/components/PhoneCard";

export default function PhoneDetailPage() {
  const { id } = useParams();
  const phone = getPhoneById(id as string);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "pros-cons">("specs");

  if (!phone) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Phone Not Found</h1>
        <Link href="/phones" className="text-blue-600 hover:underline">
          Browse all phones
        </Link>
      </div>
    );
  }

  const inCompare = isInCompare(phone.id);
  const similarPhones = phones
    .filter((p) => p.id !== phone.id && (p.brand === phone.brand || Math.abs(p.price - phone.price) < 300))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/phones" className="hover:text-gray-700">Phones</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{phone.name}</span>
      </nav>

      {/* Hero Section */}
      <div className="glass-card overflow-hidden mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex items-center justify-center">
            <PhoneImage phone={phone} className="w-64 h-64" />
          </div>

          {/* Info Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                {phone.brand}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                {phone.specs.os}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {phone.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(phone.rating) ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm font-semibold text-gray-700">
                  {phone.rating} ({phone.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{phone.summary}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {phone.colors.map((color) => (
                <span key={color} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {color}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold gradient-text">${phone.price}</span>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  inCompare ? removeFromCompare(phone.id) : addToCompare(phone)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  inCompare
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {inCompare ? "In Compare List" : "Add to Compare"}
              </button>
              <Link
                href="/compare"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                Go to Compare
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Specs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <QuickSpec icon="📱" label="Display" value={phone.specs.display.size} sub={phone.specs.display.refreshRate} />
        <QuickSpec icon="⚡" label="Processor" value={phone.specs.processor.chipset} sub={phone.specs.memory.ram + " RAM"} />
        <QuickSpec icon="📸" label="Main Camera" value={phone.specs.camera.main.split("(")[0]} sub={phone.specs.camera.video} />
        <QuickSpec icon="🔋" label="Battery" value={phone.specs.battery.capacity} sub={phone.specs.battery.charging} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
        {(["specs", "reviews", "pros-cons"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "specs" ? "Full Specs" : tab === "reviews" ? "Reviews" : "Pros & Cons"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === "specs" && <SpecsTab phone={phone} />}
        {activeTab === "reviews" && <ReviewsTab phone={phone} />}
        {activeTab === "pros-cons" && <ProsConsTab phone={phone} />}
      </div>

      {/* Similar Phones */}
      {similarPhones.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Phones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarPhones.map((p) => (
              <PhoneCard key={p.id} phone={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function QuickSpec({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div className="glass-card p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

function SpecsTab({ phone }: { phone: ReturnType<typeof getPhoneById> }) {
  if (!phone) return null;
  const { specs } = phone;

  const specSections = [
    {
      title: "Display",
      items: [
        { label: "Screen Size", value: specs.display.size },
        { label: "Type", value: specs.display.type },
        { label: "Resolution", value: specs.display.resolution },
        { label: "Refresh Rate", value: specs.display.refreshRate },
        { label: "Peak Brightness", value: specs.display.brightness },
      ],
    },
    {
      title: "Processor",
      items: [
        { label: "Chipset", value: specs.processor.chipset },
        { label: "CPU", value: specs.processor.cpu },
        { label: "GPU", value: specs.processor.gpu },
      ],
    },
    {
      title: "Memory",
      items: [
        { label: "RAM", value: specs.memory.ram },
        { label: "Storage", value: specs.memory.storage },
        { label: "Expandable", value: specs.memory.expandable ? "Yes (microSD)" : "No" },
      ],
    },
    {
      title: "Camera",
      items: [
        { label: "Main", value: specs.camera.main },
        { label: "Ultrawide", value: specs.camera.ultrawide },
        ...(specs.camera.telephoto ? [{ label: "Telephoto", value: specs.camera.telephoto }] : []),
        { label: "Front", value: specs.camera.front },
        { label: "Video", value: specs.camera.video },
      ],
    },
    {
      title: "Battery",
      items: [
        { label: "Capacity", value: specs.battery.capacity },
        { label: "Charging", value: specs.battery.charging },
        { label: "Wireless Charging", value: specs.battery.wireless ? "Yes" : "No" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { label: "5G", value: specs.connectivity.fiveG ? "Yes" : "No" },
        { label: "Wi-Fi", value: specs.connectivity.wifi },
        { label: "Bluetooth", value: specs.connectivity.bluetooth },
        { label: "NFC", value: specs.connectivity.nfc ? "Yes" : "No" },
        { label: "USB", value: specs.connectivity.usb },
      ],
    },
    {
      title: "Design",
      items: [
        { label: "Height", value: specs.dimensions.height },
        { label: "Width", value: specs.dimensions.width },
        { label: "Thickness", value: specs.dimensions.thickness },
        { label: "Weight", value: specs.dimensions.weight },
        { label: "Water Resistance", value: specs.waterResistance },
        { label: "Biometrics", value: specs.biometrics.join(", ") },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {specSections.map((section) => (
        <div key={section.title} className="glass-card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.label} className="flex justify-between items-start">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsTab({ phone }: { phone: ReturnType<typeof getPhoneById> }) {
  if (!phone) return null;

  return (
    <div className="space-y-6">
      {phone.reviews.map((review) => (
        <div key={review.id} className="glass-card overflow-hidden">
          {review.type === "video" && review.youtubeId && (
            <div className="aspect-video bg-gray-900 relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">{review.title}</p>
                  <p className="text-gray-400 text-sm mt-1">Watch on YouTube</p>
                </div>
              </div>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    review.type === "video"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {review.type === "video" ? "VIDEO" : "ARTICLE"}
                  </span>
                  <span className="text-sm text-gray-500">{review.source}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{review.title}</h4>
                <p className="text-sm text-gray-500">by {review.author} &middot; {review.date}</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-100">
                <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm font-bold text-yellow-700">{review.rating}/10</span>
              </div>
            </div>
            <p className="text-gray-600 italic">&ldquo;{review.snippet}&rdquo;</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProsConsTab({ phone }: { phone: ReturnType<typeof getPhoneById> }) {
  if (!phone) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Pros
        </h3>
        <ul className="space-y-3">
          {phone.pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cons
        </h3>
        <ul className="space-y-3">
          {phone.cons.map((con, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <span className="text-gray-700">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
