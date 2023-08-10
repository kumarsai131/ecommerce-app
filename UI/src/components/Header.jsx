import { useLocation, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  function redirectToHome() {
    navigate("/");
  }

  function logout() {
    sessionStorage.clear();
    navigate("/");
  }

  function homepage() {
    let val = ["/", "/signup"].indexOf(location.pathname) > -1;
    return !val;
  }

  function navigateToCart() {
    navigate("/cart");
  }

  return (
    <nav className="header d-flex align-items-center justify-content-between">
      <h1 onClick={redirectToHome}>
        <span>Ecommerce App</span>
      </h1>
      {homepage() && (
        <div className="d-flex align-items-end">
          {!location.pathname.includes("/admin-dashboard") && (
            <div
              className="position-relative text-center me-4"
              onClick={navigateToCart}
            >
              <Badge text="dark" className="cart-badge">
                9
              </Badge>
              <span className="material-symbols-outlined icon">
                shopping_cart
              </span>
            </div>
          )}

          <div>
            <span className="material-symbols-outlined icon" onClick={logout}>
              logout
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
