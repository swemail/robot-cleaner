import { Command, Direction, Point } from "../types";
import { range } from "./utils";

// const SIZE = 100_000;

export const getCleanedPointsPerCommand = (start: Point, command: Command) => {
  switch (command.direction) {
    case Direction.east:
      return range(start.x, command.steps + 1).map((x) => ({ x, y: start.y }));

    case Direction.west:
      return range(start.x - command.steps, command.steps + 1)
        .map((x) => ({
          x,
          y: start.y,
        }))
        .reverse();

    case Direction.south:
      return range(start.y, command.steps + 1).map((y) => ({ x: start.x, y }));

    case Direction.north:
      return range(start.y - command.steps, command.steps + 1)
        .map((y) => ({
          x: start.x,
          y,
        }))
        .reverse();

    default:
      return [];
  }
};

export const getAllCleanedPoints = (
  start: Point,
  commands: Array<Command>,
  visited: Record<string, boolean> = {}
): Record<string, boolean> => {
  if (commands.length === 0) {
    return visited;
  }
  const [command, ...rest] = commands;
  const visistedPoints = getCleanedPointsPerCommand(start, command);

  const visistedTotal = visistedPoints.reduce((acc, point) => {
    acc[`${point.x}:${point.y}`] = true; // any value would do, only need keys
    return acc;
  }, visited);

  const currentPoint =
    visistedPoints.length > 0 ? visistedPoints.slice(-1)[0] : start;

  return getAllCleanedPoints(currentPoint, rest, visistedTotal);
};

export const getNumberOfCleanedPoints = (
  start: Point,
  commands: Array<Command>
) => {
  const allPoints = getAllCleanedPoints(start, commands);
  return Object.keys(allPoints).length;
};
