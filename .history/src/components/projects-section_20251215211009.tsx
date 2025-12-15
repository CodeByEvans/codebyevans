import "../types/three-extensions";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture, Html } from "@react-three/drei";
import { easing } from "maath";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import "./util";

import { ProjectCardHtml, type Project } from "./ProjectCardHtml";
import { projects } from "@/data/projectsData";

interface CardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  project: Project;
  onSelect: (p: Project) => void;
}

const Card = ({ ...props }: CardProps) => {
  const ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );
  const [hovered, hover] = useState(false);
  const pointerOver = (e: any) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    if (!ref.current) return;
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
  });
  return (
    // Usamos un grupo para aplicar la posición, rotación y escala de hover
    <group
      ref={ref}
      {...props}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
    >
      {/* Html incrusta el componente React 2D en el espacio 3D */}
      <Html
        center
        distanceFactor={5}
        className="w-[380px] h-[500px] pointer-events-auto"
      >
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => props.onSelect(props.project)}
        >
          <ProjectCardHtml project={props.project} />
        </div>
      </Html>
    </group>
  );
};

// --- Componente Rig (Sin Cambios en su lógica principal, usa scrollRatio) ---

interface RigProps {
  children: React.ReactNode;
  rotation: [number, number, number];
  scrollRatio: number;
}

const Rig = (props: RigProps) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    // Usa el scrollRatio que viene de Framer Motion
    ref.current.rotation.y = -props.scrollRatio * (Math.PI * 2);
    if (state.events.update) {
      state.events.update();
    }
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={ref} rotation={props.rotation}>
      {props.children}
    </group>
  );
};

// --- Componente Carousel ---

const Carousel = ({
  radius = 2.6,
  onSelect,
}: {
  radius?: number;
  onSelect: (p: Project) => void;
}) => {
  const count = projects.length;
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      project={projects[i]}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      onSelect={onSelect}
    />
  ));
};

// --- ProjectsSection (Modificaciones Clave con Framer Motion) ---

// Eliminamos la función getScrollRatio ya que Framer Motion lo hace.

export const ProjectsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // 1. Usar la referencia para el contenedor de scroll (el que tendrá 300vh de alto)

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 2. Usar useScroll de Framer Motion para rastrear el scroll del contenedor
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    // La animación comienza cuando el inicio del target toca el inicio del viewport
    // y termina cuando el final del target toca el final del viewport.
    offset: ["start start", "end end"],
  });

  // 3. Suavizar el progreso de scroll (opcional, pero da un toque más profesional)
  const rotationProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 4. Convertir el Framer Motion Value a un estado simple para R3F
  const [scrollRatio, setScrollRatio] = useState(0);

  // 5. Sincronizar Framer Motion con el estado de React
  useEffect(() => {
    const unsubscribe = rotationProgress.on("change", (latest) => {
      setScrollRatio(latest);
    });
    return () => unsubscribe();
  }, [rotationProgress]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="proyectos" className="w-full">
      <motion.div
        ref={scrollContainerRef}
        style={{ height: "300vh" }} // El largo de tu recorrido
        className="relative w-full"
      >
        {/* 8. CONTENEDOR INTERIOR: Pega el Canvas a la pantalla (sticky top-0 h-screen) */}
        <div className="sticky top-0 w-full h-screen text-center">
          <h2
            className="absolute inset-x-0 top-20 z-30 
                w-full text-center p-4 
                text-2xl md:text-3xl font-bold 
                bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Mis Proyectos Destacados
          </h2>
          <Canvas camera={{ position: [0, 0, 6], fov: isMobile ? 55 : 46 }}>
            <color attach="background" args={["#060606"]} />
            <fog attach="fog" args={["#060606", 8.5, 12]} />

            {/* Le pasamos el scrollRatio calculado por Framer Motion */}
            <Rig rotation={[0, 0, 0.15]} scrollRatio={scrollRatio}>
              <Carousel onSelect={setActiveProject} />
            </Rig>
            <Environment preset="night" blur={0.5} />
          </Canvas>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4 overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen superior */}
              <div className="relative h-[260px] w-full overflow-hidden">
                <motion.img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: activeProject.gradient }}
                />
              </div>

              {/* Contenido */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <img
                    src={activeProject.logo}
                    alt={`${activeProject.title} logo`}
                    className="h-12 w-12 rounded-md"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {activeProject.status}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <motion.p
                  className="text-white/80 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {activeProject.summary}
                </motion.p>

                {/* Features */}
                <ul className="grid gap-2 md:grid-cols-2">
                  {activeProject.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-start gap-2 text-white/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  {activeProject.url && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-white px-5 py-2 font-medium text-black hover:bg-white/90 transition"
                    >
                      Ver proyecto
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/20 px-5 py-2 text-white hover:bg-white/10 transition"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Cerrar */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 text-white/70 hover:text-white transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
