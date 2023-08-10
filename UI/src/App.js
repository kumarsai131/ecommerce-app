import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Products from "./components/User/Products";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Login setIsLoggedIn={(val) => setIsLoggedIn(val)} />}
        />
        <Route path="signup" element={<Signup />} />
        {isLoggedIn && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<Products />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
