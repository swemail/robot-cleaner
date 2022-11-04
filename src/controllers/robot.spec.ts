import { getNumberOfCleanedPoints } from "../lib/executions";
import { saveExecution } from "../models/robot";
import { Direction } from "../types";
import { executePath } from "./robot";

jest.mock("../lib/executions");
jest.mock("../models/robot");

const mockSaveExecution = saveExecution as jest.Mock;
const mockGetNumberOfCleanedPoints = getNumberOfCleanedPoints as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("controllers - robot", () => {
  describe("executePath", () => {
    it("should execute result and store result", async () => {
      mockGetNumberOfCleanedPoints.mockReturnValueOnce(10);
      mockSaveExecution.mockImplementationOnce((input) =>
        Promise.resolve({
          id: 1,
          ...input,
        })
      );

      const input = {
        start: { x: 1, y: 1 },
        commands: [{ direction: Direction.east, steps: 10 }],
      };
      const result = await executePath(input);

      expect(result).toEqual({
        id: 1,
        commands: 1,
        duration: expect.any(Number),
        timestamp: expect.any(String),
        result: 10,
      });
      expect(mockGetNumberOfCleanedPoints).toHaveBeenCalledTimes(1);
      expect(mockGetNumberOfCleanedPoints).toHaveBeenCalledWith(
        input.start,
        input.commands
      );
      expect(mockSaveExecution).toHaveBeenCalledTimes(1);
      expect(mockSaveExecution).toBeCalledWith({
        commands: 1,
        duration: expect.any(Number),
        timestamp: expect.any(String),
        result: 10,
      });
    });
  });
});
