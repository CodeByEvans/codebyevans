import "../types/three-extensions";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture, Html } from "@react-three/drei";
import { easing } from "maath";
import { motion, useScroll, useSpring } from "framer-motion";

import "./util";

import { ProjectCardHtml, type Project } from "./ProjectCardHtml";
import { projects } from "@/data/projectsData";

interface CardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  project: Project;
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
        <ProjectCardHtml project={props.project} />
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

// --- Componente Banner (Con la corrección del material) ---

interface BannerProps {
  position: [number, number, number];
}

interface MeshSineMaterialRef extends THREE.Material {
  time: { value: number };
  map: THREE.Texture & { offset: THREE.Vector2 };
}

const Banner = (props: BannerProps) => {
  const materialRef = useRef<MeshSineMaterialRef>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useTexture("/work_.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    // Animación basada en el tiempo (independiente del scroll)
    materialRef.current.time.value += delta * 4;
    materialRef.current.map.offset.x += delta / 2;
  });

  return (
    <mesh ref={meshRef} {...props}>
      <cylinderGeometry args={[2.5, 2.5, 0.14, 128, 16, true]} />
      <meshSineMaterial
        ref={materialRef as any}
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
};

// --- Componente Carousel (Sin Cambios) ---

const Carousel = ({ radius = 2.4 }) => {
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
    />
  ));
};

// --- ProjectsSection (Modificaciones Clave con Framer Motion) ---

// Eliminamos la función getScrollRatio ya que Framer Motion lo hace.

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 1. Usar la referencia para el contenedor de scroll (el que tendrá 300vh de alto)
  // Cambiamos el nombre de containerRef a scrollContainerRef para mayor claridad
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

  // 6. Mantener el IntersectionObserver para `isVisible`
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 0.5, 0.99, 1],
      }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => observer.disconnect();
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
          <Canvas camera={{ position: [0, 0, 100], fov: 50 }}>
            <color attach="background" args={["#060606"]} />
            <fog attach="fog" args={["#060606", 8.5, 12]} />

            {/* Le pasamos el scrollRatio calculado por Framer Motion */}
            <Rig rotation={[0, 0, 0.15]} scrollRatio={scrollRatio}>
              <Carousel />
            </Rig>
            <Banner position={[0, -0.15, 5]} />
            <Environment preset="night" blur={0.5} />
          </Canvas>
        </div>
      </motion.div>
    </section>
  );
};
