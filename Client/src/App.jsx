import { Route, Routes, BrowserRouter } from "react-router-dom";
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
import { useLocation } from "react-router-dom";
import "./index.css";

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

function AppRoutes() {
  const location = useLocation();

  // Check if the route starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Routes>
      {!isAdminRoute ? (
        // Routes WITH LayoutWrapper 
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
        // Admin Routes 
        <>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="addblog" element={<AddBlog />} />
            <Route path="listblog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
