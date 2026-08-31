"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import ParticleField from "@/components/ParticleField";

/* ── Detailed Pipeline Steps ── */
const STEPS = [
  {
    number: "01",
    title: "Satellite Data Acquisition",
    subtitle: "Space-based Earth observation",
    description:
      "We acquire multispectral satellite imagery from Landsat 8/9 (USGS), Sentinel-2 (ESA/Copernicus), ASTER (NASA), and ISRO's Resourcesat-2. These satellites capture Earth's surface in multiple electromagnetic bands — from visible light to short-wave infrared (SWIR) and thermal infrared (TIR).",
    details: [
      "Landsat 8/9 — 11 bands, 30m resolution, 16-day revisit",
      "Sentinel-2 — 13 bands, 10-20m resolution, 5-day revisit",
      "ASTER — 14 bands including SWIR/TIR for mineral mapping",
      "Resourcesat-2 — ISRO's indigenous satellite with LISS-III/IV sensors",
    ],
    icon: "🛰️",
    color: "var(--accent-cyan)",
  },
  {
    number: "02",
    title: "Preprocessing & Band Engineering",
    subtitle: "Signal enhancement & feature extraction",
    description:
      "Raw satellite data undergoes atmospheric correction, radiometric calibration, and band ratio computation. We calculate specialized mineral indices that enhance the spectral signatures of manganese-bearing formations while suppressing noise from vegetation and soil.",
    details: [
      "Atmospheric correction using Dark Object Subtraction (DOS)",
      "Band ratios: Iron Oxide (B4/B2), Clay Minerals (B6/B7)",
      "NDVI masking to remove dense vegetation interference",
      "Normalization & patch extraction (64×64 / 128×128 pixels)",
    ],
    icon: "⚙️",
    color: "var(--accent-purple)",
  },
  {
    number: "03",
    title: "Deep Learning Analysis",
    subtitle: "SpectralMnNet — CNN + Vision Transformer",
    description:
      "Our custom deep learning architecture — SpectralMnNet — combines Convolutional Neural Networks (CNN) for spatial pattern extraction with Vision Transformers (ViT) for capturing long-range spectral dependencies. The model learns to identify manganese oxide signatures across all spectral bands simultaneously.",
    details: [
      "Spectral 1D Conv branch for inter-band feature learning",
      "ResNet-50 backbone (pretrained) for spatial pattern extraction",
      "Vision Transformer encoder with multi-head self-attention",
      "Cross-attention fusion module for spectral-spatial integration",
    ],
    icon: "🧠",
    color: "var(--accent-orange)",
  },
  {
    number: "04",
    title: "Probability Heatmap Generation",
    subtitle: "Pixel-level prediction mapping",
    description:
      "The model outputs pixel-level probability maps showing the likelihood of manganese presence at each location. A U-Net decoder architecture enables precise spatial localization, generating heatmaps that can be overlaid directly onto geographical maps.",
    details: [
      "U-Net decoder for semantic segmentation output",
      "Pixel-wise probability scores (0-1) for Mn presence",
      "Post-processing: morphological operations & CRF refinement",
      "GeoTIFF output with coordinate reference system (CRS) metadata",
    ],
    icon: "🗺️",
    color: "var(--accent-cyan)",
  },
  {
    number: "05",
    title: "Validation & Reporting",
    subtitle: "Ground truth cross-referencing",
    description:
      "Predictions are validated against known geological survey data from the Geological Survey of India (GSI) and Indian Bureau of Mines. We compute accuracy metrics (F1 Score, IoU, AUC-ROC) and generate comprehensive reports for stakeholders.",
    details: [
      "Cross-validation with GSI geological maps & known deposits",
      "Metrics: Accuracy >95%, F1 >0.92, IoU >0.85",
      "Confidence intervals for each predicted reserve zone",
      "Exportable reports with coordinates for field verification",
    ],
    icon: "✅",
    color: "var(--accent-purple)",
  },
];

