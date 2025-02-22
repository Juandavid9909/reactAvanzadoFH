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