import {describe, expect, it} from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';

describe('GET /credits', function () {
    const urlPath = '/credits';

    it('should return statuscode 200', async () => {
        const response: Response = await request(app).get(urlPath);
        expect(response.status).toBe(200); 
        console.log(response.body);
    });

});