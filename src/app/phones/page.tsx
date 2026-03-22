"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { phones, allBrands, priceRange } from "@/data/phones";
import PhoneCard from "@/components/PhoneCard";
import { Phone, SortOption } from "@/types/phone";

export default function PhonesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>}>
      <PhonesPageContent />
    </Suspense>
  );
}

function PhonesPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialBrand = searchParams.get("brand") || "";
  const initialSort = (searchParams.get("sort") as SortOption) || "rating";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [priceFilter, setPriceFilter] = useState<[number, number]>(priceRange);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPhones = useMemo(() => {
    let result = [...phones];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.specs.processor.chipset.toLowerCase().includes(q) ||
          p.bestFor.some((b) => b.includes(q))
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.some((b) => p.brand.toLowerCase() === b.toLowerCase())
      );
    }

    result = result.filter(
      (p) => p.price >= priceFilter[0] && p.price <= priceFilter[1]
    );

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, selectedBrands, priceFilter, minRating, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Phones</h1>
        <p className="text-gray-500">
          Explore {phones.length} phones from top brands. Filter, sort, and find your match.
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, chipset..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="name">Name A-Z</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              showFilters
                ? "border-blue-400 bg-blue-50 text-blue-600"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {(selectedBrands.length > 0 || minRating > 0 || priceFilter[0] > priceRange[0] || priceFilter[1] < priceRange[1]) && (
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass-card p-6 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brands */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {allBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedBrands.includes(brand)
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Price Range: ${priceFilter[0]} - ${priceFilter[1]}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Min Price</label>
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={priceFilter[0]}
                    onChange={(e) =>
                      setPriceFilter([Number(e.target.value), priceFilter[1]])
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Max Price</label>
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={priceFilter[1]}
                    onChange={(e) =>
                      setPriceFilter([priceFilter[0], Number(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Minimum Rating: {minRating > 0 ? `${minRating}+` : "Any"}
              </h3>
              <div className="flex gap-2">
                {[0, 4.0, 4.3, 4.5, 4.7].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      minRating === r
                        ? "bg-yellow-400 text-yellow-900 shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {filteredPhones.length} phone{filteredPhones.length !== 1 ? "s" : ""} found
            </span>
            <button
              onClick={() => {
                setSelectedBrands([]);
                setPriceFilter(priceRange);
                setMinRating(0);
                setSearchQuery("");
              }}
              className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {filteredPhones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No phones found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={() => {
              setSelectedBrands([]);
              setPriceFilter(priceRange);
              setMinRating(0);
              setSearchQuery("");
            }}
            className="px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
