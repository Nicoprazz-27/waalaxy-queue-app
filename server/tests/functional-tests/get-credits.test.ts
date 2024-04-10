import {describe, expect, it} from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../src/app';

describe('GET /credits', function () {
    const urlPath = '/credits';

    it('should return statuscode 200', async () => {
        const response: Response = await request(app).get(urlPath);
        expect(response.status).toBe(200); 
        
        expect(typeof response.body).toBe('object');
        for (const key in response.body) {
            expect(typeof key).toBe('string');
            expect(typeof response.body[key]).toBe('number');
        }
    });

});