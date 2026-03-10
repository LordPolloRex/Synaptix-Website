import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// A component that represents a node in the AI/City network
function NetworkNode({ position, color, size = 0.15 }: { position: [number, number, number], color: string, size?: number }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </Float>
  );
}

// A component that represents data flowing between nodes
function DataPacket({ start, end, speed, color }: { start: THREE.Vector3, end: THREE.Vector3, speed: number, color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(Math.random());

  useFrame((state, delta) => {
    if (!ref.current) return;
    progress.current += delta * speed;
    if (progress.current > 1) progress.current = 0;
    
    ref.current.position.lerpVectors(start, end, progress.current);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

// A custom line component to replace Drei's Line (which can sometimes cause reconciler errors)
function ConnectionLine({ start, end, color }: { start: THREE.Vector3, end: THREE.Vector3, color: string }) {
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([start, end]);
  }, [start, end]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  );
}

// A lightweight space dust particle system to replace Drei's Stars
function SpaceDust() {
  const particles = useMemo(() => {
    const temp = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000 * 3; i++) {
      temp[i] = (Math.random() - 0.5) * 100;
    }
    return temp;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={3000}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// The central data network
function Network() {
  const nodeCount = 40;
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 15
      ));
    }
    return temp;
  }, []);

  const connections = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 60; i++) {
      const startIdx = Math.floor(Math.random() * nodes.length);
      let endIdx = Math.floor(Math.random() * nodes.length);
      while (endIdx === startIdx) endIdx = Math.floor(Math.random() * nodes.length);
      
      // Only connect if distance is relatively close to form clusters
      if (nodes[startIdx].distanceTo(nodes[endIdx]) < 8) {
        temp.push({ start: nodes[startIdx], end: nodes[endIdx] });
      }
    }
    return temp;
  }, [nodes]);

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <NetworkNode 
          key={i} 
          position={[pos.x, pos.y, pos.z]} 
          // Cyberpunk color palette: Cyan, Magenta, Blue
          color={i % 4 === 0 ? '#00ffcc' : i % 3 === 0 ? '#ff00ff' : '#0066ff'} 
          size={i % 5 === 0 ? 0.2 : 0.1}
        />
      ))}
      {connections.map((conn, i) => (
        <group key={`conn-${i}`}>
          <ConnectionLine
            start={conn.start}
            end={conn.end}
            color={i % 3 === 0 ? '#00ffcc' : i % 2 === 0 ? '#ff00ff' : '#0066ff'}
          />
          <DataPacket 
            start={conn.start} 
            end={conn.end} 
            speed={0.1 + Math.random() * 0.4} 
            color={i % 2 === 0 ? '#00ffcc' : '#ffffff'} 
          />
        </group>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 2, 12], fov: 60 }}
      onCreated={({ scene }) => {
        // Safe injection of scene background and fog outside the React reconciler
        scene.background = new THREE.Color('#05010a');
        scene.fog = new THREE.Fog('#05010a', 10, 35);
      }}
    >
      {/* Cyberpunk Neon Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffcc" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff00ff" />
      
      {/* Deep Space / Digital dust */}
      <SpaceDust />
      
      {/* Glowing Neon Grid floor (Synthwave/Cyberpunk staple) using native gridHelper */}
      <gridHelper
        position={[0, -4, 0]}
        args={[100, 50, 0x00ffcc, 0xaa00aa]}
      />
      
      {/* Core Network visuals */}
      <Network />
      
      {/* Controls - restricted to keep the grid looking like a floor */}
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.4} 
        enableZoom={true} 
        enablePan={false} 
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  );