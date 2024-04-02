import {describe, expect, it} from '@jest/globals';
import { generateRandomNumber, generateRandomNumberWithCache, getENVValue } from "../../src/utils";


describe('Utils tests', ()=>{
  describe('generateRandomNumber', ()=>{
    it('should generate a random number between min and max', () => {
      const min: number = 1;
      const max: number = 10;
      const randomNumber: number = generateRandomNumber(min, max);
      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    });

    it('should return the number when min and max are the same', () => {
      const min: number = 5;
      const max: number = 5;
      const randomNumber: number = generateRandomNumber(min, max);
      expect(randomNumber).toBe(min);
    });

    it('should throw an error if min is greater than max', () => {
      const min: number = 10;
      const max: number = 1;
      expect(() => generateRandomNumber(min, max)).toThrowError('min must be less than or equal to max');
    });

    it('should generate random numbers within the specified range', () => {
      const min: number = 1;
      const max: number = 10;
      const iterations: number = 1000;
    
      for (let i = 0; i < iterations; i++) {
        const randomNumber: number = generateRandomNumber(min, max);
        expect(randomNumber).toBeGreaterThanOrEqual(min);
        expect(randomNumber).toBeLessThanOrEqual(max);
      }
    });
  });

  describe('generateRandomNumberWithCache', ()=>{
    it('should return the same number due to cache', ()=>{
      const min: number = 7;
      const max: number = 10;
      const generatedNumber: number = generateRandomNumberWithCache(min, max);
      const secondGeneratedNumber: number = generateRandomNumberWithCache(min, max);
      expect(generatedNumber).toBe(secondGeneratedNumber);
    });

    it('should return a different number if the parameter are different', () => {
      const firstRandomNumber: number = generateRandomNumberWithCache(7, 9);
      const secondRandomNumber: number = generateRandomNumberWithCache(8, 10);

      expect(firstRandomNumber).not.toBe(secondRandomNumber);
    });
  });

  describe('getENVValue', ()=>{
    it('should return the .ENV port value', ()=>{
      const portEnv: string | undefined = getENVValue('PORT');
      expect(portEnv).not.toBeUndefined();
    });

    it('should return undefined as value not defined in .ENV', ()=>{
      const portEnv: string | undefined = getENVValue('EXAMPLE_VALUE_AZERTYUIOPQSD');
      expect(portEnv).toBeUndefined();
    });


  });
});