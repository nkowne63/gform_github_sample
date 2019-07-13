import express, { Request, Response } from "express";
import bodyParser from "body-parser";

// 実行時に指定され、dotenvやwebpackなどでは効かない
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

type availableMethods = "get" | "post";

export const setHandler: (
  method: availableMethods,
  path: string,
  handler: (req: Request, res: Response) => void
) => void = (method, path, handler) => {
  app[method](path, handler);
};

export const initServer: () => void = () => {
  app.listen(port);
  console.log(`server started at port ${port}`);
};
