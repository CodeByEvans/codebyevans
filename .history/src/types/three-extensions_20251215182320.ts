import type { MeshBasicMaterialParameters } from "three";
import * as THREE from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    bentPlaneGeometry: any;
    meshSineMaterial: any;
  }
}

// Declaraciones de las clases personalizadas
declare class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(
    radius: number,
    width?: number,
    height?: number,
    widthSegments?: number,
    heightSegments?: number
  );
}

interface MeshSineMaterialProps extends MeshBasicMaterialParameters {
  time?: { value: number };
}

declare class MeshSineMaterial extends THREE.MeshBasicMaterial {
  constructor(parameters?: MeshSineMaterialProps);
  time: { value: number };
}

export type { BentPlaneGeometry, MeshSineMaterial };
