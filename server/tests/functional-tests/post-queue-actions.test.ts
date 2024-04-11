import {describe, expect, it} from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';
import QueueAction from '../../src/models/queue-action';

describe('POST /queue-actions', function () {
    const urlPath = '/queue-actions';

    it('should return statuscode 200', async () => {
        const actionId = "1";

        const response: Response = await request(app).post(urlPath).send({ actionId: actionId });
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); 
        expect(response.body.length).toBe(1);

        response.body.forEach((queueAction: QueueAction) => {
            expect(queueAction).toEqual(expect.objectContaining({
                id: expect.any(String),
                expirationDateTime: expect.any(String),
                creditByActionAfterExpiration: expect.any(Object),
                action: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    personnalizedStyles: expect.objectContaining({
                        color: expect.any(String),
                        hoverColor: expect.any(String),
                        onClickColor: expect.any(String)
                    })
                })
            }));
        });
    });

    it('should return statuscode 200', async () => {
        const actionId = "1";

        const response: Response = await request(app).post(urlPath).send({ actionId: actionId });
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); 
        expect(response.body.length).toBe(2);

        response.body.forEach((queueAction: QueueAction) => {
            expect(queueAction).toEqual(expect.objectContaining({
                id: expect.any(String),
                expirationDateTime: expect.any(String),
                creditByActionAfterExpiration: expect.any(Object),
                action: expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    personnalizedStyles: expect.objectContaining({
                        color: expect.any(String),
                        hoverColor: expect.any(String),
                        onClickColor: expect.any(String)
                    })
                })
            }));
        });
    });

    it('should return statuscode 404', async () => {
        const response: Response = await request(app).post(urlPath).send({ actionId: "57254ABUSVZWZDSQ-1SSA" });
        
        expect(response.status).toBe(404);
    });

    it('should return statuscode 400', async () => {
        const response: Response = await request(app).post(urlPath).send();
        
        expect(response.status).toBe(400);
    });

    it('should return statuscode 400', async () => {
        const response: Response = await request(app).post(urlPath).send({ actionId: 1 });
        
        expect(response.status).toBe(400);
    });
});