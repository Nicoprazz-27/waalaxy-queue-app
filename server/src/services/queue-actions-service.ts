import Action from "../models/action";
import QueueAction from "../models/queue-action";
import { generateUuid, isDateTimeExpired } from "../utils/utils";


let queueActions: QueueAction[] = [];

const getQueueActions = (): QueueAction[] =>{
  //Remove the queueActions where expirationDateTime is passed
  const filteredQueueActions: QueueAction[] = queueActions.filter((queueAction)=>{
    return isDateTimeExpired(queueAction.expirationDateTime);
  });

  queueActions = filteredQueueActions;

  return queueActions;
}
    return queueActions;
}

const queueActionsService = {
    getQueueActions: getQueueActions,
};

export default queueActionsService;