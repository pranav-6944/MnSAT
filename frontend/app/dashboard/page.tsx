"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import StatsCounter from "@/components/StatsCounter";

/* ── Region Data ── */
const REGIONS = [
  {
    id: "odisha",
    name: "Odisha",
    state: "Eastern India",
    reserves: "116M tonnes",
    percentage: 44,
    minerals: ["Pyrolusite", "Psilomelane", "Braunite"],
    districts: ["Keonjhar", "Sundergarh", "Koraput", "Kalahandi"],
    status: "High Confidence",
    lat: 21.5,
    lon: 84.0,
    color: "#FF6D00",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    state: "Western India",
    reserves: "45M tonnes",
    percentage: 17,
    minerals: ["Pyrolusite", "Cryptomelane", "Manganite"],
    districts: ["Nagpur", "Bhandara", "Ratnagiri"],
    status: "High Confidence",
    lat: 20.0,
    lon: 79.5,
    color: "#FF6D00",
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    state: "Central India",
    reserves: "32M tonnes",
    percentage: 12,
    minerals: ["Pyrolusite", "Wad", "Psilomelane"],
    districts: ["Balaghat", "Chhindwara", "Jhabua"],
    status: "Moderate Confidence",
    lat: 23.5,
    lon: 80.0,
    color: "#FF9100",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    state: "Southern India",
    reserves: "28M tonnes",
    percentage: 11,
    minerals: ["Pyrolusite", "Braunite", "Manganite"],
    districts: ["Shimoga", "Bellary", "North Kanara"],
    status: "Moderate Confidence",
    lat: 14.5,
    lon: 76.5,
    color: "#FF9100",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    state: "Western India",
    reserves: "22M tonnes",
    percentage: 8,
    minerals: ["Pyrolusite", "Ramsdellite"],
    districts: ["Banswara", "Udaipur"],
    status: "Under Analysis",
    lat: 25.5,
    lon: 73.5,
    color: "#FFB300",
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    state: "Southern India",
    reserves: "15M tonnes",
    percentage: 6,
    minerals: ["Pyrolusite", "Psilomelane"],
    districts: ["Visakhapatnam", "Srikakulam"],
    status: "Under Analysis",
    lat: 15.9,
    lon: 79.7,
    color: "#FFB300",
  },
];

