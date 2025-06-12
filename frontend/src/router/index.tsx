import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import ViewAllProperties from "../components/Properties";
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ViewAllProperties />,
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
