"use client";

import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import testimonials from "@/data/testimonialsData";

export function TestimonialsSection() {
  return (
    <section
      className="py-24 px-4 bg-gradient-to-b from-gray-900/50 to-gray-950/80"
      id="testimonios"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-cyan-500 font-mono text-sm tracking-wider mb-2">
            &lt;/ Testimonios &gt;
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Clientes Satisfechos
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Lo que dicen quienes han trabajado conmigo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-transform">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-cyan-500 text-cyan-500"
                    />
                  ))}
                </div>

                {/* Testimonio */}
                <p className="text-gray-300 leading-relaxed italic mb-4">
                  "{testimonial.content}"
                </p>

                {/* Nombre y rol */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
