import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

export const getProjectPath = ():string => {
    return path.resolve(__dirname, '..', '..');
}

export const getUTCDateFormatYYYYMMDD = () :string => {
    const todayDate = new Date();

    const year: number = todayDate.getUTCFullYear();
    const month: string = (todayDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day: string = todayDate.getUTCDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
}

export const generateUuid = () :string => {
    return uuidv4();
}

export const isDateTimeExpired = (datetime: string): boolean => {
    const currentDateTime = new Date();
    const expirationDateTime = new Date(datetime);
    
    return (currentDateTime >= expirationDateTime);
}