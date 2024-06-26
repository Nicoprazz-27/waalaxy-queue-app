import { Request, Response } from "express";
import QueueAction from "../../models/queue-action";
import queueActionsService from "../../services/queue-actions-service";

export default (req: Request, res: Response) => {

  const { actionId } = req.body;
  
  if(actionId === undefined || typeof actionId !== 'string'){
    res.status(400).send('Body parameters are missing.');
    return;
  }

  try {
    const queueActions: QueueAction[] = queueActionsService.addQueueAction(actionId);
    res.send(queueActions);
  } catch (error) {
    res.status(404).send('This actionId is not found.');
  }
}
