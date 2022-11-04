import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import robotRouter from "./api/robot";
import config from "./lib/config";

const { PORT } = config;

const app = new Koa();
const router = new Router();

router.use("/tibber-developer-test", robotRouter.routes());

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(PORT);

console.log("app listening on port", PORT);
