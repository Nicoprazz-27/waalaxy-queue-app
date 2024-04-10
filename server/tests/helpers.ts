import { validate as uuidValidate } from 'uuid';

export const isUuid = (uuid: string) :boolean=>{
    return uuidValidate(uuid);
}