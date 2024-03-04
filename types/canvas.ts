// TYPES
export type CanvasState =
  | {
      mode: CanvasMode.NONE;
    }
  | {
      mode: CanvasMode.PRESSING;
      origin: Point;
    }
  | {
      mode: CanvasMode.SELECTION_NET;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.TRANSLATING;
      current: Point;
    }
  | {
      mode: CanvasMode.RESIZING;
      initalBounds: GeomatricProps;
      corner: Side;
    }
  | {
      mode: CanvasMode.PENCIL;
    }
  | {
      mode: CanvasMode.INSERTING;
      layerType: LayerType;
    };

// LAYERS
export interface Rectangle extends Layer {
  type: LayerType.RECTANGLE;
}

export interface Ellipse extends Layer {
  type: LayerType.ELLIPSE;
}

export interface Path extends Layer {
  type: LayerType.PATH;
  points: number[][];
}

export interface Text extends Layer {
  type: LayerType.TEXT;
}

export interface Note extends Layer {
  type: LayerType.NOTE;
}

export type Camera = { x: number; y: number };

//  GENERAL TYPES
type Point = { x: number; y: number };

type Color = { r: number; g: number; b: number; a: number };

type GeomatricProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Layer = {
  type: LayerType;
  geometricProps: GeomatricProps;
  fill: Color;
  value?: string;
};

// ENUMS
export enum CanvasMode {
  NONE,
  PRESSING,
  SELECTION_NET,
  TRANSLATING,
  RESIZING,
  PENCIL,
  INSERTING,
}

export enum LayerType {
  RECTANGLE,
  ELLIPSE,
  TEXT,
  NOTE,
  PATH,
}

enum Side {
  TOP = 1,
  BOTTOM = 2,
  LEFT = 4,
  RIGHT = 8,
}
