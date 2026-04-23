"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group } from "three";

function BurgerModel() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.35;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
  });

  const ingredients = useMemo(
    () => [
      { y: 1.4, color: "#f4c430", scale: [2.5, 0.16, 2.5] as [number, number, number] },
      { y: 1.15, color: "#6dcf65", scale: [2.6, 0.12, 2.6] as [number, number, number] },
      { y: 0.88, color: "#6a3f2b", scale: [2.4, 0.22, 2.4] as [number, number, number] },
      { y: 0.6, color: "#f4c430", scale: [2.2, 0.12, 2.2] as [number, number, number] },
      { y: 0.36, color: "#8b2f2f", scale: [2.3, 0.2, 2.3] as [number, number, number] },
      { y: 0.1, color: "#d89a58", scale: [2.7, 0.28, 2.7] as [number, number, number] },
    ],
    [],
  );

  return (
    <group ref={group}>
      {ingredients.map((item) => (
        <mesh key={`${item.y}-${item.color}`} position={[0, item.y, 0]} scale={item.scale} castShadow>
          <cylinderGeometry args={[1, 1, 1, 64]} />
          <meshStandardMaterial color={item.color} roughness={0.35} metalness={0.15} />
        </mesh>
      ))}
      {[...Array(16)].map((_, index) => (
        <Float key={index} speed={1.4 + index * 0.05} rotationIntensity={0.8} floatIntensity={0.9}>
          <mesh
            position={[
              Math.sin(index) * 4,
              0.6 + (index % 6) * 0.35,
              Math.cos(index * 1.7) * 3.5,
            ]}
            scale={0.08 + (index % 3) * 0.04}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#E50914" : "#0A1F44"}
              emissive={index % 2 === 0 ? "#E50914" : "#0A1F44"}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function BurgerHero() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2.3, 8], fov: 45 }}>
      <color attach="background" args={["#0B0B0B"]} />
      <fog attach="fog" args={["#0B0B0B", 8, 20]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[7, 14, 8]} intensity={2.2} angle={0.35} penumbra={1} castShadow />
      <pointLight position={[-6, 2, -2]} color="#E50914" intensity={38} distance={14} />
      <pointLight position={[6, 1, -4]} color="#0A1F44" intensity={35} distance={14} />
      <Suspense fallback={null}>
        <BurgerModel />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
