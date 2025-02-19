import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function PublicRoute() {
  return (
    <Routes>
      <Route index path="/" element={<Users />} />
      <Route index path="/add-user" element={<AddUser />} />
      <Route index path="/edit-user" element={<EditUser />} />
    </Routes>
  );
}

export default PublicRoute;
