import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/login/login";
import DashboardPage from "./components/shared/dashboard/component";
import GuestGuard from "./guards/guestGuard";
import AuthGuard from "./guards/authGuard";
import UserManagement from "./components/admin/user/userManagement";
import AddUser from "./components/admin/user/addUser";
import AllProject from "./components/admin/project/allProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Login />
            </AuthGuard>
          }
        />
        <Route
          path="/login"
          element={
            <AuthGuard>
              <Login />
            </AuthGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <GuestGuard>
              <DashboardPage />
            </GuestGuard>
          }
        />
        <Route
          path="/user-management"
          element={
            <GuestGuard>
              <UserManagement />
            </GuestGuard>
          }
        />
        <Route
          path="/user-management/add-user"
          element={
            <GuestGuard>
              <AddUser />
            </GuestGuard>
          }
        />
        <Route
          path="/projects"
          element={
            <GuestGuard>
              <AllProject />
            </GuestGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
