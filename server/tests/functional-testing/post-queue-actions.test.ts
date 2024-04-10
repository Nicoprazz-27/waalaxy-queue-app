import {describe, expect, it} from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';
import QueueAction from '../../src/models/queue-action';
import { isUuid } from '../helpers';

describe('POST /queue-actions', function () {
    const urlPath = '/queue-actions';

    it('should return statuscode 200', async () => {
        const actionId = "1";

        const response: Response = await request(app).post(urlPath).send({ actionId: actionId });
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        response.body.forEach((queueAction: QueueAction) => {
            expect(isUuid(queueAction.id)).toEqual(true);
            expect(queueAction.expirationDateTime).toEqual(expect.any(String));
            expect(queueAction.action.id).toEqual(actionId);
            expect(queueAction.action.title).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.color).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.hoverColor).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.onClickColor).toEqual(expect.any(String));
        });
    });

    it('should return statuscode 200', async () => {
        const actionId = "1";

        const response: Response = await request(app).post(urlPath).send({ actionId: actionId });
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);

        response.body.forEach((queueAction: QueueAction) => {
            expect(isUuid(queueAction.id)).toEqual(true);
            expect(queueAction.expirationDateTime).toEqual(expect.any(String));
            expect(queueAction.action.id).toEqual(actionId);
            expect(queueAction.action.title).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.color).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.hoverColor).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.onClickColor).toEqual(expect.any(String));
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