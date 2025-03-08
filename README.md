# Lazy loading y chunks

El lazy loading nos permite mejorar el performance de nuestras aplicaciones, ya que los componentes se cargan únicamente cuando se necesitan, evitando cargarlos de forma innecesaria con todo lo demás. Hay otro truco que podemos aplicar y es hacer el Lazy Loading por módulos, esto nos permite no tener que hacer un Lazy Loading para todo sino que con un simple componente que contiene todo lo demás podremos continuar con las mejoras del performance.


## App.tsx
```jsx
import { Navigation } from "./routes/Navigation";

function App() {
	return (
		<>
			<Navigation />
		</>
	);
}

export default App;
```

## Navigation.tsx

```jsx
import { BrowserRouter, NavLink, Navigate, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import { routes } from "./routes";

import logo  from "../logo.svg";

export const Navigation = () => {
    return (
        <Suspense fallback={ <span>Loading...</span> }>
            <BrowserRouter>
                <div className="main-layout">
                    <nav>
                        <img src={ logo } alt="React Logo" />
                        
                        <ul>
                            {
                                routes.map(({ name, to }) => (
                                    <li key={ to }>
                                        <NavLink
                                            className={ ({ isActive }) => isActive ? "nav-active" : "" }
                                            to={ to }
                                        >{ name }</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>

                    <Routes>
                        {
                            routes.map(({ Component, path, to }) => (
                                <Route
                                    element={ <Component /> }
                                    key={ to }
                                    path={ path }
                                />
                            ))
                        }

                        <Route
                            element={ <Navigate to={ routes[0].to } replace /> }
                            path="/*"
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </Suspense>
    );
};
```


## routes.ts

```ts
import { lazy } from "react";
import { NoLazy } from "../01-lazyload/pages/NoLazy";

type JSXComponent = () => React.JSX.Element;

interface Route {
    Component: React.LazyExoticComponent<() => React.JSX.Element> | JSXComponent;
    name: string;
    path: string;
    to: string;
}

const LazyLayout = lazy(() => import(/* webpackChunkName: "LazyLayout" */ "../01-lazyload/layout/LazyLayout"));

export const routes: Route[] = [
    {
        Component: LazyLayout,
        name: "LazyLayout - Dash",
        path: "/lazyload/*",
        to: "/lazyload/"
    },
    {
        Component: NoLazy,
        name: "No Lazy",
        path: "/no-lazy",
        to: "/no-lazy"
    }
];
```


## LazyLayout.tsx

```jsx
import { Navigate, NavLink, Route, Routes } from "react-router-dom";

import { LazyPage1, LazyPage2, LazyPage3 } from "../pages";

const LazyLayout = () => {
    return (
        <div>
            <h1>LazyLayout Page</h1>

            <ul>
                <li>
                    <NavLink to="lazy1">Lazy1</NavLink>
                </li>

                <li>
                    <NavLink to="lazy2">Lazy2</NavLink>
                </li>

                <li>
                    <NavLink to="lazy3">Lazy3</NavLink>
                </li>
            </ul>

            <Routes>
                <Route path="lazy1" element={ <LazyPage1 /> } />

                <Route path="lazy2" element={ <LazyPage2 /> } />

                <Route path="lazy3" element={ <LazyPage3 /> } />

                {/* <Route path="*" element={ <div>Not Found</div> } /> */}

                <Route path="*" element={ <Navigate to="lazy1" replace /> } />
            </Routes>
        </div>
    );
};

export default LazyLayout;
```

Aquí como podemos ver hicimos la carga de forma gradual con el Layout y esto lo que nos permite es hacer la carga de todos los componentes de la página a la que intentamos acceder de forma gradual.


# Patrones de componentes

## Compound Component Pattern

Muchas veces tenemos una gran cantidad de código en nuestro archivo, entre estos mucho HTML, nuestro componente tiende a verse muy grande, para solucionar esto podemos dividir todo en componentes de nuestro módulo. Por ejemplo, si tenemos un componente que muestra toda la tarjeta de un producto, tendremos muchos inconvenientes porque tendríamos el componente de imagen, el título, y los botones, y estos no serían reutilizables de manera individual, además de que tendríamos un componente muy grande. La forma de solucionarlo con este patrón de componentes es crear componentes más pequeños reutilizables para que nuestro ProductCard quede mucho más sencillo.

### ShoppingPage.tsx
```jsx
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";

const product = {
    id: "1",
    title: "Coffee Mug - Card",
    img: "./coffee-mug.png"
};

export const ShoppingPage = () => {
    return (
        <div>
            <h1>Shopping Store</h1>

            <hr />

            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
            }}>
                <ProductCard product={ product }>
                    <ProductCard.Image />

                    <ProductCard.Title title={ "Hola Mundo" } />

                    <ProductCard.Buttons />
                </ProductCard>

                <ProductCard product={ product }>
                    <ProductImage />

                    <ProductTitle />

                    <ProductButtons />
                </ProductCard>
            </div>
        </div>
    );
};
```

### index.ts de components
```jsx
import { ProductCard as ProductCardHOC } from "./ProductCard";

import { ProductButtons } from "./ProductButtons";
import { ProductCardHOCProps } from "../interfaces/interfaces";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";

export { ProductButtons } from "./ProductButtons";
export { ProductImage } from "./ProductImage";
export { ProductTitle } from "./ProductTitle";

export const ProductCard: ProductCardHOCProps = Object.assign(ProductCardHOC, {
    Title: ProductTitle,
    Image: ProductImage,
    Buttons: ProductButtons
});

export default ProductCard;
```

### ProductCard.tsx
```jsx
import { createContext } from "react";

import { ProductCardProps, ProductContextProps } from "../interfaces/interfaces";
import { useProduct } from "../hooks/useProduct";

import styles from "../styles/styles.module.css";

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({ children, product }: ProductCardProps) => {
    const { counter, increaseBy } = useProduct();

    return (
        <Provider value={{
            counter,
            increaseBy,
            product
        }}>
            <div className={ styles.productCard }>
                { children }
            </div>
        </Provider>
    );
};
```

### ProductButtons.tsx
```jsx
import { useContext } from "react";

import { ProductContext } from "./ProductCard";

import styles from "../styles/styles.module.css";

export const ProductButtons = () => {
    const { counter, increaseBy } = useContext(ProductContext);

    return (
        <div className={ styles.buttonsContainer }>
            <button
                className={ styles.buttonMinus }
                onClick={ () => increaseBy(-1) }
            >-</button>

            <div className={ styles.countLabel }>{ counter }</div>

            <button
                className={ styles.buttonAdd }
                onClick={ () => increaseBy(1) }
            >+</button>
        </div>
    );
};
```

### ProductImage.tsx
```jsx
import { useContext } from "react";

import { ProductContext } from "./ProductCard";

import noImage from "../assets/no-image.jpg";
import styles from "../styles/styles.module.css";

export const ProductImage = ({ img = "" }) => {
    const { product } = useContext(ProductContext);
    let imgToShow: string;

    if(img) {
        imgToShow = img;
    } else if (product.img) {
        imgToShow = product.img;
    } else {
        imgToShow = noImage;
    }

    return (
        <img
            alt="Product logo"
            className={ styles.productImg }
            src={ imgToShow }
        />
    );
};
```

### ProductTitle.tsx
```jsx
import { useContext } from "react";

import { ProductContext } from "./ProductCard";

import styles from "../styles/styles.module.css";

export const ProductTitle = ({ title }: { title?: string }) => {
    const { product } = useContext(ProductContext);

    return (
        <span className={ styles.productDescription }>{ title ?? product.title }</span>
    );
};
```

