"use client";

import { useRef, useMemo, useState, useEffect, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ParticleFieldProps } from "@/lib/types/landing";

function Particles({ 
  density = 2500, 
  color = "#ffffff", 
  speed = 0.015,
  interactive = true 
}: ParticleFieldProps & { interactive?: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useThree();
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(density * 3);
    for (let i = 0; i < density; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, [density]);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(density * 3);
    const baseColor = new THREE.Color(color);
    const accentColor1 = new THREE.Color("#FF8A00");
    const accentColor2 = new THREE.Color("#6366F1");
    
    for (let i = 0; i < density; i++) {
      const random = Math.random();
      let selectedColor;
      
      if (random < 0.7) {
        selectedColor = baseColor;
      } else if (random < 0.85) {
        selectedColor = accentColor1;
      } else {
        selectedColor = accentColor2;
      }
      
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;
    }
    return colors;
  }, [density, color]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  useFrame((state) => {
    if (meshRef.current) {
      // Very subtle base rotation only
      meshRef.current.rotation.x += speed * 0.1;
      meshRef.current.rotation.y += speed * 0.15;
      
      // Interactive mouse effects only when interactive is true
      if (interactive) {
        const time = state.clock.getElapsedTime();
        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < density; i++) {
          const i3 = i * 3;
          
          // Subtle wave effect based on mouse position
          const mouseInfluence = 0.3;
          const waveX = Math.sin(time * 1.5 + positions[i3] * 0.05) * mouseInfluence * mousePosition.x;
          const waveY = Math.cos(time * 1.5 + positions[i3 + 1] * 0.05) * mouseInfluence * mousePosition.y;
          
          positions[i3] += waveX * 0.005;
          positions[i3 + 1] += waveY * 0.005;
          
          // Very subtle floating animation
          positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.05) * 0.002;
        }
        
        meshRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      // Very subtle breathing scale effect
      const breathe = 1 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
      meshRef.current.scale.setScalar(breathe);
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    return geo;
  }, [particlePositions, particleColors]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Logo formation particles
function LogoParticles({ visible = false }: { visible?: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const logoPositions = useMemo(() => {
    // Create a simple "N" shape for Nexus
    const positions: number[] = [];
    const scale = 3;
    
    // Vertical line 1
    for (let y = -2; y <= 2; y += 0.2) {
      positions.push(-1 * scale, y * scale, 0);
    }
    
    // Diagonal line
    for (let i = 0; i <= 1; i += 0.1) {
      positions.push((-1 + i * 2) * scale, (-2 + i * 4) * scale, 0);
    }
    
    // Vertical line 2
    for (let y = -2; y <= 2; y += 0.2) {
      positions.push(1 * scale, y * scale, 0);
    }
    
    return new Float32Array(positions);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005;
      
      const scale = visible ? 1 : 0;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
    }
  });

  const logoGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(logoPositions, 3));
    return geo;
  }, [logoPositions]);

  return (
    <points ref={meshRef} geometry={logoGeometry}>
      <pointsMaterial
        color="#FF8A00"
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ParticleFieldInner({ 
  className = "absolute inset-0 -z-10", 
  density = 2500, 
  color = "#ffffff", 
  speed = 0.015,
  interactive = true,
  showLogo = false
}: ParticleFieldProps & { interactive?: boolean; showLogo?: boolean }) {
  return (
    <div className={className}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        className="w-full h-full"
      >
        <Particles 
          density={density} 
          color={color} 
          speed={speed} 
          interactive={interactive}
        />
        {showLogo && <LogoParticles visible={showLogo} />}
      </Canvas>
    </div>
  );
}

const ParticleField = memo(ParticleFieldInner);
export default ParticleField;