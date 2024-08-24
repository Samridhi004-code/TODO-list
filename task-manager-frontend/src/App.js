import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Router";
import Taskbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
          <Taskbar />
          <RouterProvider router={router} />
    </>
  );
};

export default App;
