// @ts-nocheck
import { createBrowserRouter } from "react-router";
import Home from "../Components/Home/Home";
import MainLayout from "../layout/MainLayout/MainLayout";
import SignupSection from "../Components/SignupSection/SignupSection";
import Login from "../Components/Login/Login";
import ContactSection from "../Components/ContactSection/ContactSection";
import About from "../Components/About/About";
import BiodataPage from "../Components/BiodataPage/BiodataPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ⬅️ Layout wrapper
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignupSection />,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "contact",
        Component: ContactSection,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "biodatas",
        Component: BiodataPage,
      },
    ],
  },
]);
