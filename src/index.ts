import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";

dotenv.config();

import robotRouter from "./api/robot";

const app = new Koa();
const router = new Router();

router.use("/tibber-developer-test", robotRouter.routes());

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT);

console.log("app listening on port", process.env.PORT);
