import { ShoppingPage } from "../02-component-patterns/pages/ShoppingPage";

type JSXComponent = () => React.JSX.Element;

interface Route {
    Component: React.LazyExoticComponent<() => React.JSX.Element> | JSXComponent;
    name: string;
    path: string;
    to: string;
}

export const routes: Route[] = [
    {
        Component: ShoppingPage,
        name: "Shopping",
        path: "/",
        to: "/"
    }
];