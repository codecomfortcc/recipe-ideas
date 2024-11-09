import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./pages/App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RecipeFullView from "./components/recipe-full-view.tsx";
import MainLayout from "./layouts/main-layout.tsx";
import MenuPage from "./pages/menu-page.tsx";
import PageNotFound from "./pages/page-not-found.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },{
        path: "menu/:id",
        element: <RecipeFullView />,
      },
      // 404 page
      {
        path: "*",
        element: <PageNotFound />,
      }
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
