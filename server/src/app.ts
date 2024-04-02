import express, { Application } from "express";
import getActionsController from "./controllers/get-actions-controller";
import cors from 'cors';


const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/actions', getActionsController);

export default app;