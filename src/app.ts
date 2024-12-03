import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./api/routes/global";
import { ErrorHandler } from "./api/middleware/error/handleGlobalError";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res
    .status(405)
    .send(
      `Can't find ${req.originalUrl} with method ${req.method} on this server`
    );
});

app.use(ErrorHandler);

export default app;
