"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ── Manganese Reserve Locations (lat, lon) ── */
const MANGANESE_REGIONS = [
  { name: "Odisha", lat: 21.5, lon: 84.0, size: 0.04, color: "#FF6D00" },
  { name: "Maharashtra", lat: 20.0, lon: 79.5, size: 0.035, color: "#FF6D00" },
  { name: "Madhya Pradesh", lat: 23.5, lon: 80.0, size: 0.03, color: "#FF9100" },
  { name: "Karnataka", lat: 14.5, lon: 76.5, size: 0.025, color: "#FF9100" },
  { name: "Rajasthan", lat: 25.5, lon: 73.5, size: 0.025, color: "#FFB300" },
  { name: "Andhra Pradesh", lat: 15.9, lon: 79.7, size: 0.02, color: "#FFB300" },
  { name: "Jharkhand", lat: 23.3, lon: 85.3, size: 0.02, color: "#FFB300" },
  { name: "Gujarat", lat: 22.3, lon: 71.2, size: 0.018, color: "#FFCA28" },
  { name: "Goa", lat: 15.4, lon: 74.0, size: 0.015, color: "#FFCA28" },
];

/* ── Convert lat/lon to 3D position on sphere ── */
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

/* ── Glowing Reserve Marker ── */
function ReserveMarker({
  lat,
  lon,
  radius,
  size,
  color,
}: {
  lat: number;
  lon: number;
  radius: number;
  size: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVector3(lat, lon, radius), [lat, lon, radius]);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + lat) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={pos}>
      {/* Core dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Glow ring */}
      <mesh>
        <ringGeometry args={[size * 1.2, size * 2, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ── Satellite Orbit Ring ── */
function SatelliteOrbit({
  radius,
  tilt,
  color,
  speed,
}: {
  radius: number;
  tilt: number;
  color: string;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);

  const orbitPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )
      );
    }
    return points;
  }, [radius]);

  useFrame(({ clock }) => {
    if (satelliteRef.current) {
      const t = clock.getElapsedTime() * speed;
      satelliteRef.current.position.x = Math.cos(t) * radius;
      satelliteRef.current.position.z = Math.sin(t) * radius;
    }
  });

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(orbitPoints);
  }, [orbitPoints]);

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {/* Orbit path */}
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.15} />
      </line>
      {/* Satellite dot */}
      <mesh ref={satelliteRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* ── Atmosphere Glow ── */
function Atmosphere() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(0.0, 0.9, 1.0, 1.0) * intensity;
    }
  `;

  return (
    <Sphere args={[1.08, 64, 64]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
      />
    </Sphere>
  );
}

/* ── Main Earth Globe ── */
function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  const EARTH_RADIUS = 1.0;

  // Continuous rotation
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  // Generate grid lines for the globe (wireframe earth look)
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const points: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 5) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        const x = -(EARTH_RADIUS * Math.sin(phi) * Math.cos(theta));
        const y = EARTH_RADIUS * Math.cos(phi);
        const z = EARTH_RADIUS * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
      lines.push(points);
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 20) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        const x = -(EARTH_RADIUS * Math.sin(phi) * Math.cos(theta));
        const y = EARTH_RADIUS * Math.cos(phi);
        const z = EARTH_RADIUS * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
      lines.push(points);
    }

    return lines;
  }, []);

  return (
    <group ref={earthRef}>
      {/* Base globe sphere */}
      <Sphere args={[EARTH_RADIUS, 64, 64]}>
        <meshPhongMaterial
          color="#0a1628"
          emissive="#061020"
          specular="#00E5FF"
          shininess={5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Grid wireframe */}
      {gridLines.map((points, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#00E5FF" transparent opacity={0.08} />
          </line>
        );
      })}

      {/* Manganese reserve markers */}
      {MANGANESE_REGIONS.map((region) => (
        <ReserveMarker
          key={region.name}
          lat={region.lat}
          lon={region.lon}
          radius={EARTH_RADIUS + 0.01}
          size={region.size}
          color={region.color}
        />
      ))}

      {/* Atmosphere glow */}
      <Atmosphere />

      {/* Satellite orbits */}
      <SatelliteOrbit radius={1.4} tilt={0.5} color="#00E5FF" speed={0.4} />
      <SatelliteOrbit radius={1.6} tilt={-0.3} color="#7C4DFF" speed={0.3} />
      <SatelliteOrbit radius={1.8} tilt={0.8} color="#FF6D00" speed={0.25} />
    </group>
  );
}

/* ── Scene Setup ── */
function Scene() {
  const { camera } = useThree();
  
  // Set initial camera position
  useMemo(() => {
    camera.position.set(0, 0.5, 2.8);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} color="#E0E6ED" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#00E5FF" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Earth */}
      <Earth />

      {/* Controls - limited interaction, globe auto-rotates */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3 / 4}
      />
    </>
  );
}

/* ── Exported Globe Component ── */
export default function Globe3D({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
