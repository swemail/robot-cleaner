import { Direction } from "../types";
import {
  getCleanedPointsPerCommand,
  getNumberOfCleanedPoints,
} from "./executions";

describe("executions", () => {
  describe("getCleanedPointsPerCommand", () => {
    it("should get expected point for east", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 0, y: 0 },
          { direction: Direction.east, steps: 2 }
        )
      ).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ]);
    });

    it("should get expected point for east with negative start", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: -10, y: 0 },
          { direction: Direction.east, steps: 2 }
        )
      ).toEqual([
        { x: -10, y: 0 },
        { x: -9, y: 0 },
        { x: -8, y: 0 },
      ]);
    });

    it("should get expected point for east when crossing zero", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: -1, y: 0 },
          { direction: Direction.east, steps: 2 }
        )
      ).toEqual([
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ]);
    });

    it("should get expected point for south", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 0, y: 0 },
          { direction: Direction.south, steps: 2 }
        )
      ).toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ]);
    });

    it("should get expected point for south with negative start", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 0, y: -10 },
          { direction: Direction.south, steps: 2 }
        )
      ).toEqual([
        { x: 0, y: -10 },
        { x: 0, y: -9 },
        { x: 0, y: -8 },
      ]);
    });

    it("should get expected point for south when crossing zero", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 0, y: -1 },
          { direction: Direction.south, steps: 2 }
        )
      ).toEqual([
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ]);
    });

    it("should get expected point for west", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 10, y: 0 },
          { direction: Direction.west, steps: 2 }
        )
      ).toEqual([
        { x: 10, y: 0 },
        { x: 9, y: 0 },
        { x: 8, y: 0 },
      ]);
    });

    it("should get expected point for west with negative start", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: -10, y: 0 },
          { direction: Direction.west, steps: 2 }
        )
      ).toEqual([
        { x: -10, y: 0 },
        { x: -11, y: 0 },
        { x: -12, y: 0 },
      ]);
    });

    it("should get expected point for west when crossing zero", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 1, y: 0 },
          { direction: Direction.west, steps: 2 }
        )
      ).toEqual([
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: -1, y: 0 },
      ]);
    });

    it("should get expected point for north", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 0, y: 10 },
          { direction: Direction.north, steps: 2 }
        )
      ).toEqual([
        { x: 0, y: 10 },
        { x: 0, y: 9 },
        { x: 0, y: 8 },
      ]);
    });

    it("should get expected point for north with negative start", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 0, y: -10 },
          { direction: Direction.north, steps: 2 }
        )
      ).toEqual([
        { x: 0, y: -10 },
        { x: 0, y: -11 },
        { x: 0, y: -12 },
      ]);
    });

    it("should get expected point for north when crossing zero", () => {
      expect(
        getCleanedPointsPerCommand(
          { x: 0, y: 1 },
          { direction: Direction.north, steps: 2 }
        )
      ).toEqual([
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ]);
    });
  });

  describe("getNumberOfCleanedPoints", () => {
    it("should handle simple case of one command", () => {
      expect(
        getNumberOfCleanedPoints({ x: 0, y: 0 }, [
          { direction: Direction.east, steps: 10 },
        ])
      ).toEqual(11);
    });

    it("should handle two commands", () => {
      expect(
        getNumberOfCleanedPoints({ x: 0, y: 0 }, [
          { direction: Direction.east, steps: 10 },
          { direction: Direction.south, steps: 10 },
        ])
      ).toEqual(21);
    });

    it("should cover a full grid", () => {
      expect(
        getNumberOfCleanedPoints({ x: 0, y: 0 }, [
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
        getNumberOfCleanedPoints({ x: 0, y: 0 }, [
          { direction: Direction.south, steps: 4 },
          { direction: Direction.north, steps: 4 },
          { direction: Direction.south, steps: 4 },
          { direction: Direction.north, steps: 4 },
          { direction: Direction.south, steps: 4 },
        ])
      ).toEqual(5);
    });

    it("should handle up to 10 000 commands", () => {
      const test = [];
      for (let index = 0; index < 10_000; index++) {
        test[index] = index;
      }
      expect(
        getNumberOfCleanedPoints(
          { x: 0, y: 0 },
          test.map((x) => ({
            direction: x % 2 === 0 ? Direction.east : Direction.south,
            steps: 10,
          }))
        )
      ).toEqual(expect.any(Number));
    });
  });
});
