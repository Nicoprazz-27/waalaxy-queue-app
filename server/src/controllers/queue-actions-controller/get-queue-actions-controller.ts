import { Request, Response } from "express";
import QueueAction from "../../models/queue-action";
import queueActionsService from "../../services/queue-actions-service";

export default (req: Request, res: Response) => {

  const queueActions: QueueAction[] = queueActionsService.getQueueActions();

  res.send(queueActions);
}
