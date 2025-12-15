"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section
      id="contacto"
      className="py-24 px-4 bg-gray-950/80 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Fondo dinámico */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-800/20 via-purple-800/10 to-transparent rounded-3xl blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-card border border-gray-700 rounded-3xl p-12 text-center space-y-8 shadow-lg"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              ¿Listo para crear
              <br />
              <span className="text-cyan-500">algo increible?</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Busco oportunidades como desarrollador Full Stack. Puedo
              contribuir a tu equipo creando aplicaciones escalables y
              eficientes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                asChild
                className="bg-cyan-500 hover:bg-cyan-400"
              >
                <a href="mailto:evansjavierlr@gmail.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Enviar mensaje
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="outline" asChild>
                <a href="https://linkedin.com/in/evanslituma" target="_blank">
                  Conectar en LinkedIn
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pt-8 border-t border-gray-700"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <a
                href="mailto:codebyevans@gmail.com"
                className="hover:text-cyan-500 transition-colors"
              >
                codebyevans@gmail.com
              </a>
              <span className="hidden sm:block">•</span>
              <a
                href="https://github.com/CodeByEvans"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-500 transition-colors"
              >
                GitHub
              </a>
              <span className="hidden sm:block">•</span>
              <a
                href="https://linkedin.com/in/evanslituma"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-500 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
