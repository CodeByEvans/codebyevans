"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
  color: string;
}

interface SelectedItem extends TimelineItem {
  index: number;
}

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Evitar scroll del body cuando el modal está abierto en móvil
  useEffect(() => {
    if (selectedItem && isMobile) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedItem, isMobile]);

  // Detectar el progreso del scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // La línea crece de 0% a 100% según el scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineItems: TimelineItem[] = [
    {
      year: "2023 - 2024",
      title: "Descubriendo la programación",
      description: "Iniciando en el desarrollo web con Java",
      detail:
        "Gracias a un curso del SEPE aprendí a programar y crear aplicaciones web con Java y Spring Boot. Fue mi puerta de entrada al mundo del desarrollo web.",
      icon: "🚀",
      color: "teal",
    },
    {
      year: "2024 - 2025",
      title: "Full Stack Open",
      description: "Estudiando el bootcamp de Full Stack Open",
      detail:
        "Full Stack Open es un bootcamp acreditado por la Universidad de Helsinki. Aquí aprendí desarrollo web moderno, control de versiones, bases de datos, testing, APIs y mas.",
      icon: "🎓",
      color: "purple",
    },
    {
      year: "2024 - Presente",
      title: "Full Stack Developer",
      description: "Creando aplicaciones web modernas y escalables",
      detail:
        "Trabajo con el stack MERN o NEXT.js, pero siempre estoy buscando nuevas tecnologías para mis proyectos. Busco la mejor opción para cada proyecto, aunque implique aprender algo nuevo.",
      icon: "💻",
      color: "cyan",
    },
  ];

  // Calcular cuándo cada punto debe aparecer
  const getPointProgress = (index: number) => {
    const pointStart = index / timelineItems.length;
    const pointEnd = (index + 1) / timelineItems.length;
    return useTransform(scrollYProgress, [pointStart, pointEnd], [0, 1]);
  };

  const toggleCard = (item: TimelineItem, index: number) => {
    if (isMobile) {
      setSelectedItem({ ...item, index });
    } else {
      setFlippedCards((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  return (
    <section className="relative bg-gray-950" id="sobre-mi">
      {/* Header fijo en la parte superior */}
      <div className="text-center py-20 px-4 flex flex-col gap-2 md:gap-4">
        <p className="text-cyan-500 font-mono text-sm tracking-wider">
          &lt;/ Sobre Mi &gt;
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Mi Trayectoria
        </h2>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
          Conoce al desarrollador, más allá del código
        </p>
      </div>

      {/* Contenedor del timeline con scroll */}
      <div ref={containerRef} className="relative pb-24 px-4">
        {/* Timeline Container */}
        <div className="max-w-6xl mx-auto relative">
          {/* Línea de fondo (gris) */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gray-800 top-0" />

          {/* Línea animada que crece con scroll */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-1 top-0 bg-gradient-to-b from-cyan-500 via-purple-500 to-teal-500"
            style={{ height: lineHeight }}
          />

          {/* Timeline Items */}
          <div className="space-y-32">
            {timelineItems.map((item, index) => {
              const pointProgress = getPointProgress(index);
              const pointScale = useTransform(pointProgress, [0, 1], [0, 1]);
              const pointOpacity = useTransform(pointProgress, [0, 1], [0, 1]);

              return (
                <motion.div
                  key={index}
                  className={`flex gap-4 md:gap-8 items-start ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Carta clickeable */}
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="perspective-1000"
                    >
                      <motion.div
                        className="relative cursor-pointer"
                        onClick={() => toggleCard(item, index)}
                        animate={
                          !isMobile
                            ? { rotateY: flippedCards[index] ? 180 : 0 }
                            : {}
                        }
                        transition={{ duration: 0.6 }}
                        style={
                          !isMobile ? { transformStyle: "preserve-3d" } : {}
                        }
                        whileHover={isMobile ? { scale: 1.02 } : {}}
                        whileTap={isMobile ? { scale: 0.98 } : {}}
                      >
                        {/* DESKTOP: Tarjeta con flip */}
                        {!isMobile ? (
                          <>
                            {/* Frente de la carta */}
                            <div
                              className="absolute inset-0 backface-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6 hover:border-cyan-500 transition-colors h-64"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <div className="flex flex-col md:flex-row items-center md:text-left md:items-start gap-3 mb-4">
                                <span className="text-3xl">{item.icon}</span>
                                <div>
                                  <p className="text-cyan-500 text-sm font-mono mb-1">
                                    {item.year}
                                  </p>
                                  <h3 className="text-2xl font-bold text-white">
                                    {item.title}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                                {item.description}
                              </p>
                              <div className="absolute bottom-4 right-4 text-gray-500 text-sm flex items-center gap-2">
                                <span>Click para ver más</span>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>

                            {/* Reverso de la carta */}
                            <div
                              className="absolute inset-0 backface-hidden rounded-xl border border-cyan-500 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 p-6 h-64"
                              style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                              }}
                            >
                              <div className="h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                  <span className="text-3xl">{item.icon}</span>
                                  <h4 className="text-xl font-bold text-cyan-400">
                                    Detalles
                                  </h4>
                                </div>
                                <p className="text-gray-200 leading-relaxed flex-1">
                                  {item.detail}
                                </p>
                                <div className="text-gray-400 text-sm flex items-center gap-2 mt-4">
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 19l-7-7 7-7"
                                    />
                                  </svg>
                                  <span>Click para volver</span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* MÓVIL: Tarjeta compacta */
                          <div className="rounded-xl border border-gray-700 hover:border-cyan-500 bg-gradient-to-br from-gray-800 to-gray-900 p-4 transition-colors">
                            <div className="flex flex-col items-center gap-3 mb-3">
                              <span className="text-2xl">{item.icon}</span>
                              <div className="text-center">
                                <p className="text-cyan-500 text-xs font-mono mb-1">
                                  {item.year}
                                </p>
                                <h3 className="text-sm font-bold text-white">
                                  {item.title}
                                </h3>
                              </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-xs text-center mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-cyan-500 text-xs">
                              <span>Ver más</span>
                              <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </motion.svg>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Punto en la línea */}
                  <div className="flex items-center justify-center w-auto pt-12 md:py-24">
                    <motion.div
                      className="w-4 h-4 md:w-6 md:h-6 rounded-full border-4 border-gray-900 bg-cyan-500 shadow-lg shadow-cyan-500/50"
                      style={{
                        scale: pointScale,
                        opacity: pointOpacity,
                      }}
                    />
                  </div>

                  {/* Espacio vacío del otro lado */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal expandible SOLO en móvil */}
      <AnimatePresence>
        {selectedItem && isMobile && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500 rounded-2xl p-6 max-w-lg w-full mx-4 text-gray-200 shadow-2xl max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{selectedItem.icon}</span>
                <div>
                  <p className="text-cyan-400 text-sm font-mono mb-1">
                    {selectedItem.year}
                  </p>
                  <h3 className="text-xl font-bold text-white">
                    {selectedItem.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">
                    Descripción
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {selectedItem.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Detalles</h4>
                  <p className="text-gray-200 leading-relaxed text-sm">
                    {selectedItem.detail}
                  </p>
                </div>
              </div>

              <button
                className="w-full mt-6 py-3 text-sm text-cyan-400 hover:text-cyan-300 transition border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10"
                onClick={() => setSelectedItem(null)}
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

export default AboutSection;
