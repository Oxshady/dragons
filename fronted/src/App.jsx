 
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";
import './App.css'
import RootPage from "./pages/RootPage.jsx";
import ErrorRoute from "./UI/ErrorRoute.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import MovieDetailPage,  { loader as BookLoader } from "./pages/MovieDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie-detail/:movieId",  
        id: "movie-detail",
        element: <MovieDetailPage />,
        // loader: BookLoader
      }
    ]
  }
]);
function App() {
  

  return (
    <>
      <QueryClientProvider client={queryClient}>
      {/* <ToastContainer /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
    </>
  )
}

export default App