const DASHBOARD_STATS = [
  { value: 6, suffix: "", label: "Regions Analyzed" },
  { value: 258, suffix: "M", label: "Total Tonnes Estimated" },
  { value: 4, suffix: "", label: "High Confidence Zones" },
  { value: 12, suffix: "+", label: "Districts Covered" },
];

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "var(--nav-height)" }}>
        {/* ── Dashboard Header ── */}
        <section className="section" style={{ paddingBottom: "var(--space-8)" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "var(--space-4)",
              }}
            >
              <div>
                <SectionHeader
                  label="Dashboard"
                  title="Manganese Reserve Explorer"
                  subtitle="Explore AI-predicted manganese deposits across India's primary geological belts."
                  align="left"
                />
              </div>
              <div style={{ display: "flex", gap: "var(--space-3)", paddingTop: "var(--space-4)" }}>
                <Link href="/dashboard/predict" className="btn btn-primary">
                  🚀 Upload & Predict
                </Link>
                <Link href="/dashboard/regions" className="btn btn-secondary">
                  🗺️ All Regions
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section style={{ paddingBottom: "var(--space-12)" }}>
          <div className="container">
            <StatsCounter stats={DASHBOARD_STATS} />
          </div>
        </section>

        {/* ── Main Dashboard Grid ── */}
        <section style={{ paddingBottom: "var(--section-padding)" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 380px",
                gap: "var(--space-6)",
                minHeight: 500,
              }}
            >
              {/* Map Area (placeholder — will integrate Leaflet) */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  padding: 0,
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Map Header */}
                <div
                  style={{
                    padding: "var(--space-4) var(--space-6)",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "var(--text-lg)" }}>India — Manganese Belt Map</h3>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                      AI heatmap overlay showing predicted deposits
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "var(--space-2)" }}>
                    {["Satellite", "Heatmap", "Terrain"].map((layer) => (
                      <button
                        key={layer}
                        className="btn btn-secondary"
                        style={{
                          padding: "var(--space-1) var(--space-3)",
                          fontSize: "var(--text-xs)",
                          textTransform: "none",
                        }}
                      >
                        {layer}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder (interactive Leaflet map will be integrated) */}
                <div
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, var(--bg-deep), var(--bg-secondary))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    minHeight: 400,
                  }}
                >
                  {/* India shape placeholder with regions */}
                  <svg
                    viewBox="0 0 400 450"
                    style={{
                      width: "60%",
                      maxWidth: 300,
                      opacity: 0.6,
                    }}
                  >
                    {/* Simple India outline */}
                    <path
                      d="M200,20 L260,60 L280,100 L300,140 L320,180 L340,220 L330,260 L340,300 L320,340 L280,370 L240,400 L200,430 L160,400 L120,370 L80,340 L60,300 L70,260 L60,220 L80,180 L100,140 L120,100 L140,60 Z"
                      fill="none"
                      stroke="var(--accent-cyan)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    {/* Region dots */}
                    {REGIONS.map((region) => {
                      const x = 200 + (region.lon - 79) * 8;
                      const y = 400 - (region.lat - 8) * 20;
                      return (
                        <g key={region.id}>
                          <circle
                            cx={x}
                            cy={y}
                            r={region.percentage / 3 + 4}
                            fill={region.color}
                            opacity={selectedRegion.id === region.id ? 0.8 : 0.4}
                            onClick={() => setSelectedRegion(region)}
                            style={{ cursor: "pointer" }}
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r={region.percentage / 3 + 8}
                            fill="none"
                            stroke={region.color}
                            strokeWidth="1"
                            opacity={selectedRegion.id === region.id ? 0.5 : 0.15}
                          />
                          <text
                            x={x + region.percentage / 3 + 12}
                            y={y + 4}
                            fill="var(--text-secondary)"
                            fontSize="10"
                            fontFamily="var(--font-body)"
                          >
                            {region.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Legend */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "var(--space-4)",
                      left: "var(--space-4)",
                      background: "var(--glass-bg)",
                      backdropFilter: "var(--glass-blur)",
                      border: "var(--glass-border)",
                      borderRadius: "var(--border-radius-md)",
                      padding: "var(--space-3)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    <div style={{ color: "var(--text-muted)", marginBottom: "var(--space-2)", fontWeight: 600 }}>
                      Confidence Level
                    </div>
                    {[
                      { color: "#FF6D00", label: "High" },
                      { color: "#FF9100", label: "Moderate" },
                      { color: "#FFB300", label: "Under Analysis" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                          marginBottom: "var(--space-1)",
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: item.color,
                          }}
                        />
                        <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Map note */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "var(--space-4)",
                      right: "var(--space-4)",
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      opacity: 0.5,
                    }}
                  >
                    Interactive Leaflet map integration coming soon
                  </div>
                </div>
              </motion.div>

              {/* Region Detail Panel */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-5)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Selected Region
                  </span>
                  <h3
                    style={{
                      fontSize: "var(--text-2xl)",
                      marginTop: "var(--space-1)",
                    }}
                  >
                    {selectedRegion.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {selectedRegion.state}
                  </p>
                </div>

                <div className="glow-line" />

                {/* Reserves */}
                <div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Estimated Reserves
                  </span>
                  <div
                    className="text-gradient-warm"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--text-3xl)",
                      fontWeight: 800,
                      marginTop: "var(--space-1)",
                    }}
                  >
                    {selectedRegion.reserves}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      background: "var(--border-subtle)",
                      borderRadius: "var(--border-radius-full)",
                      marginTop: "var(--space-3)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      key={selectedRegion.id}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedRegion.percentage}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${selectedRegion.color}, #FFB300)`,
                        borderRadius: "var(--border-radius-full)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      marginTop: "var(--space-1)",
                      display: "block",
                    }}
                  >
                    {selectedRegion.percentage}% of India&apos;s total reserves
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    AI Analysis Status
                  </span>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      padding: "var(--space-1) var(--space-3)",
                      background: `${selectedRegion.color}15`,
                      border: `1px solid ${selectedRegion.color}30`,
                      borderRadius: "var(--border-radius-full)",
                      fontSize: "var(--text-xs)",
                      color: selectedRegion.color,
                      fontWeight: 600,
                      marginTop: "var(--space-2)",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: selectedRegion.color,
                      }}
                    />
                    {selectedRegion.status}
                  </div>
                </div>

                {/* Minerals */}
                <div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Manganese Minerals Found
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-2)",
                      marginTop: "var(--space-2)",
                    }}
                  >
                    {selectedRegion.minerals.map((m) => (
                      <span
                        key={m}
                        style={{
                          padding: "var(--space-1) var(--space-3)",
                          background: "var(--border-subtle)",
                          borderRadius: "var(--border-radius-full)",
                          fontSize: "var(--text-xs)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Districts */}
                <div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Key Districts
                  </span>
                  <ul
                    style={{
                      listStyle: "none",
                      marginTop: "var(--space-2)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-2)",
                    }}
                  >
                    {selectedRegion.districts.map((d) => (
                      <li
                        key={d}
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                        }}
                      >
                        <span style={{ color: "var(--accent-cyan)", fontSize: "8px" }}>●</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Region Selector */}
                <div className="glow-line" />
                <div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "var(--space-2)",
                      display: "block",
                    }}
                  >
                    Switch Region
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-2)",
                    }}
                  >
                    {REGIONS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRegion(r)}
                        className={selectedRegion.id === r.id ? "btn btn-primary" : "btn btn-secondary"}
                        style={{
                          padding: "var(--space-1) var(--space-3)",
                          fontSize: "var(--text-xs)",
                          textTransform: "none",
                        }}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
