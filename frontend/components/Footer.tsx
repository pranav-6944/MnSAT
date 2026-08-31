"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" className="navbar-logo" style={{ marginBottom: "var(--space-2)" }}>
              <span className="navbar-logo-icon">Mn</span>
              <span>
                Mn<span className="text-gradient">SAT</span>
              </span>
            </Link>
            <p className="footer-brand-desc">
              Leveraging AI and satellite remote sensing to discover manganese reserves across India. 
              A Smart India Hackathon innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/dashboard/predict">Analyze Data</Link></li>
              <li><Link href="/dashboard/regions">Explore Regions</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="footer-heading">Learn</h4>
            <ul className="footer-links">
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/research">Research & Model</Link></li>
              <li><Link href="/about">About the Team</Link></li>
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="footer-heading">Technology</h4>
            <ul className="footer-links">
              <li><a href="https://pytorch.org" target="_blank" rel="noopener noreferrer">PyTorch</a></li>
              <li><a href="https://www.usgs.gov/landsat-missions" target="_blank" rel="noopener noreferrer">Landsat (USGS)</a></li>
              <li><a href="https://www.isro.gov.in" target="_blank" rel="noopener noreferrer">ISRO</a></li>
            </ul>
          </div>
        </div>

        <div className="glow-line" />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MnSAT — Smart India Hackathon Project</p>
          <p>
            Built with 🧠 AI + 🛰️ Space Tech
          </p>
        </div>
      </div>
    </footer>
  );
}
