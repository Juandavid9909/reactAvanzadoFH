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


## Extensible Styles

Esto nos permite poder realizar modificaciones personalizadas mediante clases para nuestros componentes. Nos permite pasarles estilos o clases prefabricadas para alterar su diseño dependiendo de nuestra necesidad.

Para hacerlo podemos crear interfaces que acepten props como `className` y `style`, aquí un ejemplo:

```ts
export interface Props {
    children?: ReactElement | ReactElement[];
    className?: string;
    product: Product;
    style?: React.CSSProperties;
}
```

Y ya con esto se pueden pasar los estilos de la siguiente forma:

```jsx
<ProductCard
    className="bg-dark text-white"
    product={ product }
>
    <ProductCard.Image className="custom-image" />

    <ProductCard.Title className="text-bold" title={ "Hola Mundo" } />

    <ProductCard.Buttons className="custom-buttons" />
</ProductCard>
```


## Control Props

Esto lo que nos permite es darle un mejor manejo a nuestros inputs sin pasar objetos reactivos de forma indirecta para que se actualicen.


# State initializer + Function Child = Render Props

Es una implementación propia de lo que hace Formik. Esto permite recibir los argumentos y retornar una función que retorna un componente, haciendo así más fácil el manejo de estados y demás en nuestros formularios.


# Desplegar paquete de componentes

## 1. Crear proyecto de tsdx

```bash
npx tsdx create nombre-proyecto

# Seleccionar react o react-storybook dependiendo de lo que necesitemos
```


## 2. Configurar todo nuestro proyecto con los archivos que queremos exportar

Se organiza todo lo que queramos exportar en nuestro paquete, como interfaces, componentes, hooks, etc. Es importante aclarar que en el index.tsx debemos tener nuestro export default para los componentes principales.


## 3. Configurar módulos

Primero tendremos que instalar los siguientes paquetes:

```bash
yarn add -D postcss rollup-plugin-postcss @rollup/plugin-image
```

Luego configurar el archivo de tipado `typings.d.ts` en la raíz del proyecto:

```typescript
declare  module  "*.css" {
    const  content: { [className: string]: string };
    export  default  content;
}

declare  module  "*.jpg" {
    const  value: any;
    export  default  value;
}
```

Y por último crear el archivo `tsdx.config.js` con el siguiente contenido:

```javascript
const  postcss  =  require("rollup-plugin-postcss");
const  images  =  require("@rollup/plugin-image");

module.exports = {
    rollup(config, options) {
        config.plugins  = [
            postcss({ modules: true }),
            images({ incude: ["**/*.png", "**/*.jpg"] }),
            ...config.plugins,
        ];

        return  config;
    },
};
```


## Crear build

Podemos crear la versión build ejecutando el comando:

```bash
tsdx build
```


## Crear y subir a GitHub

Creamos nuestro repositorio en GitHub para subir los archivos, adicional, podemos agregar las siguientes cosas a nuestro `package.json` para darle más información a NPM sobre nuestro paquete:

### Link repositorio
```json
"repository": {
    "url": "nuestra-url",
    "type": "git"
}
```

### Homepage
```json
"homepage": "nuestra-pagina-principal"
```

### Keywords
```json
"keywords": [
    "product",
    "description"
]
```


## Pruebas automatizadas

Para realizar las pruebas automatizadas necesitamos instalar las siguientes dependencias:

```bash
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

yarn add @types/react @types/react-dom @types/react-test-renderer

# Si tenemos CSS y/o imagenes como módulos
yarn add -D identity-obj-proxy
```

Luego añadimos el siguiente objeto a nuestro `package.json`:

```json
"jest":{
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|
m4a|aac|oga)$": "identity-obj-proxy",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
}
```

Y para ejecutar nuestras pruebas podemos agregar el siguiente script:

```json
"test:watch": "tsdx test --watch",
```

Ya hecho esto, podremos escribir nuestras pruebas sin inconvenientes y ejecutarlas con el script que agregamos.


## Publicar

Tendremos que loguearnos en npm ejecutando el comando `npm login`. Luego subimos nuestros cambios al repositorio de GitHub, junto con esto creamos un tag y una vez hagamos todo esto podremos ejecutar `yarn publish`. Estos mismos pasos se pueden aplicar para actualizar los paquetes de npm.


# Formik

