import express, { Application } from "express";
import getActionsController from "./controllers/get-actions-controller";
import cors from 'cors';
import requestLoggerMiddleware from "./middlewares/request-log-middleware";


const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);

app.get('/actions', getActionsController);

export default app;