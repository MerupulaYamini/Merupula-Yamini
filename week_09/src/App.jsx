import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";


const ProductList = lazy(() => import("./pages/ProductList"));
const ConfirmProduct = lazy(() => import("./pages/ConfirmProduct"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "/confirm",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ConfirmProduct />
          </Suspense>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
