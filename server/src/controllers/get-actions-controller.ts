import { Request, Response } from "express";
import Action from "../models/action";
import { generateRandomNumberWithCache } from "../utils/utils";
import actionsService from "../services/actions-service";

export default (req: Request, res: Response) => {

  const actionsDefautValues = actionsService.getActions();

  const actionsWithCreditCost: Action[] = actionsDefautValues.map((action: Action)=>{
    action.creditCost = Math.round(action.maxCreditCost! * generateRandomNumberWithCache(0.8, 1));
    delete action.maxCreditCost;
    return action;
  });

  res.send(actionsWithCreditCost);
}

