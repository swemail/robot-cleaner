import Router from "@koa/router";
import { executePath } from "../controllers/robot";
import { Input } from "../types";

const robotRouter = new Router();

robotRouter.post("/enter-path", async (ctx) => {
  const input = ctx.request.body as Input;

  try {
    const result = await executePath(input);

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    console.error("Could not execute path", error);
    ctx.status = 500;
    return;
  }
});

export default robotRouter;