/* ── Spectral Bands Explanation ── */
const SPECTRAL_BANDS = [
  { band: "Visible (0.55μm)", property: "Dark brownish-black appearance of Mn oxides", strength: 60 },
  { band: "NIR (1.0μm)", property: "Crystal field absorption in Mn minerals", strength: 75 },
  { band: "SWIR (2.0-2.3μm)", property: "Mn-OH bond vibrations — strongest indicator", strength: 95 },
  { band: "TIR (8.5-11μm)", property: "Si-O stretching in Mn silicate minerals", strength: 80 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HowItWorks() {
  const spectralRef = useRef(null);
  const spectralInView = useInView(spectralRef, { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="hero"
        style={{ minHeight: "60vh", paddingTop: "var(--nav-height)" }}
      >
        <ParticleField count={40} />
        <div className="glow-orb purple" style={{ width: 400, height: 400, top: "20%", right: "-5%" }} />
        <div className="hero-content" style={{ paddingTop: "var(--space-16)" }}>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🔬 Technical Deep-Dive
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            How <span className="text-gradient">MnSAT</span> Works
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            From satellite orbit to underground discovery — a complete walkthrough
            of our AI-powered mineral exploration pipeline.
          </motion.p>
        </div>
      </section>

      {/* ── Detailed Pipeline Steps ── */}
      <section className="section">
        <div className="container">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--space-12)",
                  alignItems: "center",
                  marginBottom: "var(--space-24)",
                }}
              >
                {/* Number + Info side */}
                <div style={{ order: isEven ? 1 : 2 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-4)",
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--text-6xl)",
                        fontWeight: 800,
                        opacity: 0.08,
                        lineHeight: 1,
                        color: step.color,
                      }}
                    >
                      {step.number}
                    </span>
                    <div>
                      <span
                        style={{
                          fontSize: "var(--text-xs)",
                          color: step.color,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        {step.subtitle}
                      </span>
                      <h3
                        style={{
                          fontSize: "var(--text-3xl)",
                          marginTop: "var(--space-1)",
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "var(--space-6)",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Details Card side */}
                <div
                  className="glass-card"
                  style={{
                    order: isEven ? 2 : 1,
                    borderColor: `${step.color}20`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--text-3xl)",
                      marginBottom: "var(--space-5)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: "var(--text-lg)",
                      marginBottom: "var(--space-4)",
                      color: step.color,
                    }}
                  >
                    Key Technical Details
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-3)",
                    }}
                  >
                    {step.details.map((detail) => (
                      <li
                        key={detail}
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
                            color: step.color,
                            fontSize: "var(--text-xs)",
                          }}
                        >
                          ▸
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Spectral Signatures Section ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <SectionHeader
            label="Spectral Science"
            title="How Manganese Reveals Itself"
            subtitle="Manganese minerals exhibit unique absorption features across the electromagnetic spectrum that satellites can detect from orbit."
          />

          <div
            ref={spectralRef}
            style={{
              maxWidth: 800,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
            }}
          >
            {SPECTRAL_BANDS.map((band, i) => (
              <motion.div
                key={band.band}
                className="glass-card"
                custom={i}
                initial="hidden"
                animate={spectralInView ? "visible" : "hidden"}
                variants={fadeInUp}
                style={{ padding: "var(--space-5) var(--space-6)" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "var(--text-base)",
                      color: "var(--text-white)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {band.band}
                  </h4>
                  <span
                    className="text-gradient"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                    }}
                  >
                    {band.strength}%
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {band.property}
                </p>
                {/* Progress bar */}
                <div
                  style={{
                    width: "100%",
                    height: 4,
                    background: "var(--border-subtle)",
                    borderRadius: "var(--border-radius-full)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={spectralInView ? { width: `${band.strength}%` } : {}}
                    transition={{
                      duration: 1,
                      delay: i * 0.15 + 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      height: "100%",
                      background: "var(--accent-gradient)",
                      borderRadius: "var(--border-radius-full)",
                    }}
                  />
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
