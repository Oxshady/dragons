 
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
import LoginPage from "./pages/LoginPage.jsx";
import SingupPage from "./pages/SingupPage.jsx";
import Survey from "./component/survey/Survey.jsx";

import Want_To_Watch from "./component/unser_saved_movies/Want_To_Watch.jsx";
import Watched_before from "./component/unser_saved_movies/Watched_before.jsx";
import Favorite_movies from "./component/unser_saved_movies/Favorite_movies.jsx";

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
      },
      {
        path: "survay",
        element: <Survey />,
      },
      {
        path: "want_to_watch",
        element: <Want_To_Watch />,
      },
      {
        path: "watched_before",
        element: <Watched_before />,
      },
      {
        path: "favorite_movies",
        element: <Favorite_movies />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <SingupPage />,
  },
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
