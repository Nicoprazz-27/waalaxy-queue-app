import actionsService from "./actions-service";
import queueActionsService from "./queue-actions-service";

const getCredits = () => {
    const queueActions = queueActionsService.getQueueActions();
    const actions = actionsService.getActionsWithRandomCreditCost(0.8, 1);

    let creditsByAction :{[key: string]: number;} = {};
    if (queueActions.length === 0) {
        for (let index = 0; index < actions.length; index++) {
            creditsByAction[actions[index].id] = actions[index].creditCost!;
        }
    } else {
        creditsByAction = queueActions[queueActions.length - 1].creditByActionAfterExpiration;
    }

    return creditsByAction;
}

const creditsService = {
    getCredits: getCredits
};

export default creditsService;