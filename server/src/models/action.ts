type Action = {
    id: string;
    title: string;
    maxCreditCost?: number;
    creditCost?: number;
    personnalizedStyles: {
        color: string;
        hoverColor: string;
        onClickColor: string;
    }
}

export default Action