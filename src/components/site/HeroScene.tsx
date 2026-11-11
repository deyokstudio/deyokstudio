import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { CanvasTexture, RepeatWrapping, type Group } from "three";
import { useReducedMotion } from "framer-motion";

function Sculpture({ color, silver, reduced, pointer, ready }: { color: string; silver: string; reduced: boolean; pointer: React.RefObject<{ x: number; y: number }>; ready: () => void }) {
  const ref = useRef<Group>(null);
  const elapsed = useRef(0);
  const signaled = useRef(false);
  const [texture, setTexture] = useState<CanvasTexture | null>(null);
  useEffect(() => {
    const surface = document.createElement("canvas");
    surface.width = 128; surface.height = 128;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const image = ctx.createImageData(128, 128);
    for (let i = 0; i < image.data.length; i += 4) {
      const v = 180 + ((i * 17 + Math.floor(i / 512) * 31) % 60);
      image.data[i] = v; image.data[i + 1] = v; image.data[i + 2] = v; image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    const map = new CanvasTexture(surface);
    map.wrapS = map.wrapT = RepeatWrapping; map.repeat.set(6, 6);
    setTexture(map);
    return () => map.dispose();
  }, []);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const dt = Math.min(delta, 0.05);
    if (!reduced) elapsed.current += dt;
    const p = pointer.current;
    const targetY = -0.45 + elapsed.current * 0.08 + (reduced ? 0 : p.x * 0.35);
    const targetX = 0.45 + (reduced ? 0 : p.y * 0.2);
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * (1 - Math.exp(-4 * dt));
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * (1 - Math.exp(-4 * dt));
    if (texture && !signaled.current) { signaled.current = true; ready(); }
  });
  return <group ref={ref} rotation={[0.45, -0.45, -0.4]}>
    <mesh>
      <torusKnotGeometry args={[1.55, 0.47, 160, 24, 2, 3]} />
      <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.22} clearcoat={1} clearcoatRoughness={0.12} roughnessMap={texture} />
    </mesh>
    <mesh rotation={[1.1, 0.2, 0.5]}>
      <torusGeometry args={[2.3, 0.025, 8, 100]} />
      <meshStandardMaterial color={silver} metalness={1} roughness={0.2} />
    </mesh>
  </group>;
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const [palette, setPalette] = useState<{ red: string; silver: string } | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const toRgb = (token: string) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return "";
      ctx.fillStyle = styles.getPropertyValue(token).trim();
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `rgb(${r}, ${g}, ${b})`;
    };
    setPalette({ red: toRgb("--primary"), silver: toRgb("--foreground") });
    const move = (e: PointerEvent) => { pointer.current = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }; };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={wrapper} className="hero-scene" data-scene-ready={ready || undefined} aria-hidden="true">
    {palette && <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.7], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 5]} intensity={3} />
      <Environment resolution={128}>
        <Lightformer intensity={4} position={[0, 4, 2]} scale={[8, 3, 1]} />
        <Lightformer intensity={3} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[5, 8, 1]} />
        <Lightformer intensity={2} position={[4, -2, 1]} rotation-y={-Math.PI / 2} scale={[2, 8, 1]} />
      </Environment>
      <Sculpture color={palette.red} silver={palette.silver} reduced={!!reduced} pointer={pointer} ready={() => setReady(true)} />
    </Canvas>}
  </div>;
}