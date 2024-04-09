import express, { Application } from "express";
import cors from 'cors';
import requestLoggerMiddleware from "./middlewares/request-log-middleware";
import router from "./routes/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(requestLoggerMiddleware);

app.use(router);

export default app;