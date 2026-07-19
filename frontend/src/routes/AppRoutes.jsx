import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import CreateBug from "../pages/CreateBug";
import EditBug from "../pages/EditBug";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AdminUsers from "../pages/AdminUsers";

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

       <Route
    path="/create-bug"
    element={
        <ProtectedRoute>
            <CreateBug />
        </ProtectedRoute>
    }
/>

       <Route
    path="/edit-bug/:id"
    element={
        <ProtectedRoute>
            <EditBug />
        </ProtectedRoute>
    }
/>

        <Route path="*" element={<NotFound />} />

        <Route path="/forgot-password" element={<ForgotPassword />}></Route>

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

      <Route
    path="/Admin/users"
    element={
        <ProtectedRoute>
            <AdminUsers />
        </ProtectedRoute>
    }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;