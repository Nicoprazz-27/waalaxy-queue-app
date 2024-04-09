import { Request, Response } from "express";
import Action from "../models/action";
import { generateRandomNumberWithCache } from "../utils/utils";

export default (req: Request, res: Response) => {

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

    const actionsWithCreditCost: Action[] = actionsDefautValues.map((action: Action)=>{
      action.creditCost = Math.round(action.maxCreditCost! * generateRandomNumberWithCache(0.8, 1));
      delete action.maxCreditCost;
      return action;
    });

    res.send(actionsWithCreditCost);
}