import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Protected from "../auth/components/Protected";

const AppLayout = () => {
  return (
    <Protected>
      <Navbar />
      <Outlet />
    </Protected>
  );
};

export default AppLayout;
