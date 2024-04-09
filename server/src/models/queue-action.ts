import Action from "./action";

type QueueAction = {
    id: string;
    expirationDateTime: string;
    action: Action;
}

export default QueueAction