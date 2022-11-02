import { range } from "./utils";

describe("utils", () => {
  describe("range", () => {
    it("should create a positive range from zero", () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    });

    it("should create a positive range from number larger than zero", () => {
      expect(range(5, 5)).toEqual([5, 6, 7, 8, 9]);
    });

    it("should create a negative range from number smaller than zero", () => {
      expect(range(-5, 5)).toEqual([-5, -4, -3, -2, -1]);
    });
  });
});
