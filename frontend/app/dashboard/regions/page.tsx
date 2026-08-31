"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";

/* ── All Region Data with Deep Details ── */
const REGIONS = [
  {
    id: "odisha",
    name: "Odisha",
    state: "Eastern India",
    reserves: "116M tonnes",
    percentage: 44,
    minerals: ["Pyrolusite", "Psilomelane", "Braunite", "Rhodonite"],
    districts: ["Keonjhar", "Sundergarh", "Koraput", "Kalahandi", "Jajpur"],
    status: "High Confidence",
    geology:
      "Iron Ore Supergroup — Precambrian manganese formations associated with banded iron formations (BIF). The Gangpur Group and Bonai-Keonjhar belt host major deposits.",
    significance: "Largest manganese producer in India, contributing ~44% of national output.",
    color: "#FF6D00",
    gradient: "linear-gradient(135deg, #FF6D00, #FF9100)",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    state: "Western India",
    reserves: "45M tonnes",
    percentage: 17,
    minerals: ["Pyrolusite", "Cryptomelane", "Manganite", "Wad"],
    districts: ["Nagpur", "Bhandara", "Ratnagiri", "Sindhudurg"],
    status: "High Confidence",
    geology:
      "Sausar Group — Manganese ore occurs in metamorphosed sedimentary rocks. Nagpur-Bhandara belt is the primary zone with gondite-type manganese ore.",
    significance: "Second largest producer, historically one of the first regions mined for manganese in India.",
    color: "#FF6D00",
    gradient: "linear-gradient(135deg, #FF6D00, #FF8F00)",
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    state: "Central India",
    reserves: "32M tonnes",
    percentage: 12,
    minerals: ["Pyrolusite", "Wad", "Psilomelane", "Lithiophorite"],
    districts: ["Balaghat", "Chhindwara", "Jhabua", "Dhar"],
    status: "Moderate Confidence",
    geology:
      "Sausar Group (extension from Maharashtra) — The Balaghat mine is one of the deepest underground manganese mines in Asia. Deposits occur in gondite series.",
    significance: "Houses the famous Bharweli mine (Balaghat) — one of Asia's deepest manganese mines.",
    color: "#FF9100",
    gradient: "linear-gradient(135deg, #FF9100, #FFB300)",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    state: "Southern India",
    reserves: "28M tonnes",
    percentage: 11,
    minerals: ["Pyrolusite", "Braunite", "Manganite", "Hollandite"],
    districts: ["Shimoga", "Bellary", "North Kanara", "Chitradurga"],
    status: "Moderate Confidence",
    geology:
      "Dharwar Supergroup — Archean greenstone belt with sedimentary manganese deposits. The Shimoga-Bellary belt contains significant oxide-type manganese ores.",
    significance: "Ancient geological formations (3+ billion years old) with well-preserved manganese deposits.",
    color: "#FF9100",
    gradient: "linear-gradient(135deg, #FF9100, #FFB300)",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    state: "Western India",
    reserves: "22M tonnes",
    percentage: 8,
    minerals: ["Pyrolusite", "Ramsdellite", "Hausmannite"],
    districts: ["Banswara", "Udaipur", "Jaipur"],
    status: "Under Analysis",
    geology:
      "Aravalli Supergroup — One of the oldest mountain ranges in the world. Manganese deposits occur in the Banswara-Udaipur belt within metamorphosed sediments.",
    significance: "Emerging manganese province with potential for new discoveries using satellite analysis.",
    color: "#FFB300",
    gradient: "linear-gradient(135deg, #FFB300, #FFCA28)",
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    state: "Southern India",
    reserves: "15M tonnes",
    percentage: 6,
    minerals: ["Pyrolusite", "Psilomelane", "Wad"],
    districts: ["Visakhapatnam", "Srikakulam", "Vizianagaram"],
    status: "Under Analysis",
    geology:
      "Eastern Ghats Belt — Manganese deposits in khondalite series, associated with high-grade metamorphic rocks. The Vizag belt has both oxide and silicate ores.",
    significance: "Strategically important for east coast industrial development and port access.",
    color: "#FFB300",
    gradient: "linear-gradient(135deg, #FFB300, #FFCA28)",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Regions() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "var(--nav-height)" }}>
        <section className="section">
          <div className="container">
            <SectionHeader
              label="Region Explorer"
              title="India's Manganese Belts"
              subtitle="Detailed analysis of India's primary manganese-bearing geological formations, enriched with AI predictions and geological context."
            />

            {/* Summary Bar */}
            <div
              className="glass-card"
              style={{
                display: "flex",
                justifyContent: "space-around",
                textAlign: "center",
                marginBottom: "var(--space-12)",
                padding: "var(--space-6) var(--space-8)",
                flexWrap: "wrap",
                gap: "var(--space-4)",
              }}
            >
              {[
                { val: "6", label: "Regions" },
                { val: "258M", label: "Tonnes Total" },
                { val: "44%", label: "From Odisha" },
                { val: "23+", label: "Districts" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-gradient"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--text-2xl)",
                      fontWeight: 800,
                    }}
                  >
                    {s.val}
                  </div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Region Cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-8)",
              }}
            >
              {REGIONS.map((region, i) => (
                <motion.div
                  key={region.id}
                  className="glass-card"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "280px 1fr",
                    gap: "var(--space-8)",
                    borderColor: `${region.color}15`,
                    padding: "var(--space-8)",
                  }}
                >
                  {/* Left — Key Stats */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-4)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                          padding: "var(--space-1) var(--space-3)",
                          background: `${region.color}15`,
                          border: `1px solid ${region.color}30`,
                          borderRadius: "var(--border-radius-full)",
                          fontSize: "var(--text-xs)",
                          color: region.color,
                          fontWeight: 600,
                          marginBottom: "var(--space-3)",
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: region.color,
                          }}
                        />
                        {region.status}
                      </div>
                      <h3 style={{ fontSize: "var(--text-2xl)" }}>{region.name}</h3>
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                        {region.state}
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "var(--text-3xl)",
                          fontWeight: 800,
                          background: region.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {region.reserves}
                      </div>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                        {region.percentage}% of India&apos;s total reserves
                      </p>
                      <div
                        style={{
                          width: "100%",
                          height: 6,
                          background: "var(--border-subtle)",
                          borderRadius: "var(--border-radius-full)",
                          marginTop: "var(--space-2)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${region.percentage}%`,
                            height: "100%",
                            background: region.gradient,
                            borderRadius: "var(--border-radius-full)",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: "var(--text-xs)",
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Minerals
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "var(--space-2)",
                          marginTop: "var(--space-2)",
                        }}
                      >
                        {region.minerals.map((m) => (
                          <span
                            key={m}
                            style={{
                              padding: "2px var(--space-2)",
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
                  </div>

                  {/* Right — Details */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-5)",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "var(--text-base)",
                          color: "var(--accent-cyan)",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        Geological Context
                      </h4>
                      <p
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--text-secondary)",
                          lineHeight: 1.7,
                        }}
                      >
                        {region.geology}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: "var(--text-base)",
                          color: "var(--accent-purple)",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        Significance
                      </h4>
                      <p
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--text-secondary)",
                          lineHeight: 1.7,
                        }}
                      >
                        {region.significance}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: "var(--text-base)",
                          color: "var(--accent-orange)",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        Key Districts
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "var(--space-2)",
                        }}
                      >
                        {region.districts.map((d) => (
                          <span
                            key={d}
                            style={{
                              padding: "var(--space-1) var(--space-3)",
                              background: `${region.color}08`,
                              border: `1px solid ${region.color}20`,
                              borderRadius: "var(--border-radius-full)",
                              fontSize: "var(--text-xs)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            📍 {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Back to Dashboard */}
            <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
              <Link href="/dashboard" className="btn btn-secondary btn-lg">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
