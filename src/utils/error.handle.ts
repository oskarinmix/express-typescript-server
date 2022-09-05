import { Response } from "express";

const handleError = (res: Response, error: string, rawError: any) => {
  console.log("rawError", rawError);
  res.status(500);
  res.send({ error, errors: rawError.errors, message: rawError.message });
};
export { handleError };
