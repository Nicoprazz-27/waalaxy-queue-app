import { Request, Response } from "express";
import QueueAction from "../../models/queue-action";
import queueActionsService from "../../services/queue-actions-service";

export default (req: Request, res: Response) => {

  const { actionId } = req.body;

  if(actionId === null){
    res.send(400).send('Body parameters are missing.');
  }

  try {
    const queueActions: QueueAction[] = queueActionsService.addQueueAction(actionId);
    res.send(queueActions);
  } catch (error) {
    res.status(404).send('This actionId is not found.');
  }
}
