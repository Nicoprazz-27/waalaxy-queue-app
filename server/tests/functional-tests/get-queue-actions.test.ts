import {describe, expect, it} from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';
import QueueAction from '../../src/models/queue-action';
import { isUuid } from '../helpers';

describe('GET /queue-actions', function () {
    const urlPath = '/queue-actions';

    it('should return statuscode 200', async () => {
        const response: Response = await request(app).get(urlPath);
        expect(response.status).toBe(200); 
        expect(Array.isArray(response.body)).toBe(true); 
        response.body.forEach((queueAction: QueueAction) => {
            expect(queueAction).toEqual(expect.objectContaining({
                id: expect.any(String),
                expirationDateTime: expect.any(String),
                creditByActionAfterExpiration: expect.any(Object),
                action: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    creditCost: expect.any(Number),
                    personnalizedStyles: expect.objectContaining({
                        color: expect.any(String),
                        hoverColor: expect.any(String),
                        onClickColor: expect.any(String)
                    })
                })
            }));
        });
    });
});