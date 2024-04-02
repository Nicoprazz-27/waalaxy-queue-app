import {describe, expect, it} from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';
import Action from '../../src/models/action';

describe('GET /actions', function () {

    it('should return statuscode 200', async () => {
        const response: Response = await request(app).get('/actions');
        expect(response.status).toBe(200); 
        response.body.forEach((action: Action) => {
            expect(action.id).toEqual(expect.any(String));
            expect(action.title).toEqual(expect.any(String));
            expect(action.creditCost).toEqual(expect.any(Number));
            expect(action.personnalizedStyles.color).toEqual(expect.any(String));
            expect(action.personnalizedStyles.hoverColor).toEqual(expect.any(String));
            expect(action.personnalizedStyles.onClickColor).toEqual(expect.any(String));
        });
    });


});