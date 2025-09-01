import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AuthorDashboard from "./pages/dashboard/AuthorDashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Layout/Navbar";
import PostDetail from "./pages/PostDetail";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/author"
            element={
              <ProtectedRoute roles={["author"]}>
                <AuthorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
