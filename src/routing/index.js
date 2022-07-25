import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import NavBar from "../components/NavBar";

// pages
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Cart from "../pages/shopping-cart";
import Utensils from "../pages/utensisl-and-ingredients";

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: () => <Home /> },
  {
    path: "/login",
    key: "login",
    exact: true,
    component: () => <Login />,
  },
  {
    path: "/register",
    key: "register",
    exact: true,
    component: () => <Register />,
  },
  {
    path: "/shopping-cart",
    key: "shop",
    exact: true,
    component: () => <Cart />,
  },
  {
    path: "/utensils-and-ingredients",
    key: "utensils",
    exact: true,
    component: () => <Utensils />,
  },
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <>
      <NavBar />
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    </>
  );
}
