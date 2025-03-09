import { useContext } from "react";

import { ProductContext } from "./ProductCard";

import styles from "../styles/styles.module.css";

export interface Props {
    className?: string;
    style?: React.CSSProperties;
    title?: string;
}

export const ProductTitle = ({ className, style, title }: Props) => {
    const { product } = useContext(ProductContext);

    return (
        <span
            className={ `${ styles.productDescription } ${ className }` }
            style={ style }
        >
            { title ?? product.title }
        </span>
    );
};