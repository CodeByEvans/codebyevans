import { Object3DNode } from "@react-three/fiber";
import { MeshBasicMaterialParameters } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    bentPlaneGeometry: Object3DNode<
      BentPlaneGeometry,
      typeof BentPlaneGeometry
    >;
    meshSineMaterial: Object3DNode<MeshSineMaterial, typeof MeshSineMaterial>;
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

export { BentPlaneGeometry, MeshSineMaterial };
