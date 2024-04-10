import Action from "./action";

type QueueAction = {
    id: string;
    expirationDateTime: string|null;
    action: Action;
    creditByActionAfterExpiration: {
        [key: string]: number;
    };
}

export default QueueAction