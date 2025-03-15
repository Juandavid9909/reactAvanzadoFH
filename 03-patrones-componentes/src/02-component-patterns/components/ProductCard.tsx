import { createContext, ReactElement } from "react";

import { onChangeArgs, Product, ProductContextProps } from "../interfaces/interfaces";
import { useProduct } from "../hooks/useProduct";

import styles from "../styles/styles.module.css";

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export interface Props {
    children?: ReactElement | ReactElement[];
    className?: string;
    product: Product;
    style?: React.CSSProperties;
    value?: number;
    onChange?: (args: onChangeArgs) => void;
}

export const ProductCard = ({ children, className, product, style, value, onChange }: Props) => {
    const { counter, increaseBy } = useProduct({ onChange, product, value });

    return (
        <Provider value={{
            counter,
            increaseBy,
            product
        }}>
            <div
                className={ `${ styles.productCard } ${ className }` }
                style={ style }
            >
                { children }
            </div>
        </Provider>
    );
};