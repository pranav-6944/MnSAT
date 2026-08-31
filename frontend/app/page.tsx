"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import SectionHeader from "@/components/SectionHeader";
import StatsCounter from "@/components/StatsCounter";

/* Dynamic import for Three.js (SSR-incompatible) */
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="loader" />
    </div>
  ),
});

/* ── Stats Data ── */
const STATS = [
  { value: 5, suffix: "th", label: "India's Global Rank in Mn Production" },
  { value: 430, suffix: "M+", label: "Tonnes of Reserves Estimated" },
  { value: 95, suffix: "%", label: "Accuracy Targeting with AI" },
  { value: 10, suffix: "×", label: "Faster Than Traditional Surveys" },
];

/* ── Features Data ── */
const FEATURES = [
  {
    icon: "🛰️",
    title: "Satellite Remote Sensing",
    description:
      "Leveraging Landsat 8/9, Sentinel-2, and ISRO Resourcesat-2 multispectral imagery to capture spectral signatures unique to manganese-bearing minerals.",
    colorClass: "",
  },
  {
    icon: "🧠",
    title: "Deep Learning AI",
    description:
      "Our SpectralMnNet model — a hybrid CNN + Vision Transformer architecture — analyzes spectral bands to identify manganese deposits with pixel-level precision.",
    colorClass: "purple",
  },
  {
    icon: "🗺️",
    title: "Geospatial Mapping",
    description:
      "AI predictions are overlaid on interactive maps, generating probability heatmaps that pinpoint potential reserves across India's manganese belts.",
    colorClass: "orange",
  },
  {
    icon: "📊",
    title: "Spectral Analysis",
    description:
      "Manganese oxides exhibit distinctive absorption at ~0.55μm, ~1.0μm, and ~2.0-2.3μm. Our model learns these signatures from labeled geological data.",
    colorClass: "",
  },
  {
    icon: "⚡",
    title: "Real-Time Inference",
    description:
      "Upload satellite imagery and receive predictions in seconds. Our optimized pipeline processes multi-band GeoTIFF data and returns actionable heatmaps.",
    colorClass: "purple",
  },
  {
    icon: "🌍",
    title: "Pan-India Coverage",
    description:
      "Pre-analyzed regions covering Odisha, Maharashtra, Madhya Pradesh, Karnataka, and Rajasthan — India's primary manganese-bearing geological formations.",
    colorClass: "orange",
  },
];

/* ── Pipeline Steps ── */
const PIPELINE_STEPS = [
  {
    number: 1,
    title: "Data Acquisition",
    description: "Satellite captures multispectral imagery of target regions",
  },
  {
    number: 2,
    title: "Preprocessing",
    description: "Atmospheric correction, band stacking & normalization",
  },
  {
    number: 3,
    title: "AI Analysis",
    description: "SpectralMnNet processes spectral bands for Mn signatures",
  },
  {
    number: 4,
    title: "Heatmap Generation",
    description: "Pixel-level probability maps showing reserve likelihood",
  },
  {
    number: 5,
    title: "Validation",
    description: "Cross-referenced with geological survey ground truth data",
  },
];

