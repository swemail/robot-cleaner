import { Result, ResultInput } from "../types";

export const saveExecution = async (data: ResultInput): Promise<Result> => {
  return {
    id: 1,
    ...data,
  };
};
