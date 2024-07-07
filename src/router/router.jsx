import { createBrowserRouter } from "react-router-dom";

import { App } from "../App.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import { TodoPage } from "../pages/TodoPage.jsx";
import { Home } from "../pages/Home.jsx";
import { appRoutes, routesNames } from "./consts.jsx";

export const router = createBrowserRouter([
  {
    path: appRoutes[routesNames.HOME],
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: appRoutes[routesNames.TODO_ITEM],
        element: <TodoPage title={routesNames.TODO_ITEM} />,
      },
      {
        path: appRoutes[routesNames.NOT_FOUND],
        element: <NotFound />,
      },
    ],
  },
]);
