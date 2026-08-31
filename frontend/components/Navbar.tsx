"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">

        {/* Logo */}
        <Link href="/" className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <Image src="/MnSAT_Logo.png" alt="MnSAT Logo" width={32} height={32} style={{ borderRadius: "8px" }} />
          <span>
            Mn<span className="text-gradient">SAT</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className={`navbar-links ${mobileOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`navbar-link ${
                  pathname === link.href ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/dashboard/predict" className="btn btn-primary">
              Analyze Now
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            style={
              mobileOpen
                ? { transform: "rotate(45deg) translate(5px, 5px)" }
                : {}
            }
          />
          <span style={mobileOpen ? { opacity: 0 } : {}} />
          <span
            style={
              mobileOpen
                ? { transform: "rotate(-45deg) translate(5px, -5px)" }
                : {}
            }
          />
        </button>
      </div>
    </nav>
  );
}
