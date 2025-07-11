// @ts-nocheck
import { createBrowserRouter } from "react-router";
import Home from "../Components/Home/Home";
import MainLayout from "../layout/MainLayout/MainLayout";
import SignupSection from "../Components/SignupSection/SignupSection";
import Login from "../Components/Login/Login";
import ContactSection from "../Components/ContactSection/ContactSection";
import About from "../Components/About/About";
import BiodataPage from "../Components/BiodataPage/BiodataPage";
import BiodataDetails from "../Components/BiodataPage/BiodataDetails";
import PrivateRoute from "../routes/PrivateRoute";
import CheckoutForm from "../Components/CheckoutPage/CheckoutForm";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
// import BiodataDetails from "../Components/BiodataDetails/BiodataDetails";
// import ContactCheckoutPage from "../Components/Checkout/ContactCheckoutPage";
// import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      {
        path: "biodata/:id", // ✅ Biodata details route
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:biodataId",
        element: (
          <PrivateRoute>
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
