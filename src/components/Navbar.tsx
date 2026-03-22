"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCompare } from "@/lib/CompareContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { compareList } = useCompare();

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">MobileMatch</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/phones">Browse Phones</NavLink>
            <NavLink href="/quiz">Best For Me</NavLink>
            <NavLink href="/compare">
              Compare
              {compareList.length > 0 && (
                <span className="ml-1.5 w-5 h-5 rounded-full gradient-bg text-white text-xs flex items-center justify-center font-bold">
                  {compareList.length}
                </span>
              )}
            </NavLink>
            <NavLink href="/chat">AI Chat</NavLink>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              <MobileNavLink href="/phones" onClick={() => setMobileOpen(false)}>Browse Phones</MobileNavLink>
              <MobileNavLink href="/quiz" onClick={() => setMobileOpen(false)}>Best For Me</MobileNavLink>
              <MobileNavLink href="/compare" onClick={() => setMobileOpen(false)}>
                Compare {compareList.length > 0 && `(${compareList.length})`}
              </MobileNavLink>
              <MobileNavLink href="/chat" onClick={() => setMobileOpen(false)}>AI Chat</MobileNavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
    >
      {children}
    </Link>
  );
}