Es una opción para administrar nuestros formularios sin tener que crearlos desde 0, ya que no tendremos que crear hooks para administrar datos y demás, sino que podremos hacer todo de una forma mucho más sencilla y efectiva. Para instalar formik y yup podemos ejecutar el siguiente comando:

```bash
yarn add formik yup
```


## Yup

Para usar Formik de forma manual con validaciones de Yup podemos seguir el siguiente ejemplo:

```jsx
import { useFormik } from "formik";
import * as Yup from 'yup';

import "../styles/styles.css";

export const FormikYupPage = () => {
    const { errors, getFieldProps, handleSubmit, touched } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            lastName: Yup.string()
                .max(10, "Must be 10 characters or less")
                .required("Required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
        })
    });

    return (
        <div>
            <h1>Formik Yup</h1>

            <form onSubmit={ handleSubmit } noValidate>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    { ...getFieldProps("firstName") }
                />
                { touched.firstName && errors.firstName && <span>{ errors.firstName }</span> }

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    { ...getFieldProps("firstName") }
                />
                { touched.lastName && errors.lastName && <span>{ errors.lastName }</span> }

                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    { ...getFieldProps("firstName") }
                />
                { touched.email && errors.email && <span>{ errors.email }</span> }

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
```


## Formik components

Para evitar tener que hacer todo a mano podemos usar los componentes que nos brinda Formik de la siguiente forma:

```jsx
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import "../styles/styles.css";

export const FormikComponents = () => {
    return (
        <div>
            <h1>Formik Components</h1>

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    terms: false,
                    jobType: "",
                }}
                onSubmit={ (values) => {
                    console.log(values);
                } }
                validationSchema={ Yup.object({
                    firstName: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    lastName: Yup.string()
                        .max(10, "Must be 10 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    jobType: Yup.string()
                        .required("Required")
                        .notOneOf(["it-jr"], "This option is not allowed"),
                    terms: Yup.boolean()
                        .oneOf([true], "You must accept terms and conditions"),
                }) }
            >
                {
                    (formik) => (
                        <Form>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <ErrorMessage component="span" name="firstName" />

                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" />
                            <ErrorMessage component="span" name="lastName" />

                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" />
                            <ErrorMessage component="span" name="email" />

                            <label htmlFor="jobType">Job Type</label>
                            <Field name="jobType" as="select">
                                <option value="">Pick something</option>

                                <option value="developer">Developer</option>

                                <option value="designer">Designer</option>

                                <option value="it-senior">IT Senior</option>

                                <option value="it-jr">IT Jr.</option>
                            </Field>
                            <ErrorMessage component="span" name="jobType" />

                            <label>
                                <Field name="terms" type="checkbox" />
                                Terms and conditions
                            </label>
                            <ErrorMessage component="span" name="terms" />

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};
```


## useField

Podemos usar este hook de Formik para crear un componente reutilizable para nuestros campos:

```jsx
// Componente reutilizable
import { ErrorMessage, useField } from "formik";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
    [x: string]: any;
}

export const MyTextInput = ({ label, ...props }: Props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={ props.id || props.name }>{ label }</label>

            <input
                className="text-input"
                { ...field }
                { ...props }
            />

            <ErrorMessage component="span" name={ props.name } />

            {
                // meta.touched && meta.error && (
                //     <span className="error">{ meta.error }</span>
                // )
            }
        </>
    );
};

// Cómo usarlo en otro componente (dentro de nuestro componente Formik
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { MyCheckbox, MySelect, MyTextInput } from "../components";

import "../styles/styles.css";

export const FormikAbstraction = () => {
    return (
        <div>
            <h1>Formik Abstraction</h1>

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    terms: false,
                    jobType: "",
                }}
                onSubmit={ (values) => {
                    console.log(values);
                } }
                validationSchema={ Yup.object({
                    firstName: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    lastName: Yup.string()
                        .max(10, "Must be 10 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    jobType: Yup.string()
                        .required("Required")
                        .notOneOf(["it-jr"], "This option is not allowed"),
                    terms: Yup.boolean()
                        .oneOf([true], "You must accept terms and conditions"),
                }) }
            >
                {
                    (formik) => (
                        <Form>
                            <MyTextInput
                                label="First Name"
                                name="firstName"
                                placeholder="Juan"
                            />

                            <MyTextInput
                                label="Last Name"
                                name="lastName"
                                placeholder="David"
                            />

                            <MyTextInput
                                label="Email"
                                name="email"
                                placeholder="juan@mail.com"
                                type="email"
                            />

                            <MySelect label="Job Type" name="jobType">
                                <option value="">Pick something</option>

                                <option value="developer">Developer</option>

                                <option value="designer">Designer</option>

                                <option value="it-senior">IT Senior</option>

                                <option value="it-jr">IT Jr.</option>
                            </MySelect>

                            <MyCheckbox
                                label="Terms and conditions"
                                name="terms"
                            />

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};
```


