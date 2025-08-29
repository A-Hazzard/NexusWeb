'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Nexus Web Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-[#1a1a2e]">Nexus Web</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300"
            >
              Portfolio
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="bg-[#1a1a2e] text-white px-4 py-2 rounded-md hover:bg-[#FF8A00] hover:text-[#1a1a2e] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1a1a2e] hover:text-[#FF8A00] transition-colors duration-300 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-[#FF8A00] transition-colors duration-300 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="bg-[#1a1a2e] text-white px-4 py-2 mx-4 rounded-md hover:bg-[#FF8A00] hover:text-[#1a1a2e] transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 