import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./components/blog/Home";
import Blogs from "./components/blog/Blogs";
import Login from "./components/common/Login";
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

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
