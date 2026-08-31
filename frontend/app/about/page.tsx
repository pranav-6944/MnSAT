"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import ParticleField from "@/components/ParticleField";

/* ── Team Members ── */
const TEAM = [
  {
    name: "Pranav Lamkhade",
    role: "Data Science Lead & Model Architect",
    desc: "Designs the SpectralMnNet architecture, leads the deep learning pipeline, and handles satellite data preprocessing strategy.",
    avatar: "PL",
    color: "var(--accent-cyan)",
  },
  {
    name: "Akash Barge",
    role: "Data Science & Data Pipeline",
    desc: "Manages satellite data acquisition from USGS/Copernicus, builds preprocessing pipelines, and handles band ratio calculations.",
    avatar: "AB",
    color: "var(--accent-purple)",
  },
  {
    name: "Payal Bajantri",
    role: "Data Science & Evaluation",
    desc: "Drives model evaluation, metrics visualization, Kaggle notebook development, and accuracy benchmarking against geological data.",
    avatar: "PB",
    color: "var(--accent-orange)",
  },
  {
    name: "Atharav Jagdhane",
    role: "Data Science & Backend",
    desc: "Builds the FastAPI backend, inference pipeline, geospatial services, and connects the deep learning model to the web platform.",
    avatar: "AJ",
    color: "var(--accent-cyan)",
  },
  {
    name: "Shreya Babde",
    role: "Software & Frontend Lead",
    desc: "Leads Next.js development, builds the 3D globe, Three.js animations, and creates the interactive dashboard experience.",
    avatar: "SB",
    color: "var(--accent-purple)",
  },
  {
    name: "Prachi Dhere",
    role: "Software & UI/UX",
    desc: "Designs the visual system, builds reusable components, ensures responsive design, and crafts the dashboard user interface.",
    avatar: "PD",
    color: "var(--accent-orange)",
  },
];

/* ── Tech Stack ── */
const TECH_STACK = [
  { category: "Frontend", items: ["Next.js 14", "Three.js", "React Three Fiber", "GSAP", "Framer Motion", "Leaflet.js"] },
  { category: "Deep Learning", items: ["PyTorch", "Vision Transformer", "ResNet-50", "U-Net", "Focal Loss"] },
  { category: "Geospatial", items: ["Rasterio", "GDAL", "GeoPandas", "GeoJSON", "Leaflet"] },
  { category: "Data Sources", items: ["Landsat 8/9", "Sentinel-2", "ASTER", "Resourcesat-2", "GSI Maps"] },
  { category: "Backend", items: ["FastAPI", "Python", "NumPy", "scikit-image", "REST API"] },
  { category: "DevOps", items: ["Kaggle GPU", "Git", "Vercel", "Railway", "Docker"] },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="hero"
        style={{ minHeight: "55vh", paddingTop: "var(--nav-height)" }}
      >
        <ParticleField count={35} />
        <div
          className="glow-orb orange"
          style={{ width: 350, height: 350, bottom: "10%", left: "-5%" }}
        />
        <div className="hero-content" style={{ paddingTop: "var(--space-16)" }}>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            👋 Meet the Team
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            About <span className="text-gradient">MnSAT</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A Smart India Hackathon project combining artificial intelligence
            with space technology to revolutionize mineral exploration in India.
          </motion.p>
        </div>
      </section>

      {/* ── Problem Statement ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <SectionHeader
            label="The Mission"
            title="Why Manganese Matters"
          />
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              display: "grid",
              gap: "var(--space-6)",
            }}
          >
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>
                🏭 Industrial Significance
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Manganese is the <strong style={{ color: "var(--text-white)" }}>4th most traded metal</strong> globally
                and is critical for <strong style={{ color: "var(--text-white)" }}>steel production</strong> (90% of manganese
                goes into steelmaking), <strong style={{ color: "var(--text-white)" }}>battery technology</strong> (electric vehicle
                batteries use manganese-rich cathodes), and <strong style={{ color: "var(--text-white)" }}>electronics</strong>.
                India, as a rapidly industrializing economy, needs reliable domestic sources.
              </p>
            </motion.div>

            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>
                🌍 The Exploration Gap
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                India ranks <strong style={{ color: "var(--text-white)" }}>5th globally</strong> in manganese production
                with estimated reserves of <strong style={{ color: "var(--text-white)" }}>430 million tonnes</strong>.
                Yet, vast areas remain <strong style={{ color: "var(--text-white)" }}>unexplored</strong> due to the prohibitive cost
                (₹10-50 lakh per site) and time (months per region) of traditional geological surveys.
                Our AI + satellite approach can analyze entire states in hours.
              </p>
            </motion.div>

            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>
                🛰️ Space Technology Advantage
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Satellites like <strong style={{ color: "var(--accent-cyan)" }}>Landsat</strong>,{" "}
                <strong style={{ color: "var(--accent-cyan)" }}>Sentinel-2</strong>, and{" "}
                <strong style={{ color: "var(--accent-cyan)" }}>ISRO&apos;s Resourcesat-2</strong>{" "}
                capture Earth&apos;s surface in multiple spectral bands. Manganese minerals have{" "}
                <strong style={{ color: "var(--text-white)" }}>unique absorption signatures</strong> that can be detected
                from orbit, enabling large-scale, non-invasive mineral exploration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            label="Our Team"
            title="Built by Passionate Innovators"
            subtitle="Six students combining expertise in data science, deep learning, and software engineering to solve a national challenge."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="glass-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                style={{ display: "flex", gap: "var(--space-5)", alignItems: "flex-start" }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    minWidth: 56,
                    borderRadius: "var(--border-radius-md)",
                    background: `${member.color}15`,
                    border: `1px solid ${member.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "var(--text-lg)",
                    color: member.color,
                  }}
                >
                  {member.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-1)" }}>
                    {member.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: member.color,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {member.role}
                  </p>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack Section ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <SectionHeader
            label="Technology"
            title="Our Tech Stack"
            subtitle="Purpose-built with cutting-edge technologies across every layer of the platform."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {TECH_STACK.map((stack, i) => (
              <motion.div
                key={stack.category}
                className="glass-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h4
                  style={{
                    fontSize: "var(--text-lg)",
                    marginBottom: "var(--space-4)",
                    color: "var(--accent-cyan)",
                  }}
                >
                  {stack.category}
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-2)",
                  }}
                >
                  {stack.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "var(--space-1) var(--space-3)",
                        background: "var(--border-subtle)",
                        borderRadius: "var(--border-radius-full)",
                        fontSize: "var(--text-xs)",
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
