import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import RecipeForm from "./pages/RecipeForm.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import SignInForm from "./pages/SignInForm.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/recipes/create",
        element: <RecipeForm />,
      },
      {
        path: "/recipes/edit/:id",
        element: <RecipeForm />,
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
      },
      {
        path: "/sign-in",
        element: <SignInForm />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
