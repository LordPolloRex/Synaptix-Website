import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line, Float, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo, useState } from 'react';
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
          color={i % 4 === 0 ? '#00ffcc' : i % 3 === 0 ? '#0066ff' : '#1a365d'} 
          size={i % 5 === 0 ? 0.2 : 0.1}
        />
      ))}
      {connections.map((conn, i) => (
        <group key={`conn-${i}`}>
          <Line
            points={[conn.start, conn.end]}
            color={i % 3 === 0 ? '#00ffcc' : '#0066ff'}
            lineWidth={1}
            transparent
            opacity={0.15}
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

// A component that represents a Cyberpunk Traffic Light
function TrafficLight({ position }: { position: [number, number, number] }) {
  const [activeLight, setActiveLight] = useState(0); // 0: red, 1: yellow, 2: green
  
  useFrame((state) => {
    // Cycle lights every 3 seconds
    const time = state.clock.elapsedTime;
    setActiveLight(Math.floor(time / 3) % 3);
  });

  return (
    <group position={position}>
      {/* Main Body */}
      <mesh>
        <boxGeometry args={[1, 3, 0.8]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Tech Details / Frame */}
      <mesh position={[0, 0, 0.45]}>
        <boxGeometry args={[1.1, 3.1, 0.1]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0} />
      </mesh>

      {/* Lights */}
      <group position={[0, 0, 0.5]}>
        {/* Red */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={activeLight === 0 ? 10 : 0.2} 
            toneMapped={false} 
          />
        </mesh>
        {/* Yellow */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial 
            color="#ffaa00" 
            emissive="#ffaa00" 
            emissiveIntensity={activeLight === 1 ? 10 : 0.2} 
            toneMapped={false} 
          />
        </mesh>
        {/* Green */}
        <mesh position={[0, -0.9, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial 
            color="#00ffcc" 
            emissive="#00ffcc" 
            emissiveIntensity={activeLight === 2 ? 10 : 0.2} 
            toneMapped={false} 
          />
        </mesh>
      </group>

      {/* Glowing wires/lines */}
      <Line
        points={[[-0.6, 1.5, 0], [-0.8, 2, 0], [-1, 1.8, 0]]}
        color="#00ffcc"
        lineWidth={2}
      />
      <Line
        points={[[0.6, -1.5, 0], [0.8, -2, 0], [1, -1.8, 0]]}
        color="#0066ff"
        lineWidth={2}
      />
      
      {/* AI Label */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.2}
        color="#00ffcc"
        anchorX="center"
        anchorY="middle"
      >
        AI CONTROL
      </Text>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 12], fov: 60 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Network />
      
      <TrafficLight position={[5, 0, 0]} />
      <TrafficLight position={[-5, 2, -3]} />
      
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.3} 
        enableZoom={false} 
        enablePan={false} 
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.5}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
        }}
      />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </Canvas>
  );
}
