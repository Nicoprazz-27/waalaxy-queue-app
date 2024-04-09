import Action from "../models/action";
import QueueAction from "../models/queue-action";
import { generateUuid } from "../utils/utils";


const queueActions: QueueAction[] = [];

const getQueueActions = (): QueueAction[] =>{
    return queueActions;
}

const queueActionsService = {
    getQueueActions: getQueueActions,
};

export default queueActionsService;