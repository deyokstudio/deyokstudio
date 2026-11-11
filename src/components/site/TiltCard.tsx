import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 170, damping: 24 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 170, damping: 24 });
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  return <motion.article ref={ref} className={cn("tilt-card group relative flex h-full flex-col", className)}
    style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 1000, "--glow-x": glowX, "--glow-y": glowY } as MotionStyle & Record<"--glow-x" | "--glow-y", MotionValue<string>>}
    onPointerMove={(e) => {
      if (reduce || e.pointerType !== "mouse") return;
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      x.set((e.clientX - box.left) / box.width - 0.5);
      y.set((e.clientY - box.top) / box.height - 0.5);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    {children}
  </motion.article>;
}