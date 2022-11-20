import { readFileSync } from "fs";
import path from "path";
import { Direction } from "../types";
import { getNumberOfVisitedPoints } from "./executions";

describe("executions", () => {
  describe("getNumberOfVisitedPoints", () => {
    it("should handle simple case of one command", () => {
      expect(
        getNumberOfVisitedPoints({ x: 0, y: 0 }, [
          { direction: Direction.east, steps: 10 },
          { direction: Direction.east, steps: 10 },
        ])
      ).toEqual(21);
    });

    it("should handle two commands", () => {
      expect(
        getNumberOfVisitedPoints({ x: 0, y: 0 }, [
          { direction: Direction.east, steps: 10 },
          { direction: Direction.south, steps: 10 },
        ])
      ).toEqual(21);
    });

    it("should handle edges of a square", () => {
      expect(
        getNumberOfVisitedPoints({ x: -100000, y: -100000 }, [
          { direction: Direction.east, steps: 10 },
          { direction: Direction.north, steps: 10 },
          { direction: Direction.west, steps: 10 },
          { direction: Direction.south, steps: 10 },
        ])
      ).toEqual(40);
    });

    it("should cover a full grid", () => {
      expect(
        getNumberOfVisitedPoints({ x: 0, y: 0 }, [
          { direction: Direction.south, steps: 4 },
          { direction: Direction.east, steps: 1 },
          { direction: Direction.north, steps: 4 },
          { direction: Direction.east, steps: 1 },
          { direction: Direction.south, steps: 4 },
          { direction: Direction.east, steps: 1 },
          { direction: Direction.north, steps: 4 },
          { direction: Direction.east, steps: 1 },
          { direction: Direction.south, steps: 4 },
        ])
      ).toEqual(25);
    });

    it("should handle covering same points", () => {
      expect(
        getNumberOfVisitedPoints({ x: 0, y: 0 }, [
          { direction: Direction.south, steps: 4 },
          { direction: Direction.north, steps: 4 },
          { direction: Direction.south, steps: 4 },
          { direction: Direction.north, steps: 4 },
          { direction: Direction.south, steps: 4 },
        ])
      ).toEqual(5);
    });

    it.skip("should handle large set of commands", () => {
      const file = readFileSync(
        path.join(__dirname, "testData", "RobotCleanerPathHeavy.json")
      );

      const input = JSON.parse(file.toString());
      expect(getNumberOfVisitedPoints(input.start, input.commands)).toEqual(
        818378026
      );
    });
  });
});
