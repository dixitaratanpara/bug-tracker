import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import CreateBug from "../pages/CreateBug";
import EditBug from "../pages/EditBug";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}
        />

         <Route path="/create-bug" element={<CreateBug />} />

         <Route path="/edit-bug/:id" element={<EditBug/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;