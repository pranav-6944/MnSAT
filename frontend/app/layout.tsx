import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MnSAT — AI + Space Tech for Manganese Reserves",
  description:
    "Leveraging deep learning and satellite remote sensing to identify manganese ore reserves across India. A Smart India Hackathon project combining AIML with space technology for geological exploration.",
  keywords: [
    "manganese reserves",
    "satellite imagery",
    "deep learning",
    "remote sensing",
    "mineral exploration",
    "space technology",
    "AI",
    "SIH",
    "Smart India Hackathon",
    "geological mapping",
  ],
  authors: [{ name: "Team MnSAT" }],
  openGraph: {
    title: "MnSAT — AI + Space Tech for Manganese Reserves",
    description:
      "Deep learning powered satellite imagery analysis for manganese ore identification across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
