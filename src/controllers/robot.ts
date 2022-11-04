import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getNumberOfCleanedPoints } from "../lib/executions";
import { saveExecution } from "../models/robot";
import { Input } from "../types";

dayjs.extend(utc);

const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss.mmmmmm ZZ";

export const executePath = async ({ start, commands }: Input) => {
  const numberOfCommands = commands.length;
  const timestamp = dayjs().utc().local().format(DATE_FORMAT);

  const startExecutionTime = performance.now();
  const result = getNumberOfCleanedPoints(start, commands);
  const duration = parseFloat(
    ((performance.now() - startExecutionTime) / 1000).toFixed(6)
  ); //in seconds

  const storedResult = await saveExecution({
    commands: numberOfCommands,
    timestamp,
    result,
    duration,
  });

  return storedResult;
};
