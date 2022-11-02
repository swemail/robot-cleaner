import { Command, Direction, Point } from "../types";
import { range } from "./utils";

// Uses a range to create an array with points for each step
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

// Gets all the points visisted for each command
// and makes the last point for each command the new starting point for the next command.
//
// Uses a string representation of each point to use a plain Object as holder of uniqe points.
const getAllCleanedPoints = (
  start: Point,
  commands: Array<Command>
): Record<string, boolean> => {
  const [result] = commands.reduce(
    (acc, command) => {
      const [v, s] = acc;
      const visistedPoints = getCleanedPointsPerCommand(s, command);

      const visistedTotal = visistedPoints.reduce((points, point) => {
        points[`${point.x}:${point.y}`] = true; // any value would do, only need keys
        return points;
      }, v);

      const currentPoint =
        visistedPoints.length > 0 ? visistedPoints.slice(-1)[0] : start;

      return [visistedTotal, currentPoint] as [Record<string, boolean>, Point];
    },
    [{}, start] as [Record<string, boolean>, Point]
  );

  return result;
};

export const getNumberOfCleanedPoints = (
  start: Point,
  commands: Array<Command>
) => {
  const allPoints = getAllCleanedPoints(start, commands);
  return Object.keys(allPoints).length;
};
