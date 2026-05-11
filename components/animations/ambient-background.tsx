"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function NeuralMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.08;
      group.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.14;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 22 }).map((_, index) => {
        const angle = (index / 22) * Math.PI * 2;
        const radius = 1.2 + (index % 5) * 0.22;
        return (
          <Float key={index} speed={1.4 + index * 0.02} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(index) * 0.7, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.025 + (index % 3) * 0.012, 16, 16]} />
              <meshBasicMaterial color={index % 2 ? "#67e8f9" : "#a78bfa"} transparent opacity={0.75} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(103,232,249,.14),transparent_30%),radial-gradient(circle_at_90%_15%,rgba(167,139,250,.16),transparent_25%),#05060a]" />
      <div className="grid-field absolute inset-0 animate-grid opacity-45" />
      <motion.div
        className="absolute -left-28 top-10 h-96 w-96 rounded-full bg-cyan-400/12 blur-3xl"
        animate={{ x: [0, 120, 30], y: [0, 60, -20], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-violet-500/14 blur-3xl"
        animate={{ x: [0, -90, 0], y: [0, -70, 20], scale: [1, 1.18, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
          <Stars radius={80} depth={35} count={1200} factor={3} saturation={0} fade speed={0.45} />
          <NeuralMesh />
        </Canvas>
      </div>
      <div className="noise" />
    </div>
  );
}
