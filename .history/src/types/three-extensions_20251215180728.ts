// este archivo extiende JSX solo para este módulo
declare global {
  namespace JSX {
    interface IntrinsicElements {
      bentPlaneGeometry: any;
      meshSineMaterial: any;
    }
  }
}

// Este export vacío convierte el archivo en módulo
export {};
