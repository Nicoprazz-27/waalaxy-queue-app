import Action from "../models/action";
import { generateRandomNumberWithCache } from "../utils/utils";


const actionsDefautValues: Action[] = [
    {
      id: '1',
      title: 'Action A',
      maxCreditCost: 2,
      personnalizedStyles: {
        color: '#46a256',
        hoverColor: '#3f8d47',
        onClickColor: '#3a7b41'
      }
    },
    {
      id: '2',
      title: 'Action B',
      maxCreditCost: 10,
      personnalizedStyles: {
        color: '#ffc15e',
        hoverColor: '#e0aa4a',
        onClickColor: '#cc9933'
      }
    },
    {
      id: '3',
      title: 'Action C',
      maxCreditCost: 10,
      personnalizedStyles: {
        color: '#0892a5',
        hoverColor: '#067d8f',
        onClickColor: '#056f7b'
      }
    }
];

const getActionsWithRandomCreditCost = (min: number, max: number):Action[] =>{

  const actionsWithCreditCost: Action[] = actionsDefautValues.map((action: Action)=>{
    const { maxCreditCost, ...newAction } = action;
    newAction.creditCost = Math.round(maxCreditCost! * generateRandomNumberWithCache(min, max));
    return newAction;
  });

  return actionsWithCreditCost;
}

const getAction = (actionId: string): Action|undefined => {
  const action = actionsDefautValues.find(action => action.id === actionId);

  return action !== undefined ? Object.assign({}, action) : undefined;
}

const actionsService = {
    getAction: getAction,
    getActionsWithRandomCreditCost: getActionsWithRandomCreditCost
};

export default actionsService;