import { Request, Response } from "express";
import actionsService from "../../services/actions-service";

export default (req: Request, res: Response) => {

  const actions = actionsService.getActionsWithRandomCreditCost(0.8, 1);
  res.send(actions);
}

