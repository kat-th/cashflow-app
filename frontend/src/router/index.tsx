import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import ViewAllProperties from "../components/AllProperties";
import Layout from "./Layout";
import PropertyDetail from "../components/PropertyDetail";
import SavedPropertyAnalyses from "../components/SavedPropertyAnalyses";
import CreatePropertyFormPage from "../components/CreatePropertyForm";
import UpdatePropertyFormPage from "../components/UpdatePropertyForm";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ViewAllProperties />,
      },
      {
        path: "/property/:propertyId",
        element: <PropertyDetail />,
      },
      {
        path: "/property/create-property",
        element: <CreatePropertyFormPage />,
      },
      {
        path: "/update-property/:propertyId",
        element: <UpdatePropertyFormPage />,
      },
      {
        path: "/investment",
        element: <SavedPropertyAnalyses />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