/* ── Animation Variants ── */
const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Home() {
  const featuresRef = useRef(null);
  const pipelineRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-80px" });
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO SECTION — 3D Globe
          ═══════════════════════════════════════════════════ */}
      <section className="hero">
        {/* 3D Globe background */}
        <div className="hero-canvas">
          <Globe3D />
        </div>

        {/* Particle overlay */}
        <ParticleField count={60} />

        {/* Ambient glow orbs */}
        <div
          className="glow-orb cyan"
          style={{ width: 400, height: 400, top: "10%", left: "-5%" }}
        />
        <div
          className="glow-orb purple"
          style={{ width: 350, height: 350, bottom: "10%", right: "-5%" }}
        />

        {/* Hero content overlay */}
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🛰️ Smart India Hackathon 2026
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI + Space Tech to Identify{" "}
            <span className="text-gradient-warm">Manganese Reserves</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Harnessing satellite remote sensing and deep learning to revolutionize
            mineral exploration across India. Discover hidden manganese deposits
            faster, cheaper, and at unprecedented scale.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              Explore Dashboard
            </Link>
            <Link href="/how-it-works" className="btn btn-secondary btn-lg">
              Learn How It Works
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Scroll to explore
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <SectionHeader
            label="Impact at a Glance"
            title="Transforming Mineral Exploration"
            subtitle="India holds vast untapped manganese reserves. Our AI-powered approach dramatically accelerates the discovery process."
          />
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <SectionHeader
            label="Our Approach"
            title="Where Space Meets Intelligence"
            subtitle="A comprehensive pipeline combining satellite imagery, deep learning, and geospatial analytics to identify manganese-bearing formations."
          />

          <div ref={featuresRef} className="features-grid">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="glass-card feature-card"
                custom={i}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <div className={`feature-icon ${feature.colorClass}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PIPELINE SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <SectionHeader
            label="Pipeline"
            title="From Satellite to Discovery"
            subtitle="A 5-step automated pipeline that transforms raw satellite data into actionable mineral reserve predictions."
          />

          <div ref={pipelineRef} className="pipeline-steps">
            {PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="glass-card pipeline-step"
                custom={i}
                initial="hidden"
                animate={pipelineInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="pipeline-step-connector" />
                )}
                <div className="pipeline-step-number">{step.number}</div>
                <h4
                  style={{
                    fontSize: "var(--text-lg)",
                    marginBottom: "var(--space-2)",
                    color: "var(--text-white)",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROBLEM STATEMENT SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <SectionHeader
            label="The Challenge"
            title="Why This Matters"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--space-6)",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {/* Problem Card */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--border-radius-md)",
                  background: "rgba(255, 82, 82, 0.1)",
                  border: "1px solid rgba(255, 82, 82, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-xl)",
                  marginBottom: "var(--space-5)",
                }}
              >
                ⚠️
              </div>
              <h3
                style={{
                  fontSize: "var(--text-xl)",
                  marginBottom: "var(--space-3)",
                  color: "var(--danger)",
                }}
              >
                Traditional Methods
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                }}
              >
                {[
                  "₹10-50 Lakh per site — prohibitively expensive",
                  "Months of fieldwork per region",
                  "Only a fraction of India surveyed",
                  "Manual geological mapping is error-prone",
                  "Limited scalability to remote areas",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      paddingLeft: "var(--space-5)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--danger)",
                      }}
                    >
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solution Card */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                borderColor: "rgba(0, 230, 118, 0.2)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--border-radius-md)",
                  background: "rgba(0, 230, 118, 0.1)",
                  border: "1px solid rgba(0, 230, 118, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-xl)",
                  marginBottom: "var(--space-5)",
                }}
              >
                ✨
              </div>
              <h3
                style={{
                  fontSize: "var(--text-xl)",
                  marginBottom: "var(--space-3)",
                  color: "var(--success)",
                }}
              >
                Our AI Solution
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                }}
              >
                {[
                  "Near-zero marginal cost per analysis",
                  "Results in seconds, not months",
                  "Pan-India coverage from space",
                  "Deep learning achieves 95%+ accuracy",
                  "Scalable to any region worldwide",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      paddingLeft: "var(--space-5)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--success)",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════ */}
      <section
        className="section"
        style={{
          background: "var(--bg-primary)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="glow-orb cyan"
          style={{
            width: 500,
            height: 500,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.08,
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "var(--space-4)",
              }}
            >
              Ready to Explore the{" "}
              <span className="text-gradient-warm">Underground?</span>
            </h2>
            <p
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--text-secondary)",
                maxWidth: 600,
                margin: "0 auto var(--space-8)",
              }}
            >
              Upload satellite imagery or explore pre-analyzed Indian manganese
              belts. Our deep learning model is ready to uncover hidden reserves.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-4)",
                flexWrap: "wrap",
              }}
            >
              <Link href="/dashboard/predict" className="btn btn-primary btn-lg">
                🚀 Start Analyzing
              </Link>
              <Link href="/dashboard/regions" className="btn btn-secondary btn-lg">
                🗺️ Explore Regions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
