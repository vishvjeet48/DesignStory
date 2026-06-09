import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function LuxuryLamp() {
  const group = useRef<THREE.Group>(null)
  const shade = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!group.current) return
    const { pointer } = state
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.35,
      0.05
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.15,
      0.05
    )
    if (shade.current) {
      shade.current.position.y = 1.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={group} scale={1.1}>
        {/* Base */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.4, 0.12, 32]} />
          <meshStandardMaterial color="#A58462" metalness={0.7} roughness={0.25} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 16]} />
          <meshStandardMaterial color="#2C2C2C" metalness={0.85} roughness={0.15} />
        </mesh>
        {/* Shade */}
        <mesh ref={shade} position={[0, 1.35, 0]} castShadow>
          <coneGeometry args={[0.55, 0.7, 32, 1, true]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.4}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#F8F5F0"
            roughness={0.15}
          />
        </mesh>
        {/* Inner glow */}
        <pointLight position={[0, 1.1, 0]} intensity={2} color="#C6A77B" distance={3} />
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#C6A77B"
            emissive="#C6A77B"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  )
}

export function LuxuryLampScene() {
  return (
    <div className="h-[320px] w-full md:h-[420px] lg:h-[480px]">
      <Canvas
        camera={{ position: [0, 0.8, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#E8DED1" />
          <LuxuryLamp />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  )
}
