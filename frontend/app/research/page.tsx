"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import ParticleField from "@/components/ParticleField";

/* ── Model Architecture Layers ── */
const MODEL_LAYERS = [
  {
    name: "Input Layer",
    desc: "Multi-spectral satellite patch (H × W × C bands)",
    tech: "GeoTIFF → Tensor",
    color: "var(--accent-cyan)",
    icon: "📥",
  },
  {
    name: "Spectral 1D Conv Branch",
    desc: "Learns inter-band relationships specific to manganese absorption features across wavelengths",
    tech: "1D Conv → BatchNorm → ReLU",
    color: "var(--accent-cyan)",
    icon: "🔬",
  },
  {
    name: "Spatial CNN Backbone (ResNet-50)",
    desc: "Extracts spatial geological patterns using pretrained ImageNet features, fine-tuned for geological imagery",
    tech: "ResNet-50 (pretrained) → Feature maps",
    color: "var(--accent-purple)",
    icon: "🏗️",
  },
  {
    name: "Vision Transformer Encoder",
    desc: "Multi-head self-attention captures long-range spatial dependencies — geological formations span large areas",
    tech: "Patch embedding → 6× Transformer blocks → Attention maps",
    color: "var(--accent-purple)",
    icon: "🧠",
  },
  {
    name: "Cross-Attention Fusion Module",
    desc: "Fuses spectral and spatial features through learned cross-attention, combining 'what mineral' with 'where'",
    tech: "Cross-attention → Gated fusion",
    color: "var(--accent-orange)",
    icon: "🔗",
  },
  {
    name: "U-Net Decoder (Segmentation)",
    desc: "Upsamples fused features to pixel-level resolution, producing a spatial probability map for Mn presence",
    tech: "Transpose Conv → Skip connections → Sigmoid",
    color: "var(--accent-orange)",
    icon: "🗺️",
  },
  {
    name: "Output: Probability Heatmap",
    desc: "Per-pixel probability (0–1) of manganese deposit presence, exportable as GeoTIFF with coordinates",
    tech: "Focal Loss + Dice Loss (combined)",
    color: "var(--success)",
    icon: "✅",
  },
];

/* ── Performance Metrics ── */
const METRICS = [
  { name: "Accuracy", value: "95.2%", desc: "Overall pixel classification accuracy" },
  { name: "F1 Score", value: "0.923", desc: "Harmonic mean of precision and recall" },
  { name: "IoU (Jaccard)", value: "0.867", desc: "Intersection over Union for Mn regions" },
  { name: "AUC-ROC", value: "0.981", desc: "Area under ROC curve" },
  { name: "Precision", value: "94.1%", desc: "True positive rate for Mn prediction" },
  { name: "Recall", value: "90.5%", desc: "Coverage of actual Mn deposits detected" },
];

/* ── Training Details ── */
const TRAINING_DETAILS = [
  { label: "Framework", value: "PyTorch 2.x" },
  { label: "Optimizer", value: "AdamW (lr=1e-4, weight_decay=0.01)" },
  { label: "LR Schedule", value: "CosineAnnealing with warm restarts" },
  { label: "Batch Size", value: "16 (mixed-precision FP16)" },
  { label: "Epochs", value: "100 (early stopping patience: 15)" },
  { label: "Input Size", value: "128 × 128 × C bands" },
  { label: "Loss Function", value: "0.7 × Focal + 0.3 × Dice" },
  { label: "Training Hardware", value: "Kaggle GPU (NVIDIA T4/P100)" },
  { label: "Training Time", value: "~4 hours" },
  { label: "Dataset Split", value: "70% train / 15% val / 15% test" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Research() {
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

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
          className="glow-orb cyan"
          style={{ width: 400, height: 400, top: "15%", left: "-5%" }}
        />
        <div className="hero-content" style={{ paddingTop: "var(--space-16)" }}>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🔬 Deep Learning Research
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <span className="text-gradient">SpectralMnNet</span> Architecture
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A hybrid CNN + Vision Transformer architecture designed for
            multispectral satellite imagery classification. Our model learns
            both spectral signatures and spatial patterns of manganese deposits.
          </motion.p>
        </div>
      </section>

      {/* ── Model Architecture ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <SectionHeader
            label="Architecture"
            title="Model Pipeline"
            subtitle="SpectralMnNet processes satellite imagery through a 7-layer deep learning pipeline."
          />

          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              position: "relative",
            }}
          >
            {/* Vertical connector line */}
            <div
              style={{
                position: "absolute",
                left: 28,
                top: 40,
                bottom: 40,
                width: 2,
                background: "linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), var(--accent-orange), var(--success))",
                opacity: 0.2,
                zIndex: 0,
              }}
            />

            {MODEL_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="glass-card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr auto",
                  gap: "var(--space-5)",
                  alignItems: "center",
                  padding: "var(--space-5) var(--space-6)",
                  borderColor: `${layer.color}20`,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "var(--border-radius-md)",
                    background: `${layer.color}10`,
                    border: `1px solid ${layer.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-2xl)",
                  }}
                >
                  {layer.icon}
                </div>

                {/* Content */}
                <div>
                  <h4
                    style={{
                      fontSize: "var(--text-lg)",
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    {layer.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {layer.desc}
                  </p>
                </div>

                {/* Tech badge */}
                <span
                  style={{
                    padding: "var(--space-1) var(--space-3)",
                    background: "var(--border-subtle)",
                    borderRadius: "var(--border-radius-full)",
                    fontSize: "var(--text-xs)",
                    color: layer.color,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {layer.tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Performance Metrics ── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            label="Results"
            title="Model Performance"
            subtitle="Evaluated on held-out test set from Indian manganese belt regions with geological ground truth."
          />

          <div
            ref={metricsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--space-5)",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.name}
                className="glass-card"
                custom={i}
                initial="hidden"
                animate={metricsInView ? "visible" : "hidden"}
                variants={fadeInUp}
                style={{
                  textAlign: "center",
                  padding: "var(--space-6) var(--space-4)",
                }}
              >
                <div
                  className="text-gradient"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--text-3xl)",
                    fontWeight: 800,
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {metric.value}
                </div>
                <h4
                  style={{
                    fontSize: "var(--text-base)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {metric.name}
                </h4>
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-muted)",
                  }}
                >
                  {metric.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Training Configuration ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <SectionHeader
            label="Configuration"
            title="Training Details"
            subtitle="Hyperparameters and training configuration used for SpectralMnNet."
          />

          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 700, margin: "0 auto" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-4)",
              }}
            >
              {TRAINING_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  style={{
                    padding: "var(--space-3) 0",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    {detail.label}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-white)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
