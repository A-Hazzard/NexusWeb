'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, color, shape }: { position: [number, number, number], color: string, shape: 'sphere' | 'box' | 'torus' }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.3
  })

  const ShapeComponent = shape === 'sphere' ? Sphere : shape === 'box' ? Box : Torus

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <ShapeComponent
        ref={meshRef}
        position={position}
        args={shape === 'torus' ? [0.5, 0.2, 16, 32] : [0.5, 0.5, 0.5]}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </ShapeComponent>
    </Float>
  )
}

export default function FloatingGeometry() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <FloatingShape position={[-2, 2, 0]} color="#FF8A00" shape="sphere" />
        <FloatingShape position={[2, -1, -1]} color="#FF4D00" shape="box" />
        <FloatingShape position={[0, 1, -2]} color="#6366F1" shape="torus" />
        <FloatingShape position={[-1, -2, 1]} color="#8B5CF6" shape="sphere" />
        <FloatingShape position={[3, 0, 0]} color="#06B6D4" shape="box" />
      </Canvas>
    </div>
  )
}
