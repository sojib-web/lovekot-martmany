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
import MyFavorites from "../layout/DashboardLayout/MyFavourites/MyFavorites";
import AdminOverview from "../layout/DashboardLayout/AdminOverview/AdminOverview";
import ManageUsers from "../layout/DashboardLayout/ManageUsers/ManageUsers";
import ApprovedPremium from "../layout/DashboardLayout/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../layout/DashboardLayout/ApprovedContactRequest/ApprovedContactRequest";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../Components/shared/Forbidden/Forbidden";
import DashboardRedirect from "../layout/DashboardLayout/DashboardRedirect/DashboardRedirect";
import GotMarriedForm from "../layout/DashboardLayout/GotMarriedForm/GotMarriedForm";
import ProfilePage from "../layout/DashboardLayout/ProfilePage/ProfilePage";
import EditProfilePage from "../layout/DashboardLayout/EditProfilePage/EditProfilePage";
import NotFound from "../Components/shared/NotFound/NotFound";
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
        path: "forbidden",
        element: <Forbidden />,
      },
      {
        path: "login",
        element: <Login />,
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
      { path: "*", element: <NotFound /> },
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
        index: true,
        element: <DashboardRedirect />,
      },

      {
        path: "married",
        element: <GotMarriedForm />,
      },
      {
        path: "ProfilePage",
        element: <ProfilePage />,
      },
      {
        path: "EditProfilePage",
        element: <EditProfilePage />,
      },
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
        element: <MyFavorites />,
      },
      {
        path: "admin-dashboard",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      },
      {
        path: "admin-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "approved-premium",
        element: (
          <AdminRoute>
            <ApprovedPremium />
          </AdminRoute>
        ),
      },
      {
        path: "approved-contact-request",
        element: (
          <AdminRoute>
            <ApprovedContactRequest />
          </AdminRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
