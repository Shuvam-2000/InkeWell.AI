import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./components/blog/Home";
import Blogs from "./components/blog/Blogs";
import Login from "./components/common/Login";
import Layout from "./components/admin/Layout";
import Dashboard from "./components/admin/Dashboard";
import AddBlog from "./components/admin/AddBlog";
import ListBlog from "./components/admin/ListBlog";
import Comments from "./components/admin/Comments";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext.jsx";
import PrivateRoute from "./components/admin/PrivateRoute";
import "quill/dist/quill.snow.css";
import "./index.css";

// LayoutWrapper: show/hide Navbar & Footer
function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login";

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

// AppRoutes: routes logic
function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Routes>
      {!isAdminRoute ? (
        <Route
          path="*"
          element={
            <LayoutWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<Blogs />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </LayoutWrapper>
          }
        />
      ) : (
        <Route path="/admin" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="addblog"
            element={
              <PrivateRoute>
                <AddBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="listblog"
            element={
              <PrivateRoute>
                <ListBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="comments"
            element={
              <PrivateRoute>
                <Comments />
              </PrivateRoute>
            }
          />
        </Route>
      )}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toaster />
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
