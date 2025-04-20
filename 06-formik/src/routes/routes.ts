import { RegisterPage } from "../03-forms/pages/RegisterPage";

type JSXComponent = () => React.JSX.Element;

interface Route {
    Component: React.LazyExoticComponent<() => React.JSX.Element> | JSXComponent;
    name: string;
    path: string;
    to: string;
}

export const routes: Route[] = [
    {
        Component: RegisterPage,
        name: "Register Page",
        path: "/register",
        to: "/register"
    }
];