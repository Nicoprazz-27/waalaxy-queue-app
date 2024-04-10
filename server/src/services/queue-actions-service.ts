import Action from "../models/action";
import QueueAction from "../models/queue-action";
import { generateUuid, isDateTimeExpired } from "../utils/utils";
import actionsService from "./actions-service";


let queueActions: QueueAction[] = [];

const getQueueActions = (): QueueAction[] =>{
  return removeExpiredQueueActions();
}

const addQueueAction = (actionId: string): QueueAction[] => {
  const actionSelected: Action|undefined = actionsService.getAction(actionId);

  if (actionSelected === undefined) {
    throw new Error('no action');
  }

  delete actionSelected.creditCost;
  delete actionSelected.maxCreditCost;
  
  let creditByAction : {[key: string]: number;} = {};
  let expirationDateTime: string | null = null;

  if(queueActions.length === 0){
    const actionsAvailable = actionsService.getActionsWithRandomCreditCost(0.8, 1);
    
    //Intialize the value
    for (let index = 0; index < actionsAvailable.length; index++) {
      creditByAction[actionsAvailable[index].id] = actionsAvailable[index].creditCost!;
    }

    //Remove one credit to the element 
    if(creditByAction[actionSelected.id]! > 0){
      creditByAction[actionSelected.id] = creditByAction[actionSelected.id] - 1;
      const utcNow = new Date();
      utcNow.setUTCSeconds(utcNow.getUTCSeconds() + 15);
      expirationDateTime = utcNow.toISOString();
    }
    
  } else {
    creditByAction = Object.assign({}, queueActions[queueActions.length - 1].creditByActionAfterExpiration);

    //Remove one credit to the element 
    if(creditByAction[actionSelected.id]! > 0){
      creditByAction[actionSelected.id] = creditByAction[actionSelected.id] - 1;
      
      //Define the expirationDateTime
      for (let index = queueActions.length - 1 ; index >= 0 ; index--) {
        if(queueActions[index].expirationDateTime === null){
          continue;
        }

        if(isDateTimeExpired(queueActions[index].expirationDateTime!)){
          const utcNow = new Date();
          utcNow.setUTCSeconds(utcNow.getUTCSeconds() + 15);
          expirationDateTime = utcNow.toISOString();
          break;
        }

        const previousExpirationDateTime = new Date(queueActions[index].expirationDateTime!);
        previousExpirationDateTime.setUTCSeconds(previousExpirationDateTime.getUTCSeconds() + 15);
        expirationDateTime = previousExpirationDateTime.toISOString();
        break;
      }
    } 
  }
  
  const newQueueAction :QueueAction = {
      id: generateUuid(),
      expirationDateTime: expirationDateTime,
      action: actionSelected!,
      creditByActionAfterExpiration: JSON.parse(JSON.stringify(creditByAction))
  }
  queueActions.push(newQueueAction);

  return removeExpiredQueueActions();
}

const removeExpiredQueueActions = (): QueueAction[] => {
  //Remove the queueActions where expirationDateTime is passed
  const queueActionsWithoutExpired = queueActions.filter((queueAction)=>{
    if(queueAction.expirationDateTime === null){
      return true;
    }
    return !isDateTimeExpired(queueAction.expirationDateTime);
  });

  return queueActionsWithoutExpired;
}

const queueActionsService = {
    getQueueActions: getQueueActions,
    addQueueAction: addQueueAction
};

export default queueActionsService;