// @ts-nocheck
import { createBrowserRouter } from "react-router"; // react-router-dom ব্যবহার করো
import Home from "../Components/Home/Home";
import MainLayout from "../layout/MainLayout/MainLayout";
import SignupSection from "../Components/SignupSection/SignupSection";
import Login from "../Components/Login/Login";
import ContactSection from "../Components/ContactSection/ContactSection";
import About from "../Components/About/About";
import BiodataPage from "../Components/BiodataPage/BiodataPage";
import BiodataDetails from "../Components/BiodataPage/BiodataDetails";
import PrivateRoute from "../routes/PrivateRoute";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import EditBiodataPage from "../layout/DashboardLayout/EditBiodataPage";
import ViewBiodata from "../layout/DashboardLayout/ViewBiodata/ViewBiodata";
import MyContactRequest from "../layout/DashboardLayout/MyContactRequest/MyContactRequest";
// import ViewBiodata from "../layout/DashboardLayout/ViewBiodata";  // TODO: Create these pages later
// import MyContactRequests from "../layout/DashboardLayout/MyContactRequests";
// import Favourites from "../layout/DashboardLayout/Favourites";

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
        element: <Login />, // এখানে element ইউজ করো, Component নয়
      },
      {
        path: "contact",
        element: <ContactSection />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "biodatas",
        element: <BiodataPage />,
      },
      {
        path: "biodata/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:biodataId",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard routes protected by PrivateRoute
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "edit-biodata",
        element: <EditBiodataPage />,
      },
      {
        path: "view-biodata",
        element: <ViewBiodata />,
      },
      {
        path: "my-contact-requests",
        element: <MyContactRequest />,
      },
      {
        path: "favourites-biodata",
        element: (
          // <Favourites /> এখনো তৈরি হয়নি, পরে যুক্ত করো
          <div>Favourites Biodata Page Coming Soon</div>
        ),
      },
      {
        index: true,
        element: <EditBiodataPage />, // Dashboard ডিফল্ট পেজ
      },
    ],
  },
]);
