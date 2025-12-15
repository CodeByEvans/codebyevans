"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import navItems from "../data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <a
              href="/"
              className="flex items-center text-lg font-mono text-primary font-bold"
            >
              <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                <div className=" leading-tight">
                  <span className="text-white text-sm md:text-base">
                    {"Code"}
                  </span>
                  <span className="text-cyan-500 text-sm md:text-base">
                    {"By"}
                  </span>
                  <span className="text-white text-sm md:text-base">
                    {"Evans"}
                  </span>
                </div>
              </div>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Developer especializado en React, TypeScript y Next.js.
              Creando experiencias web excepcionales.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-foreground">Navegación</h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-foreground">Contacto</h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:evansjavierlr@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                evansjavierlr@gmail.com
              </a>
              <a
                href="https://github.com/CodeByEvans"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/evans-lituma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CodeByEvans
          </p>
        </div>
      </div>
    </footer>
  );
}
