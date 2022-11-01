import { calculateCommands } from "./logic";

describe("logic", () => {
  it("should run tests", () => {
    expect(calculateCommands()).toBe(true);
  });
});
