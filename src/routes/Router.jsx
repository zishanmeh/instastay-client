import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";
import MyBookings from "../pages/MyBookings";
import PrivateRoutes from "./PrivateRoutes";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
        loader: () => fetch("http://localhost:3000/"),
      },
      {
        path: "/room/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/room/${params.id}`),
        element: <RoomDetails></RoomDetails>,
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoutes>
            <MyBookings></MyBookings>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default Router;
