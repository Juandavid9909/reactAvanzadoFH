import { useState } from "react";
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import { Product } from "../interfaces/interfaces";

import "../styles/custom-styles.css";

const product1 = {
    id: "1",
    title: "Coffee Mug - Card",
    img: "./coffee-mug.png"
};

const product2 = {
    id: "1",
    title: "Coffee Mug - Meme",
    img: "./coffee-mug2.png"
};

const products : Product[] = [product1, product2];

interface ProductInCart extends Product {
    count: number;
}

export const ShoppingPage = () => {
    const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({});

    const onProductCountChange = () => {};

    return (
        <div>
            <h1>Shopping Store</h1>

            <hr />

            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
            }}>
                <ProductCard
                    className="bg-dark text-white"
                    product={ product1 }
                >
                    <ProductCard.Image className="custom-image" />

                    <ProductCard.Title className="text-bold" title={ "Hola Mundo" } />

                    <ProductCard.Buttons className="custom-buttons" />
                </ProductCard>

                {
                    products.map((product) => (
                        <ProductCard
                            className="bg-dark text-white"
                            key={ product.id }
                            product={ product }
                        >
                            <ProductImage className="custom-image" />

                            <ProductTitle className="text-bold" />

                            <ProductButtons className="custom-buttons" />
                        </ProductCard>
                    ))
                }
            </div>

            <div className="shopping-cart">
                <ProductCard
                    className="bg-dark text-white"
                    onChange={ onProductCountChange }
                    product={ product2 }
                    style={{
                        width: "100px"
                    }}
                >
                    <ProductImage className="custom-image" />

                    <ProductButtons className="custom-buttons" />
                </ProductCard>

                <ProductCard
                    className="bg-dark text-white"
                    product={ product1 }
                    style={{
                        width: "100px"
                    }}
                >
                    <ProductImage className="custom-image" />

                    <ProductButtons className="custom-buttons" />
                </ProductCard>
            </div>
        </div>
    );
};