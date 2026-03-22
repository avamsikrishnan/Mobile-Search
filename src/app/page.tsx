"use client";

import React, { useState } from "react";
import Link from "next/link";
import { phones } from "@/data/phones";
import PhoneCard from "@/components/PhoneCard";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPhones = phones.slice(0, 3);
  const topRated = [...phones].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const bestValue = [...phones].sort((a, b) => a.price - b.price).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/phones?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-[0.03]" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              AI-Powered Phone Discovery
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              Find Your{" "}
              <span className="gradient-text animate-gradient">Perfect</span>
              <br />
              Mobile Phone
            </h1>

            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto text-balance">
              Search, compare, and discover the ideal phone for you. Take our quiz, compare specs side-by-side, and chat with our AI assistant.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 gradient-bg rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur" />
                <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200">
                  <svg className="w-5 h-5 text-gray-400 ml-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search phones by name, brand, or feature..."
                    className="flex-1 px-4 py-4 text-lg bg-transparent outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className="m-2 px-6 py-2.5 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-gray-400">Popular:</span>
              {["iPhone 16", "Galaxy S25", "Pixel 9", "Best camera phone", "Under $500"].map((tag) => (
                <Link
                  key={tag}
                  href={`/phones?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            href="/quiz"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Best For Me Quiz"
            description="Answer 6 simple questions and get personalized phone recommendations based on your needs and preferences."
            gradient="from-yellow-400 to-orange-500"
            tag="Unique Feature"
          />
          <FeatureCard
            href="/compare"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            }
            title="Side-by-Side Compare"
            description="Place up to 3 phones side by side to compare every spec, feature, and review in a detailed comparison view."
            gradient="from-blue-400 to-indigo-500"
            tag="Unique Feature"
          />
          <FeatureCard
            href="/chat"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
            title="AI Follow-up Chat"
            description="Ask any question about phones and get intelligent, detailed answers. Like having a phone expert in your pocket."
            gradient="from-purple-400 to-pink-500"
            tag="Unique Feature"
          />
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Rated</h2>
            <p className="text-gray-500 mt-1">Highest-rated phones by experts and users</p>
          </div>
          <Link href="/phones?sort=rating" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRated.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* Best Value Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Best Value</h2>
            <p className="text-gray-500 mt-1">Great phones that won&apos;t break the bank</p>
          </div>
          <Link href="/phones?sort=price-asc" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestValue.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 text-center text-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Not sure which phone to pick?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Take our 2-minute quiz and let our AI find the perfect match based on your unique needs.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Take the Quiz
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  href,
  icon,
  title,
  description,
  gradient,
  tag,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  tag: string;
}) {
  return (
    <Link href={href} className="glass-card hover-lift p-6 group block">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-purple-50 text-purple-600 border border-purple-100">
          {tag}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </Link>
  );
}
