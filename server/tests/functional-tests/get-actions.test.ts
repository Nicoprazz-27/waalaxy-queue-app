import {describe, expect, it} from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';
import Action from '../../src/models/action';

describe('GET /actions', function () {
    const urlPath = '/actions';

    it('should return statuscode 200', async () => {
        const response: Response = await request(app).get(urlPath);
        expect(response.status).toBe(200); 
        expect(Array.isArray(response.body)).toBe(true); 
        response.body.forEach((action: Action) => {
            expect(action).toEqual(expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                creditCost: expect.any(Number),
                personnalizedStyles: expect.objectContaining({
                    color: expect.any(String),
                    hoverColor: expect.any(String),
                    onClickColor: expect.any(String)
                })
            }));
        });
    
    });
});