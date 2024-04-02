import ColorStyles from "./color-styles";

type Action = {
    id: string;
    title: string;
    creditCost: number;
    personnalizedStyles: ColorStyles;
}

export default Action;
