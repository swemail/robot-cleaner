import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import robotRouter from "./api/robot";

const app = new Koa();
const router = new Router();

router.use("/tibber-developer-test", robotRouter.routes());

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(5000);

console.log("app listening on port", 5000);
