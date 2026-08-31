# AI Notes — AIML + Space Tech for Manganese Reserves (SIH)

## Project Summary
- **Topic**: AIML + Space Technology to Identify Manganese Reserves
- **Type**: Smart India Hackathon (SIH) project
- **Started**: 2026-08-30
- **Timeline**: Months of time — go as deep as possible

## Team Distribution (6 Members)
| Member | Role | Primary Tasks |
|--------|------|---------------|
| Pranav Lamkhade | DS Lead + Model Arch | SpectralMnNet architecture, training pipeline, data preprocessing |
| Akash Barge | DS + Data Pipeline | Satellite data acquisition, preprocessing, band ratio calculations |
| Payal Bajantri | DS + Evaluation | Model evaluation, metrics, visualization, Kaggle notebooks |
| Atharav Jagdhane | DS + Backend | FastAPI backend, inference pipeline, geospatial services |
| Shreya Babde | Software + Frontend Lead | Next.js pages, 3D globe, Three.js, animations |
| Prachi Dhere | Software + UI/UX | Design system, components, responsiveness, dashboard UI |

## Confirmed Decisions
- Frontend: Next.js 14 + Three.js/R3F for 3D (FIRST PRIORITY)
- DL Model: SpectralMnNet (CNN + ViT hybrid, PyTorch) — train on Kaggle
- Backend: FastAPI (Python)
- Design: Dark space theme, glassmorphism, minimalist
- 3D: Both globe (continuously rotating) AND scroll animations with parallax
- Scope: Real-life practical — both upload AND predefined regions
- Mobile: Website first, mobile app decision later
- Globe: Must continuously rotate on page

## Phase Order (Updated)
1. Foundation (setup, design system, globe prototype)
2. Website Content & 3D Animations (all pages, full content)
3. Deep Learning Pipeline (data, model, training on Kaggle)
4. Backend Integration (API, inference, connection)
5. Polish & Production

## Key Technical Notes
- Manganese spectral signatures: ~0.55μm, ~1.0μm, ~2.0-2.3μm, ~8.5-11μm
- Satellite sources: Landsat 8/9, Sentinel-2, ASTER, ISRO Resourcesat-2
- Indian manganese belts: Odisha, Maharashtra, MP, Karnataka, Rajasthan
- India is 5th largest Mn producer globally
