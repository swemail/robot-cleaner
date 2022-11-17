import { Command, Direction, Point } from "../types";
import { BinaryGrid } from "./binaryGrid";

const GRID_OFFSET = 100_000;

const addVisitedPointsPerCommand = (
  start: Point,
  command: Command,
  grid: BinaryGrid
) => {
  const row = start.y;
  const column = start.x;
  let result = 0;
  switch (command.direction) {
    case Direction.east:
      for (let index = column; index < column + command.steps + 1; index++) {
        if (grid.getValue(row, index) === 0) {
          grid.setValue(row, index);
          result++;
        }
      }
      start.x = start.x + command.steps;

      return result;

    case Direction.west:
      for (let index = column; index > column - command.steps - 1; index--) {
        if (grid.getValue(row, index) === 0) {
          grid.setValue(row, index);
          result++;
        }
      }
      start.x = start.x - command.steps;
      return result;

    case Direction.south:
      for (let index = row; index > row - command.steps - 1; index--) {
        if (grid.getValue(index, column) === 0) {
          grid.setValue(index, column);
          result++;
        }
      }
      start.y = start.y - command.steps;
      return result;

    case Direction.north:
      for (let index = row; index < row + command.steps + 1; index++) {
        if (grid.getValue(index, column) === 0) {
          grid.setValue(index, column);
          result++;
        }
      }
      start.y = start.y + command.steps;
      return result;

    default:
      return result;
  }
};

export const getNumberOfVisitedPoints = (
  start: Point,
  commands: Array<Command>
): number => {
  const grid = BinaryGrid.create(200_000, 200_000);
  start.x = start.x + GRID_OFFSET;
  start.y = start.y + GRID_OFFSET;
  let result = 0;

  for (const command of commands) {
    result = result + addVisitedPointsPerCommand(start, command, grid);
  }

  return result;
};
