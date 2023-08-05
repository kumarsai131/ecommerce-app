import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  function redirectToHome() {
    navigate("/");
  }
  return (
    <nav className="header">
      <h1 onClick={redirectToHome}>
        <span>Ecommerce App</span>
      </h1>
    </nav>
  );
}
