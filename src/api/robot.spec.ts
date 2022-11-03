import request from "supertest";
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import robotRouter from "./robot";
import { executePath } from "../controllers/robot";
import { Direction } from "../types";

jest.mock("../controllers/robot");
const router = new Router();
router.use("/tibber-developer-test", robotRouter.routes());

const app = new Koa();
app.use(bodyParser()).use(router.routes());
const mockServer = app.listen();

const mockExecutePath = executePath as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("api - robot", () => {
  describe("POST", () => {
    it("should return successfull execution result", async () => {
      mockExecutePath.mockResolvedValueOnce({ result: "some-result" });

      const input = {
        start: { x: 1, y: 1 },
        commands: [{ direaction: Direction.east, steps: 1 }],
      };
      const response = await request(mockServer)
        .post("/tibber-developer-test/enter-path")
        .send(input);

      expect(mockExecutePath).toHaveBeenCalledTimes(1);
      expect(mockExecutePath).toHaveBeenCalledWith(input);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ result: "some-result" });
    });

    it("should handle faliure", async () => {
      mockExecutePath.mockRejectedValueOnce("Error");

      const input = {
        start: { x: 1, y: 1 },
        commands: [{ direaction: Direction.east, steps: 1 }],
      };
      const response = await request(mockServer)
        .post("/tibber-developer-test/enter-path")
        .send(input);

      expect(mockExecutePath).toHaveBeenCalledTimes(1);
      expect(mockExecutePath).toHaveBeenCalledWith(input);
      expect(response.status).toBe(500);
    });
  });
});
