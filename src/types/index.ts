export type Point = { x: number; y: number };

export enum Direction {
  east = "east",
  west = "west",
  south = "south",
  north = "north",
}

export type Command = {
  direction: Direction;
  steps: number;
};

export type Input = {
  start: Point;
  commands: Array<Command>;
};

export type Result = {
  commands: number;
  result: number;
  duration: number;
};
