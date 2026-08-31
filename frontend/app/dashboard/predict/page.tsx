"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";

type AnalysisStep = "upload" | "processing" | "results";

export default function Predict() {
  const [step, setStep] = useState<AnalysisStep>("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFileName(files[0].name);
      simulateAnalysis();
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      simulateAnalysis();
    }
  }, []);

  const simulateAnalysis = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("results");
    }, 3000);
  };

  const resetAnalysis = () => {
    setStep("upload");
    setFileName("");
  };

  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "var(--nav-height)" }}>
        <section className="section">
          <div className="container">
            <SectionHeader
              label="Predict"
              title="Analyze Satellite Imagery"
              subtitle="Upload multispectral satellite data (.tif, .geotiff) and let our SpectralMnNet model identify manganese deposits."
            />

            {/* ── Step Indicator ── */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--space-8)",
                marginBottom: "var(--space-12)",
              }}
            >
              {[
                { key: "upload" as AnalysisStep, label: "Upload", icon: "📤" },
                { key: "processing" as AnalysisStep, label: "Processing", icon: "⚙️" },
                { key: "results" as AnalysisStep, label: "Results", icon: "📊" },
              ].map((s, i) => (
                <div
                  key={s.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "var(--text-lg)",
                      background:
                        step === s.key
                          ? "var(--accent-gradient)"
                          : ["results"].includes(step) && i < 2
                          ? "var(--success)"
                          : "var(--border-subtle)",
                      color:
                        step === s.key || (step === "results" && i < 2)
                          ? "var(--bg-deep)"
                          : "var(--text-muted)",
                      transition: "all var(--duration-normal) var(--ease-out)",
                    }}
                  >
                    {step === "results" && i < 2 ? "✓" : s.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: step === s.key ? 600 : 400,
                      color: step === s.key ? "var(--text-white)" : "var(--text-muted)",
                    }}
                  >
                    {s.label}
                  </span>
                  {i < 2 && (
                    <div
                      style={{
                        width: 60,
                        height: 2,
                        background: "var(--border-subtle)",
                        marginLeft: "var(--space-3)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ── Upload Step ── */}
            {step === "upload" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: 700, margin: "0 auto" }}
              >
                <div
                  className="glass-card"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  style={{
                    padding: "var(--space-16) var(--space-8)",
                    textAlign: "center",
                    borderColor: isDragging ? "var(--accent-cyan)" : undefined,
                    borderStyle: "dashed",
                    borderWidth: 2,
                    cursor: "pointer",
                    transition: "all var(--duration-normal) var(--ease-out)",
                    boxShadow: isDragging ? "var(--shadow-glow-cyan)" : undefined,
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--text-5xl)",
                      marginBottom: "var(--space-4)",
                      opacity: 0.6,
                    }}
                  >
                    🛰️
                  </div>
                  <h3
                    style={{
                      fontSize: "var(--text-xl)",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {isDragging
                      ? "Drop your file here"
                      : "Drag & Drop Satellite Imagery"}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "var(--space-6)",
                    }}
                  >
                    Supports .tif, .geotiff, .tiff files (multispectral band stacks)
                  </p>
                  <label className="btn btn-primary" style={{ cursor: "pointer" }}>
                    Browse Files
                    <input
                      type="file"
                      accept=".tif,.geotiff,.tiff,.png,.jpg"
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                  </label>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      marginTop: "var(--space-4)",
                    }}
                  >
                    Max file size: 100MB • Recommended: 128×128 patches or larger
                  </p>
                </div>

                {/* Quick Demo Option */}
                <div
                  className="glass-card"
                  style={{
                    marginTop: "var(--space-6)",
                    textAlign: "center",
                    padding: "var(--space-6)",
                  }}
                >
                  <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-4)" }}>
                    Don&apos;t have satellite data? Try a demo with pre-loaded imagery:
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
                    {["Odisha (Keonjhar)", "Maharashtra (Nagpur)", "MP (Balaghat)"].map(
                      (demo) => (
                        <button
                          key={demo}
                          className="btn btn-secondary"
                          style={{ textTransform: "none" }}
                          onClick={() => {
                            setFileName(`demo_${demo.toLowerCase().replace(/[() ]/g, "_")}.tif`);
                            simulateAnalysis();
                          }}
                        >
                          📍 {demo}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Processing Step ── */}
            {step === "processing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{
                  maxWidth: 600,
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "var(--space-12) var(--space-8)",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto var(--space-6)",
                    border: "3px solid var(--border-subtle)",
                    borderTopColor: "var(--accent-cyan)",
                    borderRadius: "50%",
                  }}
                />
                <h3 style={{ marginBottom: "var(--space-3)" }}>
                  Analyzing <span className="text-gradient">{fileName}</span>
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}>
                  SpectralMnNet is processing your satellite imagery...
                </p>

                {/* Processing steps */}
                {[
                  { label: "Loading & validating bands", done: true },
                  { label: "Atmospheric correction", done: true },
                  { label: "Band ratio computation", done: true },
                  { label: "Running SpectralMnNet inference", done: false },
                  { label: "Generating probability heatmap", done: false },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.4 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                      padding: "var(--space-2) 0",
                    }}
                  >
                    <span
                      style={{
                        color: item.done ? "var(--success)" : "var(--text-muted)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {item.done ? "✓" : "○"}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--text-sm)",
                        color: item.done
                          ? "var(--text-secondary)"
                          : "var(--text-muted)",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── Results Step ── */}
            {step === "results" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Results Header */}
                <div
                  className="glass-card"
                  style={{
                    maxWidth: 900,
                    margin: "0 auto var(--space-6)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "var(--space-4)",
                  }}
                >
                  <div>
                    <h3>
                      Analysis Complete ✅
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>
                      {fileName} — processed in 3.2 seconds
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "var(--space-3)" }}>
                    <button className="btn btn-secondary" onClick={resetAnalysis}>
                      New Analysis
                    </button>
                    <button className="btn btn-primary">
                      📥 Export Results
                    </button>
                  </div>
                </div>

                {/* Results Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "var(--space-5)",
                    maxWidth: 900,
                    margin: "0 auto",
                  }}
                >
                  {/* Confidence Score */}
                  <div className="glass-card" style={{ textAlign: "center" }}>
                    <div
                      className="text-gradient"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--text-4xl)",
                        fontWeight: 800,
                      }}
                    >
                      87.3%
                    </div>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                      Mn Presence Confidence
                    </p>
                  </div>

                  {/* Area Coverage */}
                  <div className="glass-card" style={{ textAlign: "center" }}>
                    <div
                      className="text-gradient-warm"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--text-4xl)",
                        fontWeight: 800,
                      }}
                    >
                      12.4km²
                    </div>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                      Predicted Area
                    </p>
                  </div>

                  {/* Classification */}
                  <div className="glass-card" style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--text-4xl)",
                        fontWeight: 800,
                        color: "var(--success)",
                      }}
                    >
                      HIGH
                    </div>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                      Reserve Probability
                    </p>
                  </div>
                </div>

                {/* Minerals & Details */}
                <div
                  className="glass-card"
                  style={{
                    maxWidth: 900,
                    margin: "var(--space-6) auto 0",
                  }}
                >
                  <h4 style={{ marginBottom: "var(--space-4)" }}>Detected Mineral Signatures</h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "var(--space-4)",
                    }}
                  >
                    {[
                      { mineral: "Pyrolusite (MnO₂)", confidence: 92, color: "var(--accent-cyan)" },
                      { mineral: "Cryptomelane", confidence: 78, color: "var(--accent-purple)" },
                      { mineral: "Psilomelane", confidence: 65, color: "var(--accent-orange)" },
                      { mineral: "Braunite", confidence: 43, color: "var(--warning)" },
                    ].map((m) => (
                      <div key={m.mineral}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "var(--space-2)",
                          }}
                        >
                          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                            {m.mineral}
                          </span>
                          <span style={{ fontSize: "var(--text-sm)", color: m.color, fontWeight: 600 }}>
                            {m.confidence}%
                          </span>
                        </div>
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
                            animate={{ width: `${m.confidence}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              height: "100%",
                              background: m.color,
                              borderRadius: "var(--border-radius-full)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
