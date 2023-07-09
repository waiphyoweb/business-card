import GuessLayout from "./components/layouts/GuessLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./pages/auth/Login";
import NotFound from "./pages/notfound/NotFound";
import Profile from "./pages/dashboard/Profile";
import Register from "./pages/auth/Register";
import Tags from "./pages/dashboard/Tags";
import Dashboard from "./pages/dashboard/Dashboard";
import Notifications from "./pages/dashboard/Notifications";
import AllProfiles from "./pages/dashboard/AllProfiles";
import Cards from "./pages/dashboard/Cards";
import Users from "./pages/dashboard/Users";
import CardForm from "./pages/dashboard/CardForm";
import Logout from "./pages/auth/Logout";
import CardDetails from "./pages/CardDetail";
import UpdateForm from "./pages/dashboard/UpdateForm";

const { createBrowserRouter } = require("react-router-dom");

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cards",
        element: <Cards />,
      },
      {
        path: "/CardForm",
        element: <CardForm />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/tags",
        element: <Tags />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/allprofiles",
        element: <AllProfiles />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/carddetail/:id",
        element: <CardDetails />,
      },
      {
        path: "/update/:id",
        element: <UpdateForm />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/",
    element: <GuessLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
