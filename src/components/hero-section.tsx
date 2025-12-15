"use client";

import { ArrowRight, FileText, Mail } from "lucide-react";

import { motion } from "motion/react";

import Typewriter from "typewriter-effect";

import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="inicio"
      className="min-h-screen flex items-center justify-center  px-4 pb-16 relative overflow-hidden "
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 pt-8 lg:pt-0">
            <div className="flex items-center justify-center md:justify-start flex-wrap gap-3 text-xs md:text-sm text-muted-foreground ">
              <div className="inline-flex items-center gap-2 px-2 py-1 md:px-3 border border-primary/30 bg-primary/10 text-primary font-medium ">
                {"< Hello World />"}
              </div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="h-[2px] max-w-[2rem] md:max-w-[5rem]  bg-gradient-to-r from-primary/60 to-transparent rounded-full"
              />

              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-primary font-medium  backdrop-blur-sm">
                Full-Stack Developer
              </p>
            </div>

            <div className="space-y-4 flex flex-col items-center md:items-start">
              <h1 className="flex gap-3 md:block text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-balance ">
                {"> Hola, soy "}
                <span className="text-primary inline-block">
                  <Typewriter
                    options={{
                      strings: ["CodeByEvans", "Evans"],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 50,
                      cursor: "_",
                    }}
                  />
                </span>
              </h1>

              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty text-center md:text-left">
                Desarrollador Full Stack especializado en crear aplicaciones web
                modernas y escalables con React, TypeScript y Next.js.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start ">
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button
                  size="lg"
                  asChild
                  className="group relative overflow-hidden"
                >
                  <a href="#contacto" className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1 duration-200" />
                    Contactar
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 duration-200" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 transition-colors"
                  asChild
                >
                  <a href="/cv.pdf" download className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver CV
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            {/* Glow detrás del avatar */}
            <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full w-[90%] h-[90%]  top-5 left-5" />
            <img
              src="/avatar.jpg"
              alt="CodeByEvans Avatar"
              width={420}
              height={420}
              className="w-60 h-80 md:w-[420px] md:h-[560px] object-cover rounded-3xl shadow-2xl border border-primary/30 relative z-10 hover:rotate-1 hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
