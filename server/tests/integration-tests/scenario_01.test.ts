import { describe, expect, it } from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';
import Action from '../../src/models/action';

describe('Scenario 01', () =>{

    let availableActions: Action[] = [];
    let creditByAction: { [key:string]: number} = {};

    it('Get the available actions', async () => {
        const response: Response = await request(app).get('/actions');
        expect(response.status).toBe(200); 

        availableActions = response.body;
    });

    it('Get the credits', async () => {
        const response: Response = await request(app).get('/credits');
        expect(response.status).toBe(200); 

        creditByAction = response.body;
    });

    it('The credits should match', ()=>{
        let testCreditByAction: { [key:string]: number} = {};

        for (let index = 0; index < availableActions.length; index++) {
            testCreditByAction[availableActions[index].id] = availableActions[index].creditCost!;
        }

        expect(creditByAction).toStrictEqual(testCreditByAction);
    });

    it('Get the queue actions, should be null', async () => {
        const response: Response = await request(app).get('/queue-actions');
        expect(response.status).toBe(200); 
        
        expect(response.body.length).toBe(0);
    });

    it('Add a queue action', async () => {
        const response: Response = await request(app).post('/queue-actions').send({actionId: "1"});
        expect(response.status).toBe(200); 
        
        expect(response.body.length).toBe(1);
    });

    it('Get the queue actions, should equal to 1', async ()=>{
        
        const response: Response = await request(app).get('/queue-actions');
        expect(response.status).toBe(200); 
        
        expect(response.body.length).toBe(1);
        expect(response.body[0].action.id).toBe('1');

        creditByAction["1"]--;
        expect(response.body[0].creditByActionAfterExpiration).toStrictEqual(creditByAction);
    });
    
});