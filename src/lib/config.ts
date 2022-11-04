import "dotenv/config";
import { cleanEnv, str, num } from "envalid";

const configValidation = {
  PORT: num(),
  DB_USER: str(),
  DB_HOST: str(),
  DB_NAME: str(),
  DB_PASSWORD: str(),
  DB_PORT: num(),
};

export default cleanEnv(process.env, configValidation);
