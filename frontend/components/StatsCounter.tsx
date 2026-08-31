"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2000,
  isVisible,
}: StatItem & { duration?: number; isVisible: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * value);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration, isVisible]);

  return (
    <span className="stat-value">
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface StatsCounterProps {
  stats: StatItem[];
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card stat-card">
          <AnimatedNumber {...stat} isVisible={isVisible} />
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