## Formularios dinámicos

Los podemos crear usando de ejemplo el siguiente componente con su JSON de campos:

### Datos de campos del formulario
```json
[{
        "label": "First Name",
        "name": "firstName",
        "placeholder": "Juan",
        "type": "input",
        "validations": [{
                "type": "required"
            },
            {
                "type": "minLength",
                "value": 5
            }
        ],
        "value": ""
    },
    {
        "label": "Last Name",
        "name": "lastName",
        "placeholder": "David",
        "type": "input",
        "validations": [{
            "type": "required"
        }],
        "value": ""
    },
    {
        "label": "Email",
        "name": "email",
        "placeholder": "juan@mail.com",
        "type": "email",
        "validations": [{
                "type": "required"
            },
            {
                "type": "email"
            }
        ],
        "value": ""
    },
    {
        "label": "Favorite Game",
        "name": "favoriteGame",
        "options": [{
                "id": 1,
                "label": "Super Smash"
            },
            {
                "id": 2,
                "label": "Metal Gear"
            },
            {
                "id": 3,
                "label": "Resident Evil"
            }
        ],
        "type": "select",
        "validations": [{
            "type": "required"
        }],
        "value": ""
    }
]
```

### Componente de formulario dinámico
```jsx
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { MySelect, MyTextInput } from "../components";

import formJson from "../data/custom-form.json";

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for(const input of formJson) {
    initialValues[input.name] = input.value;

    if(!input.validations) continue;

    let schema = Yup.string();

    for(const rule of input.validations) {
        if(rule.type === "required") {
            schema = schema.required("This field is required");
        }

        if(rule.type === "minLength") {
            schema = schema.min((rule as any).value || 2, `Minimum ${ (rule as any).value } characters`);
        }

        if(rule.type === "email") {
            schema = schema.email("Invalid email address");
        }
    }

    requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={ initialValues }
                onSubmit={ (values) => {
                    console.log(values);
                } }
                validationSchema={ validationSchema }
            >
                {
                    (formik) => (
                        <Form noValidate>
                            {
                                formJson.map(({ label, name, options, placeholder, type }) => {
                                    if(
                                        type === "input" ||
                                        type === "password" ||
                                        type === "email"
                                    ) {
                                        return (
                                            <MyTextInput
                                                key={ name }
                                                label={ label }
                                                name={ name }
                                                placeholder={ placeholder }
                                                type={ (type as any) }
                                            />
                                        );
                                    }
                                    else if(type === "select") {
                                        return (
                                            <MySelect
                                                key={ name }
                                                label={ label }
                                                name={ name }
                                            >
                                                <option value="">Select an option</option>

                                                {
                                                    options?.map(({ id, label }) => (
                                                        <option
                                                            key={ id }
                                                            value={ id }
                                                        >
                                                            { label }
                                                        </option>
                                                    ))
                                                }
                                            </MySelect>
                                        );
                                    }

                                    throw new Error(`Type: ${ type } not supported`);
                                })
                            }

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};
```


# Storybook

Nos permite crear nuestros componentes personalizados reutilizables que se pueden instalar de forma sencilla en nuestra organización.

Para agregar Storybook a nuestro proyecto de React, podemos ejecutar el siguiente comando:

```bash
npm create storybook@latest
```


## Desplegar Storybook

Para desplegar primero debemos crear nuestro ejecutable de Storybook:

```bash
npm run build-storybook
```

Hecho esto, Storybook nos generará una carpeta llamada `storybook-static`, y esta carpeta podemos desplegarla por ejemplo en Netlify arrastrando la carpeta con sus componentes.


## Chromatic

Nos permite dar un mejor aspecto en la interfaz para nuestro Storybook, para instalar podemos ejecutar el siguiente comando:

```bash
yarn add -D chromatic
```

Y para publicar nuestro Storybook, podemos ejecutar:

```bash
npx chromatic --project-token=<token>
```

Luego podemos ejecutar nuestro comando de Chromatic usando el comando `npm run chromatic` que ya fue agregado de forma automática.

