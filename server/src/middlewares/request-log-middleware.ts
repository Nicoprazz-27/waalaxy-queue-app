import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const message = {
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
        authorization: req.headers["authorization"]
    }
    logger.info(JSON.stringify(message))

    next();
}

export default requestLoggerMiddleware;