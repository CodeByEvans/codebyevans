import "../types/three-extensions";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";

import "./util";

const images = ["/clover-studio.png", "/amandoando.webp", "/codebyevans.gif"];

interface CardProps {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Card = ({ url, ...props }: CardProps) => {
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
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.25 : 0.1,
      0.2,
      delta
    );
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
};

interface RigProps {
  children: React.ReactNode;
  rotation: [number, number, number];
}

const Rig = (props: RigProps) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    if (state.events.update) {
      state.events.update();
    } // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
};

interface BannerProps {
  position: [number, number, number];
}

interface MeshShineMaterial extends THREE.Material {
  time: { value: number };
  map: THREE.Texture & { offset: THREE.Vector2 };
}

const Banner = (props: BannerProps) => {
  const ref =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );
  const texture = useTexture("/work_.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (!ref.current) return;
    const material = ref.current.material as MeshShineMaterial;
    material.time.value += Math.abs(scroll.delta) * 4;
    material.map.offset.x += delta / 2;
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
};

const Carousel = ({ radius = 1.4, count = 3 }) => {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={images[i]}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
};

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se activa cuando el elemento está completamente visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 0.5, 0.99, 1], // Observa en diferentes puntos
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section ref={containerRef} className="w-full h-screen">
      <h1>
        {isVisible
          ? "Esta visible completamente"
          : "No esta visible completamente"}
      </h1>
      <Canvas camera={{ position: [0, 0, 100], fov: 22 }}>
        <color attach="background" args={["#060606"]} />
        <fog attach="fog" args={["#060606", 8.5, 12]} />
        <ScrollControls pages={3} enabled={isVisible}>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
          <Banner position={[0, -0.15, 0]} />
        </ScrollControls>
        <Environment preset="night" blur={0.5} />
      </Canvas>
    </section>
  );
};
