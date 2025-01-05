"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);

      if (window.scrollY > 50) {
        setIsScrolled(true); 
      } else {
        setIsScrolled(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        isScrolled ? "bg-[#EF6C34] bg-opacity-90" : "bg-[#EF6C34] bg-opacity-100"
      } ${isVisible ? "opacity-100" : "opacity-0"} transform ${isVisible ? "translate-y-0" : "-translate-y-full"} text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-14 lg:px-16 py-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="/assets/icons/suitmedia.svg"
              alt="Suitmedia Logo"
              className="w-24 h-24"
            />
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden md:flex space-x-1">
            <Link
              href="/"
              className="relative px-3 py-2 rounded-md text-sm group"
            >
              Work
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              href="/about"
              className="relative px-3 py-2 rounded-md text-sm group"
            >
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              href="/services"
              className="relative px-3 py-2 rounded-md text-sm group"
            >
              Services
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              href="/ideas"
              className="relative px-3 py-2 rounded-md text-sm group"
            >
              Ideas
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              href="/careers"
              className="relative px-3 py-2 rounded-md text-sm group"
            >
              Careers
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              href="/contact"
              className="relative px-3 py-2 rounded-md text-sm group"
            >
              Contact
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="hover:bg-orange-300 px-3 py-2 rounded-md text-sm block"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="hover:bg-orange-300 px-3 py-2 rounded-md text-sm block"
            >
              About
            </Link>
            <Link
              href="/services"
              className="hover:bg-orange-300 px-3 py-2 rounded-md text-sm block"
            >
              Services
            </Link>
            <Link
              href="/ideas"
              className="hover:bg-orange-300 px-3 py-2 rounded-md text-sm block"
            >
              Ideas
            </Link>
            <Link
              href="/careers"
              className="hover:bg-orange-300 px-3 py-2 rounded-md text-sm block"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="hover:bg-orange-300 px-3 py-2 rounded-md text-sm block"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
