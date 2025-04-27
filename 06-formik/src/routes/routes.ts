import {
    FormikAbstraction,
    FormikBasicPase,
    FormikComponents,
    FormikYupPage,
    RegisterPage
} from "../03-forms/pages";

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
    },
    {
        Component: FormikBasicPase,
        name: "Formik Basic Page",
        path: "/formik-basic",
        to: "/formik-basic"
    },
    {
        Component: FormikYupPage,
        name: "Formik Yup Page",
        path: "/formik-yup",
        to: "/formik-yup"
    },
    {
        Component: FormikComponents,
        name: "Formik Components",
        path: "/formik-components",
        to: "/formik-components"
    },
    {
        Component: FormikAbstraction,
        name: "Formik Abstraction",
        path: "/formik-abstraction",
        to: "/formik-abstraction"
    },
];