"use client";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  AnimatePresence,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Card } from "./ui/card";
import stackDataSections from "@/data/stackData";

interface ParallaxProps {
  children: string[] | React.ReactNode[];
  baseVelocity: number;
}

const ParallaxItems = ({ children, baseVelocity }: ParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 100,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 10], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-33.3, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap text-xl md:text-3xl w-full bg-[#060707]">
      <motion.div className="flex w-max py-2" style={{ x }}>
        {[...children, ...children, ...children].map((child, idx) => (
          <span key={idx} className="inline-block mr-8">
            {child}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const Stack = () => {
  const [selectedSection, setSelectedSection] = useState<any>(null);

  // Evitar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedSection) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedSection]);

  return (
    <section id="stack" className="bg-[#060707] py-20">
      <div className="text-center pb-12 flex flex-col gap-2 ">
        <p className="text-cyan-500 font-mono text-sm tracking-wider">
          &lt;/ Stack &gt;
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Mi Stack Tecnológico
        </h2>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
          Te presento mi stack de desarrollo web
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {stackDataSections.map((section, index) => (
          <motion.div
            key={index}
            layoutId={section.title}
            className="w-full"
            onClick={() => setSelectedSection(section)}
          >
            <Card className="p-4 w-full mx-auto cursor-pointer hover:scale-[1.02] transition-all">
              <div className="flex flex-col justify-between items-center text-sm md:text-2xl overflow-hidden gap-4">
                <h2>{section.title}</h2>
                <ParallaxItems baseVelocity={section.baseVelocity}>
                  {section.items}
                </ParallaxItems>
                <button className="text-sm text-primary cursor-pointer">
                  Saber más...
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSection && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={selectedSection.title}
              className="bg-[#0e0f10] border border-cyan-500 rounded-2xl p-8 max-w-xl w-full mx-4 text-center text-gray-200 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.6, stiffness: 100 }}
            >
              <h2 className="text-3xl font-semibold mb-4 text-white">
                {selectedSection.title}
              </h2>
              <ParallaxItems baseVelocity={selectedSection.baseVelocity}>
                {selectedSection.items}
              </ParallaxItems>
              <p className="text-base mt-6">{selectedSection.description}</p>
              <button
                className="mt-8 text-sm text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                onClick={() => setSelectedSection(null)}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Stack;
