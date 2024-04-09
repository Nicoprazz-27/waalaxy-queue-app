import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import path from 'path';

//15 minutes for the cache expiration
const generatedNumberCache: NodeCache = new NodeCache({stdTTL: 900, checkperiod: 1});

export const getENVValue = (key: string): string|undefined => {
    dotenv.config();
    return process.env[key];
}

export const generateRandomNumberWithCache = (min: number, max: number): number => {
    const cacheKey: string = `${min}-${max}`;

    if(generatedNumberCache.has(cacheKey)){
        return generatedNumberCache.get(cacheKey)!;
    }

    const generatedNumber: number = generateRandomNumber(min, max);
    generatedNumberCache.set(cacheKey, generatedNumber);
    
    return generatedNumber;
}

export const generateRandomNumber = (min: number, max: number): number => {
    if (min > max) {
        throw new Error('min must be less than or equal to max');
    }
    return Math.random() * (max - min) + min;
}
