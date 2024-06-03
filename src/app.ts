import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes/index";

const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api/v1", routes);

// global error handler
app.use(globalErrorHandler);

export default app;
