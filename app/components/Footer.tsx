'use client';

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="Nexus Web Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">Nexus Web</span>
            </div>
            <p className="text-gray-400">
              Premier web development agency in Trinidad and Tobago, crafting extraordinary digital experiences since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#web-design" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  Web Design & Development
                </Link>
              </li>
              <li>
                <Link href="/services#seo" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  SEO & Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services#ecommerce" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  E-Commerce Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-gray-400 hover:text-[#FF8A00] transition-colors duration-300">
                  Website Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a href="mailto:nexuswebtt@gmail.com" className="hover:text-[#FF8A00] transition-colors duration-300">
                  nexuswebtt@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <a href="tel:+18683521435" className="hover:text-[#FF8A00] transition-colors duration-300">
                  +1 (868) 352-1435
                </a>
              </li>
              <li className="text-gray-400">Trinidad and Tobago</li>
              <li className="text-gray-400">Founded August 2024</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nexus Web. All rights reserved. | Designed & Developed by Aaron Hazzard</p>
        </div>
      </div>
    </footer>
  );
} 