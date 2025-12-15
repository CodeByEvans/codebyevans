"use client";

import { FileText, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import navItems from "../data/navigation";

export function Header() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("#inicio");

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ocultar header si baja mucho
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      // Aplicar sombra al hacer scroll
      setScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -90 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-primary/10" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center font-mono text-primary font-semibold hover:opacity-90 transition-opacity"
        >
          <span className="text-white text-sm md:text-base">{"Code"}</span>
          <span className="text-cyan-500 text-sm md:text-base">{"By"}</span>
          <span className="text-white text-sm md:text-base">{"Evans"}</span>
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex border p-2 px-2 rounded-full">
          <div className="hidden md:flex items-center px-1 gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs text-muted-foreground hover:text-primary transition-all duration-200 px-4 ${
                  activeItem === item.href
                    ? "text-white bg-gray-900 p-2 rounded-full"
                    : ""
                }`}
                onClick={() => setActiveItem(item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Botones */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="#contacto">
              <Mail className="h-4 w-4 mr-2" />
              Contacto
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="/cv.pdf" download className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              CV
            </a>
          </Button>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-5 py-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-3 pt-3">
                <Button size="sm" asChild>
                  <a href="/cv.pdf" download className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    CV
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#contacto">
                    <Mail className="h-4 w-4 mr-2" />
                    Contacto
                  </a>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
