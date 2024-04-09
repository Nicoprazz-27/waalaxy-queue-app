import Action from "../models/action";
import QueueAction from "../models/queue-action";
import { generateUuid, isDateTimeExpired } from "../utils/utils";
import actionsService from "./actions-service";


let queueActions: QueueAction[] = [];

const getQueueActions = (): QueueAction[] =>{
  removeExpiredQueueActions();
  return queueActions;
}

const addQueueAction = (actionId: string): QueueAction[] => {

  const actionSelected: Action|undefined = actionsService.getAction(actionId);

  if (actionSelected === undefined) {
    throw new Error('no action');
  }

  const newQueueAction:QueueAction = {
      id: generateUuid(),
      expirationDateTime: new Date().toISOString(),
      action: actionSelected!
  }
  queueActions.push(newQueueAction);
  removeExpiredQueueActions();

  return queueActions;
}

const removeExpiredQueueActions = () => {
  //Remove the queueActions where expirationDateTime is passed
  queueActions = queueActions.filter((queueAction)=>{
    return isDateTimeExpired(queueAction.expirationDateTime);
  });
}

const queueActionsService = {
    getQueueActions: getQueueActions,
    addQueueAction: addQueueAction
};

export default queueActionsService;