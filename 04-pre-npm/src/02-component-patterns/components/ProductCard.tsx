import { createContext, JSX } from "react";

import { InitialValues, onChangeArgs, Product, ProductCardHandlers, ProductContextProps } from "../interfaces/interfaces";
import { useProduct } from "../hooks/useProduct";

import styles from "../styles/styles.module.css";

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export interface Props {
    // children?: ReactElement | ReactElement[];
    children: (args: ProductCardHandlers) => JSX.Element
    className?: string;
    initialValues?: InitialValues;
    product: Product;
    style?: React.CSSProperties;
    value?: number;
    onChange?: (args: onChangeArgs) => void;
}

export const ProductCard = ({ children, className, initialValues, product, style, value, onChange }: Props) => {
    const { counter, increaseBy, maxCount, isMaxCountReached, reset } = useProduct({ onChange, product, value, initialValues });

    return (
        <Provider value={{
            counter,
            increaseBy,
            maxCount,
            product
        }}>
            <div
                className={ `${ styles.productCard } ${ className }` }
                style={ style }
            >
                {
                    children({
                        count: counter,
                        isMaxCountReached,
                        maxCount: initialValues?.maxCount,
                        product,
                        increaseBy,
                        reset
                    })
                }
            </div>
        </Provider>
    );
};