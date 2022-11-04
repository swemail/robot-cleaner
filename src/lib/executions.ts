import { Command, Direction, Point } from "../types";
import { range } from "./utils";

// Uses a range to create an array with points for each step
export const getVisitedPointsPerCommand = (start: Point, command: Command) => {
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
// and make the last point for each command the new starting point for the next command.
//
// Uses a string representation of each point as key in an plain Object as holder of uniqe points.
const getAllVisitedPoints = (
  start: Point,
  commands: Array<Command>
): Record<string, boolean> => {
  const [result] = commands.reduce(
    (acc, command) => {
      const [visistedTotal, nextStart] = acc;
      const visistedForCommand = getVisitedPointsPerCommand(nextStart, command);

      const nextVisistedTotal = visistedForCommand.reduce((points, point) => {
        points[`${point.x}:${point.y}`] = true; // any value would do, only need keys
        return points;
      }, visistedTotal);

      const currentPoint =
        visistedForCommand.length > 0
          ? visistedForCommand[visistedForCommand.length - 1]
          : start;

      return [nextVisistedTotal, currentPoint] as [
        Record<string, boolean>,
        Point
      ];
    },
    [{}, start] as [Record<string, boolean>, Point]
  );

  return result;
};

export const getNumberOfVisitedPoints = (
  start: Point,
  commands: Array<Command>
) => {
  const allPoints = getAllVisitedPoints(start, commands);
  return Object.keys(allPoints).length;
};
