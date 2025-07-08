// @ts-nocheck
import { createBrowserRouter } from "react-router";
import Home from "../Components/Home/Home";
import MainLayout from "../layout/MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ⬅️ Layout wrapper
    children: [
      {
        index: true, // means "/"
        element: <Home />,
      },
      {
        path: "login",
        // element: <Login />,
      },
    ],
  },
]);
