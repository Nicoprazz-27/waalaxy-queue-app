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
        response.body.forEach((queueAction: QueueAction) => {
            expect(isUuid(queueAction.id)).toEqual(true);
            expect(queueAction.expirationDateTime).toEqual(expect.any(String));
            expect(queueAction.action.id).toEqual(expect.any(String));
            expect(queueAction.action.title).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.color).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.hoverColor).toEqual(expect.any(String));
            expect(queueAction.action.personnalizedStyles.onClickColor).toEqual(expect.any(String));
        });
    });
});