import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, Environment, Stars, Sparkles, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

// Floating Nucleo Tático Logo
function NucleoLogo() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Center>
        <mesh ref={meshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Center>
    </Float>
  );
}

// 3D Text Component
function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Center position={[0, -2, 0]}>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          NÚCLEO TÁTICO
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ff00ff"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

// Data Particles System
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1000;
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
    
    colors[i] = Math.random() * 0.5 + 0.5; // R
    colors[i + 1] = Math.random() * 0.3 + 0.7; // G
    colors[i + 2] = Math.random() * 0.2 + 0.8; // B
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Interactive Grid Floor
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="#0f172a"
        emissive="#6366f1"
        emissiveIntensity={0.1}
        roughness={0.8}
        metalness={0.2}
        transparent
        opacity={0.3}
      />
      <gridHelper args={[20, 20, '#6366f1', '#6366f1']} position={[0, 0.01, 0]} />
    </mesh>
  );
}

// Cyber Orbital Rings
function OrbitalRings() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={ringsRef}>
      {[1.5, 2, 2.5, 3].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.05, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00ff9d' : '#ff00ff'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Loading Fallback
function LoadingFallback() {
  return (
    <Center>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6366f1" wireframe />
      </mesh>
    </Center>
  );
}

// Main 3D Scene Component
export function MainScene() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        className="absolute inset-0"
      >
        <color attach="background" args={['#0f172a']} />
        
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Environment */}
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Sparkles count={200} size={2} speed={0.1} opacity={0.5} color="#00ff9d" />
          
          {/* Scene Objects */}
          <NucleoLogo />
          <FloatingText />
          <DataParticles />
          <GridFloor />
          <OrbitalRings />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.8}
            maxDistance={20}
            minDistance={3}
          />
          
          {/* Post Processing Effects */}
          <EffectComposer>
            <Bloom
              intensity={1.5}
              kernelSize={KernelSize.LARGE}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.025}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.002, 0.002]}
            />
            <Vignette
              darkness={0.5}
              offset={0.3}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="glass rounded-2xl px-6 py-3 backdrop-blur-3d">
          <p className="text-neon font-cyber text-sm">
            🎮 Use mouse to orbit • Scroll to zoom • Drag to pan
          </p>
        </div>
      </div>
      
      {/* Stats Panel (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 glass rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-3d-light">3D Ready</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Scene for Performance
export function SimpleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      className="w-full h-full"
    >
      <color attach="background" args={['#0f172a']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      <OrbitControls />
    </Canvas>
  );
}

export default MainScene;