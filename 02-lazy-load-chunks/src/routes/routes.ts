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